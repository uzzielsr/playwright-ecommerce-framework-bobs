/**
 * Loads Cart locators based on the current environment.
 * Supported values: 'qa', 'uat', 'prod'. Defaults to 'prod'.
 */

const ENV = (process.env.ENV || 'prod').toLowerCase();

let locatorsModule: any;

switch (ENV) {
    case 'qa':
        locatorsModule = require('./cart.locators.qa');
        break;
    case 'uat':
        locatorsModule = require('./cart.locators.uat');
        break;
    default:
        locatorsModule = require('./cart.locators.prod');
}

export const cartLocators = locatorsModule.cartLocators;