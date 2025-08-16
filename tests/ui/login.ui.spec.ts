import { test } from '../../fixtures/ui-fixtures';

/**
 * Test suite to automate login UI with automatic user management.
 * Uses fixtures for clean test isolation and resource management.
 */
test.describe('Automate Login UI', () => {
    test('Should log in successfully with valid credentials', async ({
        loginPage,
        createdUser
    }) => {
        await loginPage.navigate();
        await loginPage.login(createdUser.email, createdUser.password);
        await loginPage.verifyLoginSuccess();
    });

    test('Should display error for invalid login credentials', async ({
        loginPage,
        createdUser
    }) => {
        await loginPage.navigate();
        await loginPage.login(createdUser.email, createdUser.invalidPassword);
        await loginPage.verifyLoginFailure();
    });
});