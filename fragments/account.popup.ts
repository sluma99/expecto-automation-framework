import {Page, test} from "@playwright/test";

export class AccountPopup {

    constructor(
        private readonly page: Page,

        private readonly emailInput = page.locator(`input[name='emailAddress']`),
        private readonly passwordInput = page.locator(`input[name='password']`),
        private readonly roleInput = page.locator(`//div[@class='react-select__input-container css-n9qnu9']//input[@id='react-select-2-input']`),
        private readonly roleField = page.locator(`div[id='react-select-2-option-0']`),
        private readonly customerInput = page.locator(`//div[@class='react-select__input-container css-n9qnu9']//input[@id='react-select-3-input']`),
        private readonly customerField = page.locator(`div[id='react-select-3-option-0']`),
        private readonly submitBtn = page.locator(`//div[@class='styles_actions__pgyTb']/button[2]`),
    ) {}

    async fillEmailInputField(email: string) {
        await test.step('I fill email', async () => {
            await this.emailInput.isVisible();
            await this.emailInput.clear();
            await this.emailInput.fill(email);
        })
    }

    async fillPasswordInputField(password: string) {
        await test.step('I fill password', async () => {
            await this.passwordInput.isVisible();
            await this.passwordInput.fill(password);
        })
    }

    async selectRoleInputField() {
        await this.roleInput.isVisible();
        await this.roleInput.click();
        await this.roleField.isVisible();
        await this.roleField.click();
    }

    async selectCustomerInputField() {
        await this.customerInput.click();
        await this.customerField.click();
    }

    async clickOnTheSubmitBtn() {
        await test.step('I click on submit button', async () => {
            await this.submitBtn.isVisible();
            await this.submitBtn.click();
        })
    }
}