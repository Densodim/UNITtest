"use strict";
const moment = require("moment");
const SATURDAY = 6;
const SUNDAY = 0;
function RealTimeProvider() {
    this.getDay = () => moment().day();
}
class PasswordVerifierClass {
    constructor(rules, timeProvider) {
        this.rules = rules;
        this.timeProvider = timeProvider;
    }
    verify(input) {
        if ([SATURDAY, SUNDAY].includes(this.timeProvider.getDay())) {
            throw new Error("It's the weekend!");
        }
        const errors = [];
        return errors;
    }
}
const passwordVerifierFactory = (rules, timeProvider) => {
    return new PasswordVerifierClass(rules, timeProvider || new RealTimeProvider());
};
module.exports = passwordVerifierFactory;
