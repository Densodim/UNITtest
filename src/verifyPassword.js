const verifyPassword1 = (input, rules) => {
    const error = []
    rules.forEach(rule => {
        const result = rule(input)
        if (!result.passed) {
            error.push(`error ${result.reason}`)
        }
    });
    return error
}