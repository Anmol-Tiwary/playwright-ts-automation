import { test, expect } from '@playwright/test';

test.describe("Inventory feature", () => {

    test.beforeEach('login with valid credentials', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="username"]').press('Tab');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();

        // loggin url assertion
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await expect(page).toHaveURL(/.*\/inventory/);
    });

test("should validate the prie tag of product", async ({page}) => {

})
});