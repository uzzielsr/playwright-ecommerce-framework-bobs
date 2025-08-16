/**
 * Loads PDP locators based on the current environment.
 * Supported values: 'qa', 'uat', 'prod'. Defaults to 'prod'.
 */

const ENV = (process.env.ENV || 'prod').toLowerCase();

let locatorsModule: any;

switch (ENV) {
    case 'qa':
        locatorsModule = require('./pdp.locators.qa');
        break;
    case 'uat':
        locatorsModule = require('./pdp.locators.uat');
        break;
    default:
        locatorsModule = require('./pdp.locators.prod');
}

export const pdpLocators = locatorsModule.pdpLocators;