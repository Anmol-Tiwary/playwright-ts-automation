import { Page, expect } from '@playwright/test';

export class CartPage {
    private page: Page;

    // Locators
    private cartItemNames = '[data-test="inventory-item-name"]';
    private checkoutButton = '[data-test="checkout"]';

    constructor(page: Page) {
        this.page = page;
    }

    async assertProductsInCart(expectedProducts: string[]): Promise<void> {
        const cartItemNames = await this.page.locator(this.cartItemNames).allTextContents();
        for (const product of expectedProducts) {
            expect(cartItemNames).toContain(product);
        }
    }

    async proceedToCheckout(): Promise<void> {
        await this.page.locator(this.checkoutButton).click();
    }
}
