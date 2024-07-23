import { Page } from "@playwright/test";

class LoginPage {
    fields = {
        loginPage: {
            usernameInputSel: () => 'input[name="username"]',
            passwordInputSel: () => 'input[name="password"]',
            loginBtnSel: () => `button[type='submit']`,
        },
    };
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async loginToXcontrol(email: string, password: string): Promise<void> {
        // await this.page.waitForSelector()
        await this.page.fill(this.fields.loginPage.usernameInputSel(), email);
        await this.page.fill(this.fields.loginPage.passwordInputSel(), password);
        await this.page.click(this.fields.loginPage.loginBtnSel());
        await this.page.waitForURL(process.env.APP_URL as string)
    }
}

export { LoginPage };
