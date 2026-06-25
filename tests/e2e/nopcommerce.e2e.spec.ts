import { test, expect } from "@playwright/test"
import { log } from "../helpers/loggers"
import HomePage from "../page-objects/nocommerce.home.page"

test("Login to the nopcommerce web App", async ({ page }, testInfo) => {
    //env configuration
    const envConfig = testInfo.project.use as any;
    //creating homepGE OBJ
    const homePage = new HomePage(page)

    //login
    await homePage.logIneCommApp(
        envConfig.nopCommerceWeb,
        process.env.nopCommUser,
        process.env.nopCommPass
    );
})