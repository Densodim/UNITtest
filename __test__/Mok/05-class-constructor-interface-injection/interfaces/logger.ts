export interface ILogger {
  info(text: string): void;
}

class SimpleLogger implements ILogger {
  info(text: string) {}
}

export class PasswordVerifier {
  #rules: any[];
  #logger: ILogger;

  constructor(rules: any[], logger: ILogger) {
    this.#rules = rules;
    this.#logger = logger;
  }

  verify(input: string): boolean {
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
