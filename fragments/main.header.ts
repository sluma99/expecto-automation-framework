import { Page, test } from "@playwright/test";

export class MainHeader {

    constructor(
        private readonly page: Page,

        private readonly profileBtn = page.locator('.styles_main__Mqumq button:nth-child(2)'),
        private readonly logoutBtn = page.locator('.styles_logout__CDNML'),
    ) {}

    async logoutFromXcontrol() {
        await test.step('I make logout from system', async () => {
            await this.profileBtn.isVisible();
            await this.profileBtn.click();
            await this.logoutBtn.isVisible();
            await this.logoutBtn.click();
        });
    }
}