import { describe, expect, test } from "@jest/globals";
import { ILogger, PasswordVerifier } from "./logger";

class FakeLogger implements ILogger {
  written: string = "";

  info(text: string) {
    this.written = text;
  }
}

describe("password verifier with interfaces", () => {
  test("verify, with logger, calls logger", () => {
    const mokLog = new FakeLogger();
    const verifier = new PasswordVerifier([], mokLog);

    verifier.verify("anything");

    expect(mokLog.written).toMatch(/PASS/);
  });
});
