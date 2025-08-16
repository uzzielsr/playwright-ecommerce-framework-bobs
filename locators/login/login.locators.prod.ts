/**
 * Login page locators.
 * These may change depending on the current ENV (e.g., qa, uat, prod).
 */
export const loginLocators = {
    // Drawer login locators
    drawerHeader: '[class*=bobs-account-drawer][class*=drawer]',
    drawerEmailInput: 'input[formcontrolname="email"]',
    drawerContinueButton: 'button.sofa-button-pill-md.sofa-button-red.sofa-button-stretch:has-text("Continue")',
    drawerPasswordInput: 'input[type="password"]',
    drawerSignInButton: 'button.sofa-button-pill-md.sofa-button-red.sofa-button-stretch:visible:has-text("Sign In")',
    signInWithPasswordButton: 'button.sofa-button-pill-md.sofa-button-grey.sofa-button-stretch:has-text("Sign in with Password")',
    drawerCloseButton: 'button.close-button',
    loggedInIndicator: 'div.top-banner-notification.alert-success span:has-text("Login Successful: Welcome back!")',
    loginErrorMessage: 'div#invalid-password-error[sofa-input-error]',
};