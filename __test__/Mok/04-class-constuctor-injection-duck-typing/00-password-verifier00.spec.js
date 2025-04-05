const { describe, it, expect, test } = require("@jest/globals");
const { PasswordVerifier } = require("./00-password-verifier00");

class FakeLogger {
  logger = "";
  info(text) {
    this.logger = text;
  }
}

describe("duck typing with function constructor injection", () => {
  describe("password verifier", () => {
    it("logger&passing scenario, logger with PASSED", () => {
      let logged = "";
      const mokLog = { info: (text) => (logged = text) };
      const verifier = new PasswordVerifier([], mokLog);
      verifier.verify("any input");

      expect(logged).toMatch(/PASSED/);
    });
  });
});

test("logger + passing scenario, calls logger with PASSED", () => {
  let logger = "";
  const mockLog = new FakeLogger();
  const verifier = new PasswordVerifier([], mockLog);
  verifier.verify("any input");

  expect(mockLog.logger).toMatch(/PASSED/);
});
