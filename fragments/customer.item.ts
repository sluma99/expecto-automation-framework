import {Locator} from "@playwright/test";

export class CustomerItem {

    constructor(
        public readonly element: Locator,

        public readonly customer = element.locator(`td:nth-child(1)`),
        public readonly sites = element.locator('td:nth-child(2)'),
        public readonly systems = element.locator('td:nth-child(3)'),
        public readonly mobileAssets = element.locator('td:nth-child(4)'),
        public readonly editBtn = element.locator('td:nth-child(5) button:nth-child(1)'),
        public readonly deleteBtn = element.locator('td:nth-child(5) button:nth-child(2)'),
        public readonly expandToogleBtn = element.locator('button[class="styles_button__Q7PHZ styles_expandToggler__Jd0Pa"]'),
    ) {}

    async getData() {
        return {
            customer: await this.customer.textContent(),
            sites: await this.sites.textContent(),
            systems: await this.systems.textContent(),
            mobileAssets: await this.mobileAssets.textContent(),
        };
    }

    async click() {
        await this.element.click()
    }
}
