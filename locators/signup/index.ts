/**
 * Loads SignUp locators based on the current environment.
 * Supported values: 'qa', 'uat', 'prod' (case-insensitive). Defaults to 'prod'.
 */

const ENV = (process.env.ENV || 'prod').toLowerCase();

let locatorsModule: any;

switch (ENV) {
    case 'qa':
        locatorsModule = require('./signup.locators.qa');
        break;
    case 'uat':
        locatorsModule = require('./signup.locators.uat');
        break;
    default:
        locatorsModule = require('./signup.locators.prod');
}

export const signupLocators = locatorsModule.signupLocators;