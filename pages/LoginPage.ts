import { Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // For these locators I would prefer to use page.getByTestId('username') etc. but the saucedemo app doesn't have data-testid attributes, so I'm using the existing data-test attributes instead.
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]')
        this.loginButton = page.locator('[data-test="login-button"]');
    }

    /**
     * Logs in to the application using the provided username and password.
     * @param {string} username - The username to log in with.
     * @param {string} password - The password to log in with.
     * @returns {Promise<void>} Resolves when the login action is complete.
     * @example
     * await LoginPage.login('myUsername', 'myPassword');
     */
    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}