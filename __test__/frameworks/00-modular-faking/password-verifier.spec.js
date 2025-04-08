jest.mock("./complicated-logger.js");
jest.mock("./configuration-service.js");

const { stringMatching } = expect;
const { verifyPassword } = require("./password-verifier");
const mockLoggerModule = require("./complicated-logger");
const stubConfigModule = require("./configuration-service");

describe("password verifier", () => {
  afterEach(jest.resetAllMocks);

  test("with info log lever and no rules", () => {
    stubConfigModule.getLogLevel.mockReturnValue("info");

    verifyPassword("anything", []);

    expect(mockLoggerModule.info).toHaveBeenCalledWith(stringMatching(/PASS/));
  });

  test("with debug log lever and no rules, it calls the logger with PASS", () => {
    stubConfigModule.getLogLevel.mockReturnValue("debug");

    verifyPassword("anything", []);

    expect(mockLoggerModule.debug).toHaveBeenCalledWith(stringMatching(/PASS/));
  });
});
