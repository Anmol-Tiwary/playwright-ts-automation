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

    test("should validate the prie tag of product", async ({ page }) => {
        // get a list of product
        let prodEles = page.locator(".inventory_item");
        await expect(prodEles).toHaveCount(6);

        //get prod name and prices
        let totalProd = await prodEles.count();

        let priceArr = []

        for (let i = 0; i < totalProd; i++) {
            let eleNode = prodEles.nth(i);

            let prodName = await eleNode.locator(".inventory_item_name").innerText()
            let price = await eleNode.locator(".inventory_item_price").innerText()

            //Prinnt the result
            console.log(`Products:  ${prodName}, Price: ${price}`)
            priceArr.push(price)
        }

let priceArrNum = priceArr.map((item) => parseFloat(item.replace("$", "")))
console.log(`>> Modified arr: ${priceArrNum}`)

let zeroValueProd = priceArrNum.filter((item) => item <=0);

if (zeroValueProd.length>0) {
    console.log(`Error: Zero value prod found, ${zeroValueProd}`)
} else {
    console.log("all prod pricess are non zero");
}

expect(zeroValueProd).toHaveLength(0)

    })
});