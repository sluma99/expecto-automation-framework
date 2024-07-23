import {Page, test} from '@playwright/test';

export class MessagePopup {

    constructor(
        private readonly page: Page,

        private readonly successMessageSel = page.locator(`div[role="status"]`),
    ) {}

    async getMessage() {
        await test.step('I get success message', async () => {
            return await this.successMessageSel.textContent()
        })
    }
}
