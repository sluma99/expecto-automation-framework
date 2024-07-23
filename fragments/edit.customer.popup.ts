import { Page, test } from "@playwright/test";

export class EditCustomerPopup {
    constructor(
        private readonly page: Page,
        private readonly nameInp = page.getByPlaceholder('Name', {exact: true}),
        private readonly saveBtn = page.locator(`button[type='submit']`)
    ) {}

    async editCustomerName(name: string) {
        await test.step('I edit customer name', async () => {
            await this.nameInp.isVisible()
            await this.nameInp.pressSequentially(name)
        });
    }

    async clickOnSaveBtn() {
        await test.step('I click on Save button', async () => {
            await this.saveBtn.isVisible()
            await this.saveBtn.click()
        });
    }
}