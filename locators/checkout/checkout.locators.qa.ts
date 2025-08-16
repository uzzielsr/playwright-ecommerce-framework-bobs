/**
 * Checkout page locators.
 * These may change depending on the current ENV (e.g., qa, uat, prod).
 */
export const checkoutLocators = {
    ccIframe: 'iframe#ccframe',
    ccNumberInput: 'input#ccNum.bobs-credit-card-iframe-num-input',
    cvcInput: 'input#ccCVV.bobs-credit-card-iframe-cvv-input',
    expMonthInput: 'select#expMnth.bobStyleSelect',
    expYearInput: 'select#expYear.bobStyleSelect',
    confirmOrderButton: 'button[data-qa="pay-button"]',
    orderSuccessMessage: 'h2[data-qa="order-placed"]',
    firstNameInput: 'input[formcontrolname="firstName"]',
    lastNameInput: 'input[formcontrolname="lastName"]',
    emailInput: 'input[formcontrolname="email"]',
    phoneInput: 'input[formcontrolname="phone"]',
    addressInput: 'input[formcontrolname="line1"]',
    cityInput: 'input[formcontrolname="town"]',
    zipInput: 'input[formcontrolname="postalCode"]',
    stateSelect: 'ng-select[formcontrolname="isocode"]',
    stateOption: '.ng-option',
    continueToPaymentButton: 'button.btn.btn-block.btn-primary.next-btn:has-text("Continue to payment")',
    reviewOrderButton: 'button.btn.btn-block.btn-primary.bobs-review-order-button',
    placeOrderButton: 'button[class="bobs-button bobs-button--cart-action bobs-button--default"]',
};