"use strict";
const originalDependencies = {
    moment: require("moment"),
};
const SATURDAY = 6;
const SUNDAY = 0;
let dependencies = Object.assign({}, originalDependencies);
const inject = (fakes) => {
    Object.assign(dependencies, fakes);
    return function reset() {
        dependencies = Object.assign({}, originalDependencies);
    };
};
const verifyPassword3 = (input, rules) => {
    const dayOfWeek = dependencies.moment().day();
    if ([SATURDAY, SUNDAY].includes(dayOfWeek)) {
        throw Error("It's the weekend!");
    }
    return [];
};
module.exports = {
    SATURDAY,
    verifyPassword3,
    inject,
};
