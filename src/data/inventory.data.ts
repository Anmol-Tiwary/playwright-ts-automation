// ─── SauceDemo Credentials ─────────────────────────────────────────────────
export const SAUCEDEMO_CREDENTIALS = {
    username: 'standard_user',
    password: 'secret_sauce',
};

// ─── Customer Details for Checkout ─────────────────────────────────────────
export const CUSTOMER_DETAILS = {
    firstName: 'Anmol',
    lastName: 'Kumar',
    postalCode: '145662',
};

// ─── Products to add to cart ───────────────────────────────────────────────
export const PRODUCTS_TO_ADD = [
    {
        name: 'Sauce Labs Backpack',
        button: '[data-test="add-to-cart-sauce-labs-backpack"]',
        priceText: '',
        priceValue: 0,
    },
    {
        name: 'Sauce Labs Fleece Jacket',
        button: '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
        priceText: '',
        priceValue: 0,
    },
    {
        name: 'Test.allTheThings() T-Shirt (Red)',
        button: '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
        priceText: '',
        priceValue: 0,
    },
];

// ─── Expected product count on inventory page ──────────────────────────────
export const EXPECTED_PRODUCT_COUNT = 6;
