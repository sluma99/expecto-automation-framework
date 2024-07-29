import { Page, test} from '@playwright/test'
import { AddCustomer } from "../fragments/add.customer";
import {CustomerItem} from "../fragments/customer.item";
import {DeleteCustomerPopup} from "../fragments/delete.customer.popup";

export class CustomerPage {
    constructor(
        private readonly page: Page,

        private readonly addCustomer: AddCustomer = new AddCustomer(page),
        private readonly deleteCustomerPopUp: DeleteCustomerPopup = new DeleteCustomerPopup(page),
        private readonly addBtn = page.locator(`div[class='header styles_header__4OpzI'] button:nth-child(1)`),
        private readonly customerItems = page.locator('tbody tr'),
    ) {
    }

    async getItemByIndex(index: number, customer?: string) {
        await this.page.waitForTimeout(2000)
        if (customer) await this.customerItems.nth(index).getByText(customer).first().isVisible()

        return new CustomerItem(this.customerItems.nth(index))
    }

    async getItems() {
        await this.page.waitForTimeout(2000);
        return [...await this.customerItems.all()]
            .map(it => new CustomerItem(it))
    }

    async getRowByText(text: string): Promise<CustomerItem | null> {
        await this.delay(15000)
        const rows = this.customerItems;

        for (let i = 0; i < await rows.count(); i++) {
            const row = rows.nth(i);
            await row.scrollIntoViewIfNeeded();
            const rowText = await row.textContent();

            if (rowText && rowText.includes(text)) {
                return new CustomerItem(row);
            }
        }

        return null;
    }

    async isCustomerNameExists(name: string): Promise<boolean> {
        await this.delay(15000)
        const customerRow = await this.getRowByText(name);
        return customerRow !== null;
    }

    async clickOnTheAddBtn() {
        return await test.step('I click on Add button', async () => {
            await this.addBtn.isVisible()
            await this.addBtn.click()
        })
    }

    async createCustomer({customerNames: customerName}, parent: string) {
        return await test.step('I create customer', async () => {
            await this.addCustomer.fillNameField(customerName)
            await this.addCustomer.selectParentField(parent)
            await this.addCustomer.clickOnTheSubmitBtn()
        })
    }

    async clickOnToggleItem() {
        return await test.step('I click on Toggle button', async () => {
            const item = await this.getItemByIndex(0)
            await item.expandToogleBtn.isVisible()
            await item.expandToogleBtn.click()
        })
    }

    async deleteCustomer(customer: string) {
        return await test.step('I click on Delete button', async () => {
            const customerItem = await this.getRowByText(customer);
            if(customerItem){
                await customerItem.deleteBtn.isVisible()
                await customerItem.deleteBtn.click()
            }

            await this.deleteCustomerPopUp.clickOnTheYesBtn()
        })
    }

    async getCustomerNames() {
        await this.delay(10000)
        const customerItems = await this.getItems();

        return Promise.all(customerItems.map(item => item.getData().then(data => data.customer)));
    }

    async doesCustomerExist(customerName: string) {
        await this.delay(10000)
        const customerNames = await this.getCustomerNames();
        return customerNames.includes(customerName);
    }

    async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
