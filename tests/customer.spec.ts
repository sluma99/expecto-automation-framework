import { test } from '../fixtures/base.fixture'
import {customerName} from "../factories/customer.factory";
import {Page} from "@playwright/test";

const loginAndNavigate = async ({ loginPage, navigationBar }: { page: Page, loginPage: any, navigationBar: any }, role: string) => {
    await loginPage.loginToXcontrol(process.env[role] as string, process.env.USER_PASSWORD as string);
    await navigationBar.clickOnTheCustomerBtn();
};

const roleMap: { [key: string]: string } = {
    'Customer-Admin': 'ROLE_CUSTOMER_ADMIN',
    'Admin': 'ROLE_ADMIN',
};

const getRoleFromTestTitle = (title: string): string => {
    const match = title.match(/Customer-Admin|Admin/)?.[0];
    return roleMap[match || 'Admin'];
}

const roles = ['Customer-Admin','ROLE_ADMIN']


test.describe("Customer", () => {

    test.beforeEach(async ({ page, loginPage, navigationBar }, { title }) => {
        await page.goto(process.env.APP_URL as string);
        // await page.waitForLoadState('networkidle');
        const role = getRoleFromTestTitle(title);
        await loginAndNavigate({ page, loginPage, navigationBar }, role);
        await navigationBar.clickOnTheCustomerBtn();
    });

    test.afterEach(async ({ page, loginPage, navigationBar }, { title }) => {
        await page.close();
    });


    roles.forEach(role => {
        test(`Create new Customer as ${role}`, async ({ page,customerPage }) => {
            const data = customerName.build();
            const nameCustomer = data.name;

            await customerPage.clickOnTheAddBtn();
            await customerPage.createCustomer({
                customerNames: nameCustomer
            }, 'xAuto');
            await customerPage.clickOnToggleItem();

            const customerExists = await customerPage.isCustomerNameExists(nameCustomer);
            test.expect(customerExists).toBe(true);
        });
    });

    // roles.forEach(role => {
    //     test(`Delete existing customer as ${role}`, async ({customerPage, page}) => {
    //         const data = customerName.build()
    //         const nameCustomer = data.name;
    //
    //         await customerPage.clickOnTheAddBtn();
    //         await customerPage.createCustomer({customerNames: nameCustomer}, 'xAuto');
    //         await customerPage.clickOnToggleItem();
    //         await page.waitForTimeout(3000)
    //         await customerPage.deleteCustomer(nameCustomer);
    //
    //         const customerExists = await customerPage.doesCustomerExist(nameCustomer);
    //         test.expect(customerExists).toBe(false);
    //     });
    // })
    //
    // roles.forEach(role => {
    //     test(`Edit customer as ${role}`, async ({customerPage, editCustomerPopup}) => {
    //         const data = customerName.build();
    //         const nameCustomer = data.name;
    //
    //         await customerPage.clickOnToggleItem();
    //         const item = await customerPage.getItemByIndex(1);
    //         await item.editBtn.click();
    //         await editCustomerPopup.editCustomerName(nameCustomer);
    //         await editCustomerPopup.clickOnSaveBtn();
    //
    //         const customerExists = await customerPage.doesCustomerExist(nameCustomer);
    //         test.expect(customerExists).toBe(true);
    //     });
    // })
    //
    // test("C- 211 Delete and Edit existing customer as Read-Only", async ({ customerPage, editCustomerPopup }) => {
    //     const item = await customerPage.getItemByIndex(0);
    //     await test.expect(item.deleteBtn).not.toBeVisible();
    //     await test.expect(item.editBtn).not.toBeVisible();
    // });
})