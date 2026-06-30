import { Page, expect } from '@playwright/test';

export class SauceLoginPage {
    private page: Page;

    private usernameInput = '[data-test="username"]';
    private passwordInput = '[data-test="password"]';
    private loginButton = '[data-test="login-button"]';

    constructor(page: Page) {
        this.page = page;
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.usernameInput).press('Tab');
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async assertLoginSuccess(): Promise<void> {
        await expect(this.page).toHaveURL(/.*\/inventory/);
    }

    async loginToSauceDemo(username: string, password: string): Promise<void> {
        await this.login(username, password);
    }

    async assertSauceDemoLoginSuccess(): Promise<void> {
        await this.assertLoginSuccess();
    }
}