class PasswordVerifier {
  #rules;
  #logger;

  constructor(rules, logger) {
    this.#logger = logger;
    this.#rules = rules;
  }

  verify(input) {
    const failed = this.#rules
      .map((rule) => rule(input))
      .filter((result) => result === false);
    if (failed.length === 0) {
      this.#logger.info("PASSED");
      return true;
    }
    this.#logger.info("FAIL");
    return false;
  }
}

module.exports = {
  PasswordVerifier,
};
