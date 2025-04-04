const verifyPassword2 = (input, rules, logger) => {
  const failed = rules
    .map((rule) => rule(input))
    .filter((result) => result === false);

  if (failed.length === 0) {
    logger.info("PASSED");
    return true;
  }
  logger.info("FAIL");
  return false;
};

describe("password verifier with logger", () => {
  describe("when all rules pass", () => {
    it("calls the logger with PASSED", () => {
      let written = "";
      const mocklog = {
        info: (text) => {
          written = text;
        },
      };
      verifyPassword2("anything", [], mocklog);

      expect(written).toMatch(/PASSED/);
    });
  });
});
