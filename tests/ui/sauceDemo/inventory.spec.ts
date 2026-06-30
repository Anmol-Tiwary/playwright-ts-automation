import { test, expect } from '../../../src/fixtures/fixtures'; // ✅ correct
import {
    SAUCEDEMO_CREDENTIALS,
    CUSTOMER_DETAILS,
    PRODUCTS_TO_ADD,
    EXPECTED_PRODUCT_COUNT,
} from '../../../src/data/inventory.data';

test.describe('Inventory Feature', {
    annotation: {
        type: 'Story',
        description: 'Validate product prices and cart checkout flow on SauceDemo',
    },
}, () => {

    test.beforeEach('Login to SauceDemo', async ({ loginPage, page }, testInfo) => {
        await page.goto('https://www.saucedemo.com');
        await loginPage.loginToSauceDemo(SAUCEDEMO_CREDENTIALS.username, SAUCEDEMO_CREDENTIALS.password);
        await loginPage.assertSauceDemoLoginSuccess();

        const screenshot = await page.screenshot({ fullPage: true });
        await testInfo.attach('Login Success Screenshot', {
            body: screenshot,
            contentType: 'image/png',
        });
    });

    test('Should validate all product prices are non-zero', {
        annotation: { type: 'Test', description: 'Validating the prices of all products' },
        tag: '@smoke',
    }, async ({ inventoryPage }) => {

        await inventoryPage.assertProductCount(EXPECTED_PRODUCT_COUNT);

        const products = await inventoryPage.getAllProductPrices();
        const priceValues = products.map((p) => p.priceValue);

        console.log(`>> Price array: ${priceValues}`);
        await inventoryPage.assertNoPriceIsZero(priceValues);
    });

    test('Should add products to cart, complete checkout and verify order confirmation', {
        tag: '@regression',
    }, async ({ inventoryPage, cartPage, checkoutPage }) => {

        // Step 1: Add products to cart and capture live prices
        const productsWithPrices = [];
        for (const product of PRODUCTS_TO_ADD) {
            const { priceText, priceValue } = await inventoryPage.getProductPrice(product.name);
            await inventoryPage.addProductToCart(product.button);
            productsWithPrices.push({ ...product, priceText, priceValue });
        }

        // Step 2: Verify cart contents
        await inventoryPage.goToCart();
        await cartPage.assertProductsInCart(productsWithPrices.map((p) => p.name));

        // Step 3: Fill checkout info
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCustomerDetails(
            CUSTOMER_DETAILS.firstName,
            CUSTOMER_DETAILS.lastName,
            CUSTOMER_DETAILS.postalCode
        );

        // Step 4: Validate checkout overview
        await checkoutPage.assertProductsOnCheckout(productsWithPrices);
        await checkoutPage.assertPriceSummary(productsWithPrices);
        await checkoutPage.assertCheckoutOverviewPage();

        // Step 5: Finish order and confirm
        await checkoutPage.finishOrder();
        await checkoutPage.assertOrderConfirmation();
    });
});
