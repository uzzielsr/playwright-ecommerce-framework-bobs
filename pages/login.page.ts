import { Page, Locator, expect } from '@playwright/test';
import { loginLocators } from '../locators/login/index';

/**
 * Page Object for the Login page.
 * Represents the Login page for handling login-related actions.
 */
export class LoginPage {
    /** Locators for the login page and drawer. */
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly loggedInIndicator: Locator;
    private readonly loginErrorMessage: Locator;
    private readonly accountIcon: Locator;
    private readonly drawerHeader: Locator;
    private readonly drawerEmailInput: Locator;
    private readonly drawerContinueButton: Locator;
    private readonly signInWithPasswordButton: Locator;
    private readonly drawerPasswordInput: Locator;
    private readonly drawerSignInButton: Locator;
    private readonly drawerCloseButton: Locator;

    /**
     * Initializes a new instance of the LoginPage.
     * @param page The Playwright Page object for the login page.
     */
    constructor(private readonly page: Page) {
        this.emailInput = this.page.locator(loginLocators.emailInput);
        this.passwordInput = this.page.locator(loginLocators.passwordInput);
        this.loginButton = this.page.locator(loginLocators.loginButton);
        this.loggedInIndicator = this.page.locator(loginLocators.loggedInIndicator);
        this.loginErrorMessage = this.page.locator(loginLocators.loginErrorMessage);
        this.accountIcon = this.page.locator(loginLocators.accountIcon ?? 'span.bobs-icon-link__link bobs-icon .bobs-icon-ACCOUNT');
        this.drawerHeader = this.page.locator(loginLocators.drawerHeader);
        this.drawerEmailInput = this.page.locator(loginLocators.drawerEmailInput);
        this.drawerContinueButton = this.page.locator(loginLocators.drawerContinueButton);
        this.signInWithPasswordButton = this.page.locator(loginLocators.signInWithPasswordButton);
        this.drawerPasswordInput = this.page.locator(loginLocators.drawerPasswordInput);
        this.drawerSignInButton = this.page.locator(loginLocators.drawerSignInButton);
        this.drawerCloseButton = this.page.locator(loginLocators.drawerCloseButton);
    }

    /**
     * Navigates to the login page and waits for it to load.
     * @throws Error if BASE_URL is not defined.
     */
    async navigate() {
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) {
            throw new Error('BASE_URL is not defined in .env');
        }
        await this.page.goto(`${baseUrl}`);
        await this.page.waitForLoadState('load');
    }

    /**
     * Performs login using the account drawer only (not the traditional login page).
     * @param email The email to use.
     * @param password The password to use.
     */
    async login(email: string, password: string) {
        // Clean cookies and localStorage before login to avoid flaky session state
        await this.page.context().clearCookies();
        // await this.page.evaluate(() => localStorage.clear());
        await this.page.goto('/');
        await this.page.waitForLoadState('load');
        // Open the account drawer
        await this.accountIcon.waitFor({ state: 'visible', timeout: 3000 });
        await this.accountIcon.click();
        await this.page.waitForLoadState('load');
        // Wait for the email input
        await this.drawerEmailInput.waitFor({ state: 'visible', timeout: 3000 });
        // Fill email and continue
        await this.drawerEmailInput.fill(email);
        await this.drawerContinueButton.click();
        // Wait for and click 'Sign in with Password' if present
        await this.signInWithPasswordButton.waitFor({ state: 'visible', timeout: 3000 });
        await this.signInWithPasswordButton.click();
        // Wait for password input
        await this.drawerPasswordInput.waitFor({ state: 'visible', timeout: 3000 });
        await this.drawerPasswordInput.fill(password);
        await this.drawerSignInButton.click();
        await this.page.waitForLoadState('load');
    }

    /**
     * Verifies successful login by checking the success banner message.
     */
    async verifyLoginSuccess() {
        await expect(this.loggedInIndicator).toContainText('Login Successful: Welcome back!');
    }

    /**
     * Verifies login failure by checking the error message.
     */
    async verifyLoginFailure() {
        await expect(this.loginErrorMessage).toContainText("Please enter a valid password");
    }
}