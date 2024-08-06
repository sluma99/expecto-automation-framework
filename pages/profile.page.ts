import { Page, test } from "@playwright/test";
import {AddProfilePopup} from "../fragments/add.profile.popup";
import {CustomerItem} from "../fragments/customer.item";
import {ListProfilesItem} from "../fragments/list.profiles.item";

type ProfileParams = {
    profileName: string | undefined
    systemName: string | undefined
    defaultApnInp: string | undefined
    downloadBitRateInp: string | undefined
    uploadBitRateInp: string | undefined
}

export class ProfilePage {
    constructor(
        public readonly page: Page,
        public readonly addProfilePopUp: AddProfilePopup,

        private readonly addBtn = page.locator(`button[class='styles_button__Q7PHZ styles_createButton__Bi43C']`),
        private readonly statusNtf = page.locator(`div[role='status']`),
        private readonly searchInp = page.locator(`input[placeholder='Search']`),
        private readonly tableItems = page.locator('tbody tr'),
        private readonly textNoData = page.locator('.styles_content__zlmaI h2'),
    ) {}

    async clickOnTheAddBtn(): Promise<void> {
        await test.step('I click on Add button', async () => {
            await this.addBtn.isVisible();
            await this.addBtn.click();
        });
    }

    async createProfile(params: ProfileParams): Promise<void> {
        await test.step('I create profile', async () => {
            await this.clickOnTheAddBtn();
            await this.addProfilePopUp.fillNameField(params.profileName)
            await this.addProfilePopUp.selectCustomer("xAuto")
            await this.addProfilePopUp.selectSystem(params.systemName);
            await this.addProfilePopUp.fillDefaultApnInp(params.defaultApnInp)
            await this.addProfilePopUp.fillDownloadBitRateInp(params.downloadBitRateInp)
            await this.addProfilePopUp.fillUploadBitRateInp(params.uploadBitRateInp)
            await this.addProfilePopUp.clickOnTheSubmitBtn()
        });
    }

    async checkSuccessfulMessage(text: string): Promise<string | null> {
        return await test.step('I check the successful message', async () => {
            await this.page.waitForTimeout(500)
            return await this.statusNtf.getByText(text).textContent();
        });
    }

    async getTextNoData() {
        return await test.step('I get text from the table', async () => {
            await this.page.waitForTimeout(500)
            return await this.textNoData.textContent();
        });
    }

    async searchProfile(profileName: string): Promise<void> {
        await test.step('I search profile', async () => {
            await this.searchInp.isVisible();
            await this.searchInp.fill(profileName);
        });
    }

    async getItemByIndex(index: number, tableItemText?: string) {
        await this.page.waitForTimeout(2000)
        if (tableItemText) await this.tableItems.nth(index).getByText(tableItemText).first().isVisible()

        return new ListProfilesItem(this.tableItems.nth(index))
    }
}