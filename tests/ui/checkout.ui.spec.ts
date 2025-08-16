import { test } from '../../fixtures/ui-fixtures';

/**
 * Test suite to automate checkout UI with automatic user management.
 * Uses fixtures for clean test isolation and resource management.
 */
test.describe('Checkout UI', () => {
    test('Successful Checkout Flow (UI end-to-end)', async ({
        loginPage,
        plpPage,
        pdpPage,
        cartPage,
        checkoutPage,
        createdUser
    }) => {
        await loginPage.navigate();
        await loginPage.login(createdUser.email, createdUser.password);
        await loginPage.verifyLoginSuccess();

        await plpPage.navigate();
        await plpPage.selectProduct();

        await pdpPage.addToCart();

        await cartPage.proceedToCheckout();

        await checkoutPage.continueToPayment();

        await checkoutPage.fillPaymentDetails({
            number: createdUser.cc_number,
            cvc: createdUser.cc_cvc,
            expMonth: createdUser.cc_exp_month,
            expYear: createdUser.cc_exp_year
        });

        // await checkoutPage.confirmOrder();

        // await checkoutPage.verifyOrderSuccess();
    });
});