import {Page, test} from "@playwright/test";

export class NavigationBar {

    constructor(
        private readonly page: Page,

        private readonly customerBtn = page.getByRole('link', {name: `Customers`, exact: true}),
        private readonly accountBtn = page.getByRole('link', {name: `Accounts`, exact: true}),
    ) {}

    async clickOnTheCustomerBtn() {
        await test.step('I click in nav on sites button', async () => {
            await this.customerBtn.isVisible()
            await this.customerBtn.click({force: true})
        })
    }

    async clickOnTheAccountBtn() {
        await test.step('I click in nav on settings button', async () => {
            await this.accountBtn.isVisible()
            await this.accountBtn.click()
        })
    }
}