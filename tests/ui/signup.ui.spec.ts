import { test } from '../../fixtures/ui-fixtures';

/**
 * Test suite to automate account creation UI with automatic cleanup.
 * Uses fixtures for clean test isolation and resource management.
 */
test.describe('Account Creation UI', () => {
    test('Successful Account Creation with Valid Data', async ({
        signupPage,
        signupUser
    }) => {
        await signupPage.navigate();
        await signupPage.signUp(signupUser);
        await signupPage.verifyAccountCreated();
    });
});