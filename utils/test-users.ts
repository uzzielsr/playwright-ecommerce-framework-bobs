/**
 * Generates a test user object with the default values and a randomized email.
 * Environment variables can override default fields to allow customization.
 *
 * @returns A user object with form data for account creation or login tests.
 */
export function generateTestUser() {
    const random = Math.floor(Math.random() * 100000);

    return {
        email: `${random}@example.com`,
        password: process.env.TEST_PASSWORD!,
        invalidPassword: process.env.TEST_INVALID_PASSWORD!,
        firstname: process.env.TEST_FIRST_NAME!,
        lastname: process.env.TEST_LAST_NAME!,
        city: process.env.TEST_CITY!,
        cc_number: process.env.TEST_CC_NUMBER!,
        cc_cvc: process.env.TEST_CC_CVC!,
        cc_exp_month: process.env.TEST_CC_EXP_MONTH!,
        cc_exp_year: process.env.TEST_CC_EXP_YEAR!
    };
}