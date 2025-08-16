import { Page, Locator } from '@playwright/test';
import { cartLocators } from '../locators/cart/index';

/**
 * Page Object for the Cart page.
 * Handles navigation actions from the cart, such as proceeding to checkout.
 */
export class CartPage {
    /** Locator for the proceed to checkout button on the cart page. */
    private readonly proceedToCheckoutButton: Locator;
    private readonly closePopupButton: Locator;

    /**
     * Initializes a new instance of the CartPage.
     * @param page The Playwright Page object to interact with the cart page.
     */
    constructor(private readonly page: Page) {
        this.proceedToCheckoutButton = this.page.locator(cartLocators.proceedToCheckoutButton).first();
        this.closePopupButton = this.page.locator(cartLocators.closePopupButton);
    }

    /**
     * Proceeds to the checkout page by clicking the proceed to checkout button.
     * Waits for the page to fully load after the action.
     * Cierra cualquier popup si aparece antes de continuar.
     * @throws Will fail if the button is not clickable or the page fails to load.
     */
    async proceedToCheckout() {
        // If the overlay popup appears, close it before continuing
        if (await this.closePopupButton.isVisible({ timeout: 2000 }).catch(() => false)) {
            await this.closePopupButton.click();
            await this.page.waitForLoadState('load');
            await this.closePopupButton.waitFor({ state: 'hidden', timeout: 4000 }).catch(() => { });
        }
        // Click the proceed to checkout button and wait for the page to load
        await this.proceedToCheckoutButton.click();
        await this.page.waitForLoadState('load');
    }
}