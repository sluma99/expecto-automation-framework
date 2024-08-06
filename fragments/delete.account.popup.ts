import { Page, test } from "@playwright/test";

export class DeleteAccountPopup {
    constructor(
        private readonly page: Page,

        private readonly noBtn = page.locator(`.styles_actions__zvPPS button:nth-child(1)`),
        private readonly yesBtn = page.locator(`.styles_actions__zvPPS button:nth-child(2)`)
    ) {}

    async clickOnTheYesBtn() {
        await test.step('I click on the Yes button in delete popup', async () => {
            await this.yesBtn.isVisible();
            await this.yesBtn.click();
        });
    }

    async clickOnTheNoBtn() {
        await test.step('I click on the No button in delete popup', async () => {
            await this.noBtn.isVisible();
            await this.noBtn.click();
        });
    }
}
