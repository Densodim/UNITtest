const { describe, it, expect } = require("@jest/globals");
const { verifyPassword, makeVerifier } = require("./password-verifier");

describe("password verifier", () => {
  describe("given logger and passing scenario", () => {
    it("calls logger with PASS", () => {
      let logged = "";
      const mokLog = { info: (text) => (logged = text) };
      const injectedVerify = verifyPassword([], mokLog);

      injectedVerify("anything");

      expect(logged).toMatch(/PASSED/);
    });
  });
});

describe("hight order factory functions", () => {
  describe("password verifier", () => {
    it("given logger and passing scenario", () => {
      let logged = "";
      const mokLog = { info: (text) => (logged = text) };
      const passVerify = makeVerifier([], mokLog);

      passVerify("any input");

      expect(logged).toMatch(/PASSED/);
    });
  });
});
