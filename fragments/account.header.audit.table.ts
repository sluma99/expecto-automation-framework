import { Locator } from "@playwright/test";

export class AccountHeaderAuditTable {
    constructor(
        public readonly element: Locator,

        public readonly email = element.locator(`th:nth-child(1)`),
        public readonly customer = element.locator('th:nth-child(2)'),
        public readonly role = element.locator('td:nth-child(3)'),
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
