import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    private page: Page;

    // Locators
    private firstNameInput = '[data-test="firstName"]';
    private lastNameInput = '[data-test="lastName"]';
    private postalCodeInput = '[data-test="postalCode"]';
    private continueButton = '[data-test="continue"]';
    private finishButton = '[data-test="finish"]';
    private pageTitle = '[data-test="title"]';
    private completeHeader = '[data-test="complete-header"]';
    private subtotalLabel = '[data-test="subtotal-label"]';
    private taxLabel = '[data-test="tax-label"]';
    private totalLabel = '[data-test="total-label"]';
    private cartItem = '.cart_item';
    private itemName = '[data-test="inventory-item-name"]';
    private itemPrice = '[data-test="inventory-item-price"]';

    constructor(page: Page) {
        this.page = page;
    }

    async fillCustomerDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.page.locator(this.firstNameInput).fill(firstName);
        await this.page.locator(this.lastNameInput).fill(lastName);
        await this.page.locator(this.postalCodeInput).fill(postalCode);
        await this.page.locator(this.continueButton).click();
    }

    async assertProductsOnCheckout(expectedProducts: { name: string; priceText: string }[]): Promise<void> {
        const checkoutItemNames = await this.page.locator(this.itemName).allTextContents();

        for (const product of expectedProducts) {
            expect(checkoutItemNames).toContain(product.name);

            const checkoutPriceText = await this.page
                .locator(this.cartItem)
                .filter({ has: this.page.locator(this.itemName, { hasText: product.name }) })
                .first()
                .locator(this.itemPrice)
                .innerText();

            expect(checkoutPriceText).toBe(product.priceText);
        }
    }

    async assertPriceSummary(expectedProducts: { priceValue: number }[]): Promise<void> {
        const subtotalLabel = await this.page.locator(this.subtotalLabel).innerText();
        const taxLabel = await this.page.locator(this.taxLabel).innerText();
        const totalLabel = await this.page.locator(this.totalLabel).innerText();

        const subtotalValue = parseFloat(subtotalLabel.replace(/[^0-9.]/g, ''));
        const taxValue = parseFloat(taxLabel.replace(/[^0-9.]/g, ''));
        const totalValue = parseFloat(totalLabel.replace(/[^0-9.]/g, ''));

        const expectedSubtotal = expectedProducts.reduce((sum, p) => sum + p.priceValue, 0);
        expect(subtotalValue).toBeCloseTo(expectedSubtotal, 2);

        const expectedTotal = expectedSubtotal + taxValue;
        expect(totalValue).toBeCloseTo(expectedTotal, 2);
    }

    async assertCheckoutOverviewPage(): Promise<void> {
        await expect(this.page.locator(this.pageTitle)).toContainText('Checkout: Overview');
    }

    async finishOrder(): Promise<void> {
        await this.page.locator(this.finishButton).click();
    }

    async assertOrderConfirmation(): Promise<void> {
        await expect(this.page.locator(this.completeHeader)).toBeVisible();
        await expect(this.page.locator(this.completeHeader)).toMatchAriaSnapshot(
            `- heading "Thank you for your order!" [level=2]`
        );
    }
}
