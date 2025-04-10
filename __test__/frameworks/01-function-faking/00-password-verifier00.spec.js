const { makeVerifier } = require("./00-password-verifier00");

test("given logger and passing scenario", () => {
  const { stringMatching } = expect;
  const mokLog = { info: jest.fn() };
  const verify = makeVerifier([], mokLog);

  verify("any input");

  expect(mokLog.info).toHaveBeenCalledWith(stringMatching(/PASS/));
});
