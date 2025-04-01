const SATURDAY = 6;
const SUNDAY = 0;

const verifyPassword3 = (input, rules, getDayFn) => {
  const dayOfWeek = getDayFn();
  if ([SATURDAY, SUNDAY].includes(dayOfWeek)) {
    throw Error("It's the weekend!");
  }

  return [];
};

module.exports = verifyPassword3;
