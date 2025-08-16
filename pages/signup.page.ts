import { Page, Locator, expect } from '@playwright/test';
import { signupLocators } from '../locators/signup/index';

/**
 * Page Object representing the Signup page.
 * Handles new user account creation by interacting with the signup form.
 */
export class SignupPage {
    // Locators for the new signup modal flow (centralized)
    private readonly signUpLink: Locator;
    private readonly modal: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly consentCheckbox: Locator;
    private readonly subscribeCheckbox: Locator;
    private readonly signUpButton: Locator;
    private readonly successMessage: Locator;

    /**
  * Initializes a new instance of the SignupPage.
  * @param page The Playwright Page object for the signup process.
  */
    constructor(private readonly page: Page) {
        this.signUpLink = page.locator(signupLocators.signUpLink);
        this.modal = page.locator(signupLocators.modal);
        // Scope the inputs to the modal to avoid conflicts with the login
        this.firstNameInput = this.modal.locator(signupLocators.firstNameInput);
        this.lastNameInput = this.modal.locator(signupLocators.lastNameInput);
        this.emailInput = this.modal.locator(signupLocators.emailInput);
        this.passwordInput = this.modal.locator(signupLocators.passwordInput);
        this.confirmPasswordInput = this.modal.locator(signupLocators.confirmPasswordInput);
        this.consentCheckbox = this.modal.locator(signupLocators.consentCheckbox);
        this.subscribeCheckbox = this.modal.locator(signupLocators.subscribeCheckbox);
        // Use a more robust selector for the button inside the modal
        this.signUpButton = this.modal.locator('button[type="submit"]:has-text("Sign up")');
        this.successMessage = page.locator(signupLocators.successMessage);
    }

    /**
     * Navigates to the signup/login page.
     * @throws Error if BASE_URL is not defined in the environment.
     */
    async navigate() {
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) {
            throw new Error('BASE_URL is not defined in .env');
        }
        await this.page.goto(`${baseUrl}/login`);
        await this.page.waitForLoadState('load');
    }

    /**
     * Completes the signup form using the provided user data.
     * @param user The user data used to fill in the form fields.
     */
    async signUp(user: {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
    }) {
        // Click the Sign Up link to open the modal
        await this.signUpLink.click();
        await this.modal.waitFor({ state: 'visible' });
        await this.firstNameInput.fill(user.firstname);
        await this.lastNameInput.fill(user.lastname);
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.confirmPasswordInput.fill(user.password);
        await this.consentCheckbox.check();
        // If you want to subscribe to emails, uncomment the following line:
        // await this.subscribeCheckbox.check();
        await expect(this.signUpButton).toBeEnabled({ timeout: 5000 });
        await this.signUpButton.click();
        await this.page.waitForTimeout(2000); // Adjust according to real behavior
        // Capture error message if it exists
        const errorMsg = await this.modal.locator('.form-error-message, .error, .alert-danger').first();
        if (await errorMsg.isVisible()) {
            const msg = await errorMsg.textContent();
            console.log('Signup error message:', msg);
        }
    }

    /**
     * Asserts that the account was created successfully by checking the confirmation message.
     */
    async verifyAccountCreated() {
        // Verify that the success text is present on the page, without relying on a specific locator
        await expect(this.page.locator('body')).toContainText('Sign up Successful: Welcome!');
    }
}