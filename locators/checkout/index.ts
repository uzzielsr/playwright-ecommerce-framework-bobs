/**
 * Loads Checkout locators based on the current environment.
 * Supported values: 'qa', 'uat', 'prod' (case-insensitive). Defaults to 'prod'.
 */

const ENV = (process.env.ENV || 'prod').toLowerCase();

let locatorsModule: any;

switch (ENV) {
    case 'qa':
        locatorsModule = require('./checkout.locators.qa');
        break;
    case 'uat':
        locatorsModule = require('./checkout.locators.uat');
        break;
    default:
        locatorsModule = require('./checkout.locators.prod');
}

export const checkoutLocators = locatorsModule.checkoutLocators;