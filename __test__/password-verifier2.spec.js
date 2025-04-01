const SUNDAY = 0;
const SATURDAY = 6;
const verifyPassword2 = require("../src/verifyPassword2.js");
const verifyPassword3 = require("../src/verifyPassword3.js");

describe("verifier3 - dummy function", () => {
  test("on weekends, throws exceptions", () => {
    const alwaysSunday = () => SUNDAY;
    expect(() => verifyPassword3("anything", [], alwaysSunday)).toThrow(
      "It's the weekend!"
    );
  });
});
