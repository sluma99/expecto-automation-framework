import { Locator } from "@playwright/test";

export class ListProfilesItem {
    constructor(
        public readonly element: Locator,

        public readonly name = element.locator(`td:nth-child(1)`),
        public readonly customer = element.locator('td:nth-child(2)'),
        public readonly system = element.locator('td:nth-child(3)'),
        public readonly editBtn = element.locator('td:nth-child(4) button:nth-child(1)'),
        public readonly deleteBtn = element.locator('td:nth-child(4) button:nth-child(2)'),
    ) {}

    async getData() {
        return {
            name: await this.name.textContent(),
            customer: await this.customer.textContent(),
            system: await this.system.textContent(),
        };
    }

    async click() {
        await this.element.click();
    }
}
