const {
  inject,
  verifyPassword3,
  SATURDAY,
} = require("../src/Password/verifyPassword3.js");

const SUNDAY = 0;

const makeVerifier = (rules, dayOfWeekFn) => {
  return function (input) {
    if ([SATURDAY, SUNDAY].includes(dayOfWeekFn())) {
      throw Error("It's the weekend!");
    }
    return [];
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

describe("verifier3 - dummy function", () => {
  test("on weekends, throws exceptions", () => {
    const reset = injectDate(SUNDAY);
    expect(() => verifyPassword3("anything", [])).toThrow("It's the weekend!");
    reset();
  });
  test("factory method: on weekends, throws exceptions", () => {
    const alwaysSunday = () => SUNDAY;
    const verifyPassword = makeVerifier([], alwaysSunday);

    expect(() => verifyPassword("anything")).toThrow("It's the weekend!");
  });
});

describe("verifyPassword", () => {
  describe("when its the weekend", () => {
    it("throws an error", () => {
      const reset = injectDate(SATURDAY);

      expect(() => verifyPassword3("any input")).toThrow("It's the weekend!");
      reset();
    });
  });
});
