import { IComplicatedLogger } from "./interfaces/complicated-logger";
import { PasswordVerifier2 } from "./00-password-verifier2";
import { Substitute, Arg } from "@fluffy-spoon/substitute";
import { PasswordVerifier3 } from "./00-password-verifier3";
import { MaintenanceWindow } from "./interfaces/maintenanceWindow";

describe("working with long interfaces", () => {
  describe("password verifier", () => {
    test("verify, with logger and passing, calls logger with PASS", () => {
      const mockLog = Substitute.for<IComplicatedLogger>();
      mockLog.info(Arg.any()).returns(undefined);

      const verifier = new PasswordVerifier2([], mockLog);
      verifier.verify("anything");

      mockLog.received().info(
        Arg.is((x) => x.includes("PASSED")),
        "verify"
      );
    });
  });
});

const makeVerifierWithRules = (log: any, maint: any) => {
  return new PasswordVerifier3([], log, maint);
};
describe("working with substitute part 2", () => {
  test("verify, during maintenance, calls logger", () => {
    const stubMaintWindow = Substitute.for<MaintenanceWindow>();

    stubMaintWindow.inUnderMaintenanceWindow().returns(true);
    const mockLog = Substitute.for<IComplicatedLogger>();
    const verifier = makeVerifierWithRules(mockLog, stubMaintWindow);

    verifier.verify("anything");

    mockLog.received().info("Under Maintenance", "verify");
  });

  test("verify, outside maintenance, calls logger", () => {
    const stubMainWindow = Substitute.for<MaintenanceWindow>();
    stubMainWindow.inUnderMaintenanceWindow().returns(false);
    const mockLog = Substitute.for<IComplicatedLogger>();
    const verifier = makeVerifierWithRules(mockLog, stubMainWindow);

    verifier.verify("anything");

    mockLog.received().info("PASSED", "verify");
  });
});
