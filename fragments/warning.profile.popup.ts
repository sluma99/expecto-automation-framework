import { Page, test } from "@playwright/test";

export class WarningProfilePopup {
    constructor(
        private readonly page: Page,

        private readonly deleteBtn = page.locator(`div[class='styles_card__TisXN styles_content__PhMx6 styles_content__zlmaI'] button:nth-child(2)`),
        private readonly cancelBtn = page.locator(`div[class='styles_card__TisXN styles_content__PhMx6 styles_content__zlmaI'] button:nth-child(1)`),
    ) {}

    async clickOnTheDeleteBtn() {
        await test.step('I click on the Delete button in delete popup', async () => {
            await this.deleteBtn.isVisible();
            await this.deleteBtn.click();
        });
    }

    async clickOnTheCancelBtn() {
        await test.step('I click on the Cancel button in delete popup', async () => {
            await this.cancelBtn.isVisible();
            await this.cancelBtn.click();
        });
    }
}