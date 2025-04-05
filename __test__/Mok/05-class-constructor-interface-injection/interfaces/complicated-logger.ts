export interface IComplicatedLogger {
  info(text: string): void;
  debug(text: string, obj: any): void;
  warn(text: string): void;
  error(text: string, location: string, stacktrace: string): void;
}

export class PasswordVerifier2 {
  #rules: any[];
  #logger: IComplicatedLogger;

  constructor(rules: any[], logger: IComplicatedLogger) {
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
