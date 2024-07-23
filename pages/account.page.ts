import { Page, test } from "@playwright/test";

export class AccountPage {

    constructor(
        private readonly page: Page,

        private readonly addBtn = page.locator(`button[class='styles_button__Q7PHZ styles_createButton__Bi43C']`),
        private readonly searchField = page.locator(`//fieldset[@class='styles_fieldset__Hcc1_ styles_search__caXo4']/input`),
        private readonly statusNtf = page.locator(`div[role='status']`),
    ) {}

    async clickOnTheAddBtn(): Promise<void> {
        await test.step('I click on Add button', async () => {
            await this.addBtn.click();
        });
    }

    async fillSearchField(text: string): Promise<void> {
        await test.step('I fill the search field', async () => {
            await this.searchField.click();
            await this.searchField.fill(text);
            await this.page.keyboard.press('Enter');
        });
    }

    async checkSuccessfulMessage(): Promise<string | null> {
        return await test.step('I check the successful message', async () => {
            return await this.statusNtf.textContent();
        });
    }
}