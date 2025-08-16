import { Page, Locator } from '@playwright/test';
import { pdpLocators } from '../locators/pdp/index';

/**
 * Page Object for the Product Detail Page (PDP).
 * Handles interactions such as adding a product to the cart and navigating to the cart page.
 */
export class PdpPage {
    /** Locator for the Attentive overlay close button. Adjust selector if needed. */
    private readonly attentiveCloseButton: Locator;
    /** Locators for the add to cart button and view cart link. */
    private readonly addToCartButton: Locator;
    private readonly viewCartLink: Locator;

    /**
     * Initializes a new instance of the PdpPage.
     * @param page The Playwright Page object for the PDP.
     */
    constructor(private readonly page: Page) {
        this.addToCartButton = this.page.locator(pdpLocators.addToCartButton).first();
        this.viewCartLink = this.page.locator(pdpLocators.viewCartLink);
        this.attentiveCloseButton = this.page.locator(pdpLocators.attentiveCloseButton);
    }

    /**
     * Adds the product to the cart and navigates to the cart page.
     * Waits for each navigation action to complete before proceeding.
     */
    async addToCart() {
        await this.page.waitForLoadState('load');
        await this.addToCartButton.click();
        await this.page.waitForLoadState('load');
        // If the Attentive overlay appears, close it before continuing
        if (await this.attentiveCloseButton.isVisible({ timeout: 2000 }).catch(() => false)) {
            await this.attentiveCloseButton.click();
            await this.attentiveCloseButton.waitFor({ state: 'hidden', timeout: 4000 }).catch(() => { });
        }
        await this.viewCartLink.click();
        await this.page.waitForLoadState('load');
    }
}