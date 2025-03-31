const verifyPassword = (input, rules) => {
    const error = []
    rules.forEach(rule => {
        const result = rule(input)
        if (!result.passed) {
            error.push(`error ${result.reason}`)
        }
    });
    return error
}

class PasswordVirifier1 {
    constructor() {
        this.rules = []
    }

    addRules(rule) {
        this.rules.push(rule)
    }

    verify(input) {
        const error = []
        this.rules.forEach(rule => {
            const result = rule(input)
            if (result.passed === false) {
                error.push(result.reason)
            }
        })
        return error
    }
}

const makeVerifier = () => new PasswordVirifier1();
const passingRule = (input) => ({passed: true, reason: ''})

const makeVerifierWithPassingRule = () => {
    const verifier = makeVerifier()
    verifier.addRules(passingRule)
    return verifier;
}

const makeVerifierWithFailedRule = (reason) => {
    const verifier = makeVerifier()
    const fakeRule = input => ({passed: false, reason: reason})
    verifier.addRules(fakeRule)
    return verifier
}

const makeFailingRule = (reason) => {
    return (input) => {
        return {passed: false, reason: reason}
    }
}

describe('PasswordVerifier', () => {
    describe('given a failing rule', () => {
        it('returns error', () => {
            const error = verifyPassword('any value', [makeFailingRule('fake reason')])
            expect(error[0]).toContain('fake reason')
        })

        it('has a error message based the rule.reason', () => {
            const verifier = makeVerifierWithFailedRule('fake reason')
            const errors = verifier.verify('any input')
            expect(errors[0]).toContain('fake reason')
        })

        it('has exactly one error', () => {
            const verifier = makeVerifierWithFailedRule('fake reason')
            const errors = verifier.verify('any input')
            expect(errors.length).toBe(1)
        })
    });
    describe('with a passing rule', () => {
        it('has no errors', () => {
            const verifier = makeVerifierWithPassingRule();
            const errors = verifier.verify('any value')
            expect(errors.length).toBe(0)
        })
    });
    describe('with a failing and a passing rule', () => {
        it('has one errors', () => {
            const verifier = makeVerifierWithFailedRule('fake reason')
            verifier.addRules(passingRule)
            const errors = verifier.verify('any value')
            expect(errors.length).toBe(1)
        })
        it('error text belongs to failed rule', () => {
            const verifier = makeVerifierWithFailedRule('fake reason')
            verifier.addRules(passingRule)
            const errors = verifier.verify('any value')
            expect(errors[0]).toContain('fake reason')
        })
    })
})


