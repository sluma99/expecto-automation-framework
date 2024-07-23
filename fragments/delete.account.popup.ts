import { Page, test } from "@playwright/test";

export class DeleteAccountPopup {
    constructor(
        private readonly page: Page,

        private readonly deleteBtn = page.locator(`(//button[@type='button'])[12]`),
        private readonly yesBtn = page.locator(`//button[@data-color='danger']`)
    ) {}

    async clickOnTheDeleteBtn() {
        await test.step('I click on the Delete button in delete popup', async () => {
            await this.deleteBtn.isVisible();
            await this.deleteBtn.click();
        });
    }

    async clickOnTheYesBtn() {
        await test.step('I click on the Yes button in delete popup', async () => {
            await this.yesBtn.isVisible();
            await this.yesBtn.click();
        });
    }
}
