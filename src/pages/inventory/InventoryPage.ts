import { Page, expect } from '@playwright/test';

export class InventoryPage {
    private page: Page;

    // Locators
    private inventoryItems = '.inventory_item';
    private itemName = '.inventory_item_name';
    private itemPrice = '.inventory_item_price';
    private cartLink = '[data-test="shopping-cart-link"]';

    constructor(page: Page) {
        this.page = page;
    }

    async assertProductCount(expectedCount: number): Promise<void> {
        await expect(this.page.locator(this.inventoryItems)).toHaveCount(expectedCount);
    }

    async getAllProductPrices(): Promise<{ name: string; priceText: string; priceValue: number }[]> {
        const productElements = this.page.locator(this.inventoryItems);
        const totalProducts = await productElements.count();
        const products = [];

        for (let i = 0; i < totalProducts; i++) {
            const element = productElements.nth(i);
            const name = await element.locator(this.itemName).innerText();
            const priceText = await element.locator(this.itemPrice).innerText();
            const priceValue = parseFloat(priceText.replace('$', ''));
            console.log(`Product: ${name}, Price: ${priceText}`);
            products.push({ name, priceText, priceValue });
        }

        return products;
    }

    async assertNoPriceIsZero(prices: number[]): Promise<void> {
        const zeroPrices = prices.filter((price) => price <= 0);
        if (zeroPrices.length > 0) {
            console.log(`Error: Zero value products found: ${zeroPrices}`);
        } else {
            console.log('All product prices are non-zero');
        }
        expect(zeroPrices).toHaveLength(0);
    }

    async getProductPrice(productName: string): Promise<{ priceText: string; priceValue: number }> {
        const productCard = this.page
            .locator(this.inventoryItems)
            .filter({ has: this.page.locator(this.itemName, { hasText: productName }) })
            .first();

        const priceText = await productCard.locator(this.itemPrice).innerText();
        const priceValue = parseFloat(priceText.replace('$', ''));
        return { priceText, priceValue };
    }

    async addProductToCart(buttonSelector: string): Promise<void> {
        await this.page.locator(buttonSelector).click();
    }

    async goToCart(): Promise<void> {
        await this.page.locator(this.cartLink).click();
    }
}
