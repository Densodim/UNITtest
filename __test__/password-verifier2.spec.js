const SUNDAY = 0;
const SATURDAY = 6;
const verifyPassword2 = require("../src/Password/verifyPassword2.js");
const {
  verifyPassword3,
  inject,
} = require("../src/Password/verifyPassword3.js");
const passwordVerifierFactory = require("../src/Password/PasswordVerifierClass.js");

const Verifier = require("../src/Password/Verifier");

function FakeTimeProvider(fakeDay) {
  this.getDay = function () {
    return fakeDay;
  };
}

const makeVerifier = (rules, dayOfWeekFN) => {
  return function (input) {
    return passwordVerifierFactory(rules, new FakeTimeProvider(dayOfWeekFN()));
  };
};

const injectDate = (newDay) => {
  const reset = inject({
    moment: function () {
      return {
        day: () => newDay,
      };
    },
  });
  return reset;
};

describe("verifier2 - dummy object", () => {
  test("on weekends, throws exceptions", () => {
    expect(() => verifyPassword2("anything", [], SUNDAY));
  });
});

describe("verifier3 - dummy function", () => {
  test("on weekends, throws exceptions", () => {
    const reset = injectDate(SUNDAY);
    expect(() => verifyPassword3("anything", [])).toThrow("It's the weekend!");
    reset();
  });
});

describe("verifier", () => {
  test("factory method: on weekends, throws exceptions", () => {
    const alwaysSunday = () => SUNDAY;

    const verifyPassword = makeVerifier([], alwaysSunday);

    expect(() => verifyPassword("anything").verify()).toThrow(
      "It's the weekend!"
    );
  });

  test("constructor function: on weekends, throws exceptions", () => {
    const alwaysSunday = () => SUNDAY;
    const verifier = makeVerifier([], alwaysSunday);

    expect(() => verifier("anything").verify()).toThrow("It's the weekend!");
  });
});
