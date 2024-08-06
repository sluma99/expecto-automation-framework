import { Locator } from "@playwright/test";

export class AccountItem {
    constructor(
        public readonly element: Locator,

        public readonly email = element.locator(`td:nth-child(1)`),
        public readonly customer = element.locator('td:nth-child(2)'),
        public readonly role = element.locator('td:nth-child(3)'),
        public readonly editBtn = element.locator('td:nth-child(4) button:nth-child(1)'),
        public readonly deleteBtn = element.locator('td:nth-child(4) button:nth-child(2)'),
    ) {}

    async getData() {
        return {
            email: await this.email.textContent(),
            customer: await this.customer.textContent(),
            role: await this.role.textContent(),
        };
    }

    async click() {
        await this.element.click();
    }
}
