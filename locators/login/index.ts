/**
 * Loads Login locators based on the current environment.
 * Supported values: 'qa', 'uat', 'prod' (case-insensitive). Defaults to 'prod'.
 */

const ENV = (process.env.ENV || 'prod').toLowerCase();

let locatorsModule: any;

switch (ENV) {
    case 'qa':
        locatorsModule = require('./login.locators.qa');
        break;
    case 'uat':
        locatorsModule = require('./login.locators.uat');
        break;
    default:
        locatorsModule = require('./login.locators.prod');
}

export const loginLocators = locatorsModule.loginLocators;