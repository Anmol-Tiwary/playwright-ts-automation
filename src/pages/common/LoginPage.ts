import { Page, expect } from '@playwright/test';

export class LoginPage {
    private page: Page;

    // Locators — SauceDemo
    private sauceUsernameInput = '[data-test="username"]';
    private saucePasswordInput = '[data-test="password"]';
    private sauceLoginButton = '[data-test="login-button"]';

    // Locators — Make Appointment (CURA Healthcare)
    private appointmentUsernameInput = '#txt-username';
    private appointmentPasswordInput = '#txt-password';
    private appointmentLoginButton = '#btn-login';

    constructor(page: Page) {
        this.page = page;
    }

    // ─── SauceDemo Login ───────────────────────────────────────────────
    async loginToSauceDemo(username: string, password: string): Promise<void> {
        await this.page.locator(this.sauceUsernameInput).fill(username);
        await this.page.locator(this.sauceUsernameInput).press('Tab');
        await this.page.locator(this.saucePasswordInput).fill(password);
        await this.page.locator(this.sauceLoginButton).click();
    }

    async assertSauceDemoLoginSuccess(): Promise<void> {
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await expect(this.page).toHaveURL(/.*\/inventory/);
    }

    // ─── Make Appointment Login ────────────────────────────────────────
    async loginToAppointment(username: string, password: string): Promise<void> {
        await this.page.locator(this.appointmentUsernameInput).fill(username);
        await this.page.locator(this.appointmentPasswordInput).fill(password);
        await this.page.locator(this.appointmentLoginButton).click();
    }

    async assertAppointmentLoginSuccess(): Promise<void> {
        await expect(this.page).toHaveURL(/.*\/#make-appointment/);
    }
}
