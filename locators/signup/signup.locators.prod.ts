/**
 * Signup page locators.
 * These may change depending on the current ENV (e.g., qa, uat, prod).
 */
export const signupLocators = {
    // New locators for the signup modal of mybobs.com
    signUpLink: 'a.bold:has-text("Sign Up")',
    modal: 'form.signup-form',
    firstNameInput: 'input[formcontrolname="firstName"]',
    lastNameInput: 'input[formcontrolname="lastName"]',
    emailInput: 'input[formcontrolname="email"]',
    passwordInput: 'input[formcontrolname="password"]',
    confirmPasswordInput: 'input[formcontrolname="confirmPassword"]',
    consentCheckbox: 'input[formcontrolname="isConsentGranted"]',
    subscribeCheckbox: 'input[formcontrolname="isSubscribed"]',
    signUpButton: 'form.signup-form button[type="submit"]:has-text("Sign up")',
    successMessage: 'div.top-banner-notification.alert-success span',
};