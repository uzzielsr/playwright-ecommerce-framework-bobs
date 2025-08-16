import { Page, Locator, expect } from '@playwright/test';
import { checkoutLocators } from '../locators/checkout/index';

/**
 * Page Object for the Checkout page.
 * Provides methods to handle payment processing and order verification.
 */
export class CheckoutPage {
    private readonly placeOrderButton: Locator;
    private readonly nameInput: Locator;
    private readonly ccNumberInput: Locator;
    private readonly cvcInput: Locator;
    private readonly expMonthInput: Locator;
    private readonly expYearInput: Locator;
    private readonly confirmOrderButton: Locator;
    private readonly orderSuccessMessage: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly phoneInput: Locator;
    private readonly addressInput: Locator;
    private readonly cityInput: Locator;
    private readonly zipInput: Locator;
    private readonly stateSelect: Locator;
    private readonly stateOption: (state: string) => Locator;
    private readonly continueToPaymentButton: Locator;

    constructor(private readonly page: Page) {
        this.placeOrderButton = this.page.locator(checkoutLocators.placeOrderButton);
        this.nameInput = this.page.locator(checkoutLocators.nameInput);
        this.ccNumberInput = this.page.locator(checkoutLocators.ccNumberInput);
        this.cvcInput = this.page.locator(checkoutLocators.cvcInput);
        this.expMonthInput = this.page.locator(checkoutLocators.expMonthInput);
        this.expYearInput = this.page.locator(checkoutLocators.expYearInput);
        this.confirmOrderButton = this.page.locator(checkoutLocators.confirmOrderButton);
        this.orderSuccessMessage = this.page.locator(checkoutLocators.orderSuccessMessage);
        this.firstNameInput = this.page.locator(checkoutLocators.firstNameInput);
        this.lastNameInput = this.page.locator(checkoutLocators.lastNameInput);
        this.emailInput = this.page.locator(checkoutLocators.emailInput);
        this.phoneInput = this.page.locator(checkoutLocators.phoneInput);
        this.addressInput = this.page.locator(checkoutLocators.addressInput);
        this.cityInput = this.page.locator(checkoutLocators.cityInput);
        this.zipInput = this.page.locator(checkoutLocators.zipInput);
        this.stateSelect = this.page.locator(checkoutLocators.stateSelect);
        this.stateOption = (state: string) => this.page.locator(checkoutLocators.stateOption, { hasText: state });
        this.continueToPaymentButton = this.page.locator(checkoutLocators.continueToPaymentButton);
    }

    /**
     * Clicks the 'Continue to payment' button in the checkout flow.
     */
    async continueToPayment() {
        await this.continueToPaymentButton.click();
        await this.page.waitForLoadState('load');
    }
    /**
     * Fills the payment details form with the provided card information (inside iframe).
     * @param card An object containing number, cvc, expMonth, and expYear.
     */
    async fillPaymentDetails(card: { number: string; cvc: string; expMonth: string; expYear: string }) {
        const iframeElement = await this.page.waitForSelector(checkoutLocators.ccIframe, { state: 'attached', timeout: 10000 });
        const frame = await iframeElement.contentFrame();
        if (!frame) throw new Error('Credit card iframe (ccframe) not found');
        await frame.fill(checkoutLocators.ccNumberInput, card.number);
        await frame.fill(checkoutLocators.cvcInput, card.cvc);
        await frame.selectOption(checkoutLocators.expMonthInput, card.expMonth);
        await frame.selectOption(checkoutLocators.expYearInput, card.expYear);
        // await this.page.click(checkoutLocators.reviewOrderButton);
    }

    /**
     * Confirms the order by clicking the confirm order button.
     * Waits for the page to fully load after the action.
     */
    async confirmOrder() {
        await this.confirmOrderButton.click();
        await this.page.waitForLoadState('load');
    }

    /**
     * Verifies that the order was successfully placed by checking the success message.
     */
    async verifyOrderSuccess() {
        await expect(this.orderSuccessMessage).toContainText('Order Placed!');
    }
}