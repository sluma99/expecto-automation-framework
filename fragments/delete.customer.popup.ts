import { Page, test } from "@playwright/test";

export class DeleteCustomerPopup {
    constructor(
        private readonly page: Page,
        private readonly yesBtn = page.locator(`div[class='styles_actions__zvPPS'] button:nth-child(2)`),
        private readonly cancelBtn = page.locator(`div[class='styles_actions__zvPPS'] button:nth-child(1)`),
    ) {}

    async clickOnTheYesBtn() {
        await test.step('I click on the Yes button in delete popup', async () => {
            await this.yesBtn.isVisible();
            await this.yesBtn.click();
        });
    }

    async clickOnTheCancelBtn() {
        await test.step('I click on the Cancel button in delete popup', async () => {
            await this.cancelBtn.isVisible();
            await this.cancelBtn.click();
        });
    }
}