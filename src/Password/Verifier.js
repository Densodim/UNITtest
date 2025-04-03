const SUNDAY = 0;
const SATURDAY = 6;

const Verifier = function (rules, dayOfWeekFn) {
  this.verify = function (input) {
    if ([SATURDAY, SUNDAY].includes(dayOfWeekFn())) {
      throw Error("It's the weekend!");
    }
  };
};

module.exports = Verifier;
