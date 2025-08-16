/**
 * Loads PLP locators based on the current environment.
 * Supported values: 'qa', 'uat', 'prod' (case-insensitive). Defaults to 'prod'.
 */

const ENV = (process.env.ENV || 'prod').toLowerCase();

let locatorsModule: any;

switch (ENV) {
    case 'qa':
        locatorsModule = require('./plp.locators.qa');
        break;
    case 'uat':
        locatorsModule = require('./plp.locators.uat');
        break;
    default:
        locatorsModule = require('./plp.locators.prod');
}

export const plpLocators = locatorsModule.plpLocators;