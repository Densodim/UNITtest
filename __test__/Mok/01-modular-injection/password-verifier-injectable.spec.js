const { describe, it, expect } = require("@jest/globals");
const {
  injectDependencies,
  resetDependencies,
  verifyPassword,
} = require("./password-verifier-injectable");

describe("password verifier", () => {
  afterEach(resetDependencies);

  describe("given logger and passing scenario", () => {
    it("calls the logger with PASS", () => {
      let logger = "";
      const mockLog = { info: (text) => (logger = text) };
      injectDependencies({ log: mockLog });

      verifyPassword("anything", []);

      expect(logger).toMatch(/PASSED/);
    });
  });
});
