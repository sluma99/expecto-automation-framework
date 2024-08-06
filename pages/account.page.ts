import { Page, test } from "@playwright/test";
import {AccountItem} from "../fragments/account.item";
import {AccountHeaderAuditTable} from "../fragments/account.header.audit.table";
import {tr} from "@faker-js/faker";

export class AccountPage {
    constructor(
        public readonly page: Page,

        private readonly addBtn = page.locator(`button[class='styles_button__Q7PHZ styles_createButton__Bi43C']`),
        private readonly columnsAuditBtn = page.locator(`button[class='styles_button__Q7PHZ styles_columnVisibility___rjmK']:nth-of-type(1)`),
        private readonly columnsAccountBtn = page.locator(`button[class='styles_button__Q7PHZ styles_columnVisibility___rjmK']:nth-of-type(2)`),
        private readonly statusNtf = page.locator(`div[role='status']`),
        private readonly searchInp = page.getByPlaceholder('Search', {exact: true}),
        private readonly tableItems = page.locator('tbody tr'),
        private readonly checkBoxSel = page.locator(`div[role='menuitemcheckbox']`),
        private readonly headerAuditItem = page.locator(`#audit thead th`),
        private readonly headerAccountItem = page.locator(`#list-of-accounts thead th`),
        private readonly tilesBtn = page.locator(`.styles_header__qllt7 button`),
        private readonly resetTilesBtn = page.getByText(`Reset Tiles`, {exact: true}),
        private readonly nameTableSel = page.locator(`h2:nth-of-type(1)`),
    ) {}

    async clickOnTheAddBtn(): Promise<void> {
        await test.step('I click on Add button', async () => {
            await this.addBtn.isVisible();
            await this.addBtn.click();
        });
    }


    async clickOnTheResetTilesBtn(): Promise<void> {
        await test.step('I click on Reset Tiles button', async () => {
            await this.resetTilesBtn.isVisible();
            await this.resetTilesBtn.click({force: true});
        });
    }

    async clickOnTheTilesBtn(): Promise<void> {
        await test.step('I click on Tiles button', async () => {
            await this.tilesBtn.isVisible();
            await this.tilesBtn.click({force: true});
        });
    }

    async selectTiles(text: string): Promise<void> {
        await test.step('I select tiles', async () => {
            await this.page.waitForTimeout(1000)
            await this.clickOnTheTilesBtn()
            await this.selectCheckbox(text)
            await this.clickOnTheTilesBtn()
        });
    }

    async clickOnTheColumnsAuditBtn(): Promise<void> {
        await test.step('I click on Columns button in the audit log table', async () => {
            await this.columnsAuditBtn.isVisible();
            await this.columnsAuditBtn.click();
        });
    }

    async clickOnTheColumnsAccountBtn(): Promise<void> {
        await test.step('I click on Columns button in the account table', async () => {
            await this.columnsAccountBtn.isVisible();
            await this.columnsAccountBtn.click();
        });
    }

    async fillSearchField(text: string): Promise<void> {
        await test.step('I fill the search field', async () => {
            await this.page.waitForTimeout(1000)
            await this.searchInp.isVisible()
            await this.searchInp.click({force: true});
            await this.searchInp.fill(text)
        });
    }

    async checkSuccessfulMessage(text: string): Promise<string | null> {
        return await test.step('I check the successful message', async () => {
            await this.page.waitForTimeout(500)
            return await this.statusNtf.getByText(text).textContent();
        });
    }

    async getItemByIndex(index: number, tableItemText?: string) {
        await this.page.waitForTimeout(3000)
        if (tableItemText) await this.tableItems.nth(index).getByText(tableItemText).first().isVisible()

        return new AccountItem(this.tableItems.nth(index))
    }

    async selectCheckbox(text: string) {
        await test.step('I select checkbox', async () => {
            await this.checkBoxSel.getByText(text, {exact: true}).isVisible()
            await this.checkBoxSel.getByText(text, {exact: true}).click()
        })
    }

    async getItemHeaderAuditByText(text: string) {
        return await this.headerAuditItem.getByText(text).textContent()
    }

    async getItemHeaderAccountByText(text: string) {
        const element = this.headerAccountItem.getByText(text).first();
        const content = await element.textContent()
        return content?.trim();
    }

    async getNameOfTheTable(tableItemText: string) {
        return await this.nameTableSel.getByText(tableItemText).textContent()
    }
}