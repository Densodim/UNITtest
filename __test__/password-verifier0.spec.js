const verifyPassword = require("../src/Password/verifyPassword");

class PasswordVerifier1 {
  constructor() {
    this.rules = [];
  }

  addRules(rule) {
    this.rules.push(rule);
  }

  verify(input) {
    if (this.rules.length === 0) {
      throw new Error("no rules configured");
    }
    const error = [];
    this.rules.forEach((rule) => {
      const result = rule(input);
      if (result.passed === false) {
        error.push(result.reason);
      }
    });
    return error;
  }
}

const makeVerifier = () => new PasswordVerifier1();
const passingRule = (input) => ({ passed: true, reason: "" });

const makeVerifierWithPassingRule = () => {
  const verifier = makeVerifier();
  verifier.addRules(passingRule);
  return verifier;
};

const makeVerifierWithFailedRule = (reason) => {
  const verifier = makeVerifier();
  const fakeRule = (input) => ({ passed: false, reason: reason });
  verifier.addRules(fakeRule);
  return verifier;
};

const makeFailingRule = (reason) => {
  return (input) => {
    return { passed: false, reason: reason };
  };
};

const oneUpperCaseRule = (input) => {
  return {
    passed: input.toLowerCase() !== input,
    reason: "at least one upper case needed",
  };
};

describe("PasswordVerifier", () => {
  describe("given a failing rule", () => {
    it("returns error", () => {
      const error = verifyPassword("any value", [
        makeFailingRule("fake reason"),
      ]);
      expect(error[0]).toContain("fake reason");
    });

    it("has a error message based the rule.reason", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      const errors = verifier.verify("any input");
      expect(errors[0]).toContain("fake reason");
    });

    it("has exactly one error", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      const errors = verifier.verify("any input");
      expect(errors.length).toBe(1);
    });
  });
  describe("with a passing rule", () => {
    it("has no errors", () => {
      const verifier = makeVerifierWithPassingRule();
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(0);
    });
  });
  describe("with a failing and a passing rule", () => {
    it("has one errors", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      verifier.addRules(passingRule);
      const errors = verifier.verify("any value");
      expect(errors.length).toBe(1);
    });
    it("error text belongs to failed rule", () => {
      const verifier = makeVerifierWithFailedRule("fake reason");
      verifier.addRules(passingRule);
      const errors = verifier.verify("any value");
      expect(errors[0]).toContain("fake reason");
    });
  });
});

describe("one uppercase rule", function () {
  test.each([
    ["Abc", true],
    ["aBc", true],
    ["abc", false],
  ])("given %s, %s", (input, expected) => {
    const result = oneUpperCaseRule(input);
    expect(result.passed).toEqual(expected);
  });
});

describe("one uppercase rule, with vanilla JS for", () => {
  const tests = {
    Abc: true,
    aBc: true,
    abc: false,
  };
  for (const [input, expected] of Object.entries(tests)) {
    test(`given ${input}, ${expected}`, () => {
      const result = oneUpperCaseRule(input);
      expect(result.passed).toEqual(expected);
    });
  }
});

test("verify, with no rules, throws exception", () => {
  const verifier = makeVerifier();
  expect(() => verifier.verify("any input")).toThrowError(
    /no rules configured/
  );
});
