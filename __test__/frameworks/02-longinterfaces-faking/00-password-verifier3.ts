import { IComplicatedLogger } from "./interfaces/complicated-logger";
import { MaintenanceWindow } from "./interfaces/maintenanceWindow";

export class PasswordVerifier3 {
  #rules: any[];
  #logger: IComplicatedLogger;
  #maintenceWindows: MaintenanceWindow;

  constructor(
    rules: any[],
    logger: IComplicatedLogger,
    maintenanceWindow: MaintenanceWindow
  ) {
    this.#rules = rules;
    this.#logger = logger;
    this.#maintenceWindows = maintenanceWindow;
  }

  verify(input: string) {
    if (this.#maintenceWindows.inUnderMaintenanceWindow()) {
      this.#logger.info("Under Maintenance", "verify");
      return false;
    }

    const failed = this.#rules
      .map((rule) => rule(input))
      .filter((result) => result === false);

    if (failed.length === 0) {
      this.#logger.info("PASSED", "verify");
      return true;
    }
    this.#logger.info("FAIL", "verify");
    return false;
  }
}
