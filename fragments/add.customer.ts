import { Page, test } from "@playwright/test";

export class AddCustomer {

    constructor(
        private readonly page: Page,

        private readonly nameInp = page.getByPlaceholder('Name', { exact: true }),
        private readonly parentInp = page.locator(`//input[@class='react-select__input']`),
        private readonly submitBtn = page.locator(`button[type='submit']`),
        private readonly operatorSel = page.locator(`div[class='react-select__menu-list css-no1ryp'] div span`),
) {}

    async fillNameField(name: string) {
        await test.step('I fill the Name field', async () => {
            await this.nameInp.fill(name);
        });
    }

    async selectParentField(text: string) {
        await test.step('I select the Parent field', async () => {
            await this.parentInp.click();
            await this.page.waitForTimeout(2000);
            await this.operatorSel.getByText(text).first().click({ force: true });
        });
    }

    async clickOnTheSubmitBtn() {
        await test.step('I click on the Submit button', async () => {
            await this.submitBtn.click();
        });
    }

    async editName(text: string) {
        await test.step('I edit the Name field', async () => {
            await this.page.waitForTimeout(2000)
            await this.nameInp.clear();
            await this.nameInp.fill(text);
            await this.clickOnTheSubmitBtn();
        });
    }
}