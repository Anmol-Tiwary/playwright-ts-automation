import { Page, expect } from '@playwright/test';

export class CuraLoginPage {
    private page: Page;

    private homeUrl = 'https://katalon-demo-cura.herokuapp.com';
    private loginUrl = `${this.homeUrl}/profile.php#login`;

    private usernameInput = '#txt-username';
    private passwordInput = '#txt-password';
    private loginButton = '#btn-login';
    private errorMessage = 'text=Login failed! Please ensure the username and password are valid.';
    private logoutLink = 'text=Logout';
    private homeHeader = 'h1';

    constructor(page: Page) {
        this.page = page;
    }

    async gotoHome(): Promise<void> {
        await this.page.goto(this.homeUrl);
    }

    async gotoLogin(): Promise<void> {
        await this.page.goto(this.loginUrl);
    }

    async assertHomeVisible(): Promise<void> {
        await expect(this.page.locator(this.homeHeader)).toContainText('CURA Healthcare Service');
    }

    async assertLoginFormVisible(): Promise<void> {
        await expect(this.page.locator(this.usernameInput)).toBeVisible();
        await expect(this.page.locator(this.passwordInput)).toBeVisible();
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    async assertLoggedIn(): Promise<void> {
        await expect(this.page.locator(this.logoutLink)).toBeVisible();
        await expect(this.page).toHaveURL(/#appointment/);
    }

    async assertLoginFailed(): Promise<void> {
        await expect(this.page.locator(this.errorMessage)).toBeVisible();
    }

    async assertOnLoginPage(): Promise<void> {
        await expect(this.page).toHaveURL(this.loginUrl);
    }
}