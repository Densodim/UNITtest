const verifyPassword = (input, rules) => {
  const error = [];
  rules.forEach((rule) => {
    const result = rule(input);
    if (!result.passed) {
      error.push(`error ${result.reason}`);
    }
  });
  return error;
};

module.exports = verifyPassword;
