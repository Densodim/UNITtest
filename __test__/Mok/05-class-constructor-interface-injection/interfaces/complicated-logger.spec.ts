import { describe, expect, test } from "@jest/globals";
import { IComplicatedLogger, PasswordVerifier2 } from "./complicated-logger";

describe("working with long interface", () => {
  describe("password verifier", () => {
    class FakeComplicatedLogger implements IComplicatedLogger {
      infoWritten = "";
      debugWritten = "";
      errorWritten = "";
      warnWritten = "";

      debug(text: string, obj: any): void {
        this.debugWritten = text;
      }

      error(text: string, location: string, stacktrace: string): void {
        this.errorWritten = text;
      }
      info(text: string): void {
        this.infoWritten = text;
      }
      warn(text: string): void {
        this.warnWritten = text;
      }
    }

    test("verify passing, with logger, calls logger with PASS", () => {
      const mokLog = new FakeComplicatedLogger();

      const verifier = new PasswordVerifier2([], mokLog);
      verifier.verify("anything");

      expect(mokLog.infoWritten).toMatch(/PASSED/);
    });

    test("A more JS oriented variation on this test", () => {
      const mokLog = {} as IComplicatedLogger;
      let logger = "";
      mokLog.info = (text) => (logger = text);

      const rules = [(input: string) => true];

      const verifier = new PasswordVerifier2(rules, mokLog);

      verifier.verify("anything");

      expect(logger).toMatch(/PASSED/);
    });
  });
});
