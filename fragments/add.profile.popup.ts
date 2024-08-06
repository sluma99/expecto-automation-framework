import { Page, test } from "@playwright/test";
import {customerName} from "../factories/customer.factory";
import {tr} from "@faker-js/faker";

export class AddProfilePopup {
    constructor(
        private readonly page: Page,
        private readonly nameInp = page.locator(`input[name='name']`),
        private readonly toggleCustomerBtn = page.locator(`fieldset[name='customer'] input[class='react-select__input']`),
        private readonly toggleSystemBtn = page.locator(`fieldset[name='system'] input[class='react-select__input']`),
        private readonly customerItem = page.locator(`#react-select-2-listbox`),
        private readonly systemItem = page.locator(`#react-select-3-listbox div`),
        private readonly defaultApnInp = page.locator(`input[name='defaultApn']`),
        private readonly uploadBitRateInp = page.locator(`input[name='uploadBitRate']`),
        private readonly downloadBitRateInp = page.locator(`input[name='downloadBitRate']`),
        private readonly submitBtn = page.locator(`.styles_actions__pgyTb button:nth-child(2)`),
    ) {}

    async fillNameField(text: string) {
        await test.step(`I fill name field`, async () => {
            await this.nameInp.isVisible();
            await this.nameInp.fill(text);
        });
    }

    async fillDefaultApnInp(apn: string) {
        await test.step('I fill default apn inp field', async () => {
            await this.defaultApnInp.isVisible();
            await this.defaultApnInp.fill(apn);
        });
    }

    async fillUploadBitRateInp(number: string) {
        await test.step('I fill upload bit rate field', async () => {
            await this.uploadBitRateInp.isVisible();
            await this.uploadBitRateInp.fill(number);
        });
    }

    async fillDownloadBitRateInp(number: string) {
        await test.step('I fill download bit rate field', async () => {
            await this.downloadBitRateInp.isVisible();
            await this.downloadBitRateInp.fill(number);
        });
    }

    async clickOnTheSubmitBtn() {
        await test.step('I click on the submit button', async () => {
            await this.submitBtn.isVisible();
            await this.submitBtn.click();
        });
    }

    async selectCustomer(customer: string) {
        await test.step('I select customer', async () => {
            await this.toggleCustomerBtn.isVisible();
            await this.toggleCustomerBtn.fill(customer);
            await this.customerItem.getByText(customer, {exact: true}).click()
        });
    }

    async selectSystem(system: string) {
        await test.step('I select customer', async () => {
            await this.toggleSystemBtn.isVisible();
            await this.toggleSystemBtn.fill(system);
            await this.systemItem.getByText(system, {exact: true}).click()
        });
    }
}