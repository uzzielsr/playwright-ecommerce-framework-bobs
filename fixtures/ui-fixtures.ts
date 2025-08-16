import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { SignupPage } from '../pages/signup.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';
import { PlpPage } from '../pages/plp.page';
import { PdpPage } from '../pages/pdp.page';
import { generateTestUser } from '../utils/test-users';

/**
 * UI test fixtures with pre-configured page objects and user data.
 */
type UIFixtures = {
    loginPage: LoginPage;
    signupPage: SignupPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    plpPage: PlpPage;
    pdpPage: PdpPage;
    testUser: ReturnType<typeof generateTestUser>;
    createdUser: ReturnType<typeof generateTestUser>;
    // testUser: ReturnType<typeof generateTestUser>; // Temporarily disabled for UI-only mode
    // createdUser: ReturnType<typeof generateTestUser>; // Temporarily disabled for UI-only mode
    signupUser: ReturnType<typeof generateTestUser>;
};

/**
 * Extended test with UI fixtures for page objects and user management.
 */

export const test = base.extend<UIFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    signupPage: async ({ page }, use) => {
        await use(new SignupPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    plpPage: async ({ page }, use) => {
        await use(new PlpPage(page));
    },

    pdpPage: async ({ page }, use) => {
        await use(new PdpPage(page));
    },

    testUser: async ({ }, use) => {
        await use(generateTestUser());
    },

    signupUser: async ({ }, use) => {
        // Generates a random user for signup tests
        await use(generateTestUser());
    },

    createdUser: async ({ }, use) => {
        // Use fixed email from .env for login/checkout tests
        await use({
            email: process.env.TEST_EMAIL || '',
            password: process.env.TEST_PASSWORD || '',
            invalidPassword: process.env.TEST_INVALID_PASSWORD || '',
            firstname: process.env.TEST_FIRST_NAME || '',
            lastname: process.env.TEST_LAST_NAME || '',
            city: process.env.TEST_CITY || '',
            cc_number: process.env.TEST_CC_NUMBER || '',
            cc_cvc: process.env.TEST_CC_CVC || '',
            cc_exp_month: process.env.TEST_CC_EXP_MONTH || '',
            cc_exp_year: process.env.TEST_CC_EXP_YEAR || ''
        });
    },
});

export { expect } from '@playwright/test';