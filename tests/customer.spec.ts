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

const roles = ['ROLE_ADMIN']


test.describe("Customer New", () => {

    test.beforeEach(async ({ page, loginPage, navigationBar }, { title }) => {
        // await page.goto(process.env.APP_URL as string);
        // // const role = getRoleFromTestTitle(title);
        // // await loginAndNavigate({ page, loginPage, navigationBar }, role);
        // await page.goto(process.env.APP_URL as string);
        // await loginPage.loginToXcontrol(process.env.ROLE_ADMIN as string, process.env.USER_PASSWORD as string);
        // await navigationBar.clickOnTheCustomerBtn();
    });

    test.afterEach(async ({ page }, { title }) => {
        await page.close();
    });

    for (let i = 0; i < 100; i++) {
        test(`Delete
        all rows from a table - iteration
        ${i + 1}`, async ({page, customerPage, navigationBar, loginPage}) => {
            await page.goto(process.env.APP_URL as string);
            // const role = getRoleFromTestTitle(title);
            // await loginAndNavigate({ page, loginPage, navigationBar }, role);
            await page.goto(process.env.APP_URL as string);
            await loginPage.loginToXcontrol(process.env.ROLE_ADMIN as string, process.env.USER_PASSWORD as string);
            await navigationBar.clickOnTheCustomerBtn();
            await customerPage.clickOnToggleItem();

            const table = await customerPage.getItemByIndex(1);
            await table.customer.click();
            await page.waitForTimeout(2000)
            const deleteBtn = page.locator('.styles_actions__LolfM button').getByText('Delete', {exact: true})
            await deleteBtn.click()
            const deleteBtn2 =  page.locator('.styles_actions__zvPPS button').getByText('Delete', {exact: true})
            await deleteBtn2.click({force: true});
            await page.waitForTimeout(2000)
        });
    }
})

    // roles.forEach(role => {
    //     test.only(`Create new Customer as ${role}`, async ({ page,customerPage }) => {
    //         const data = customerName.build();
    //         const nameCustomer = data.name;
    //
    //         await customerPage.clickOnTheAddBtn();
    //         await customerPage.createCustomer({
    //             customerNames: nameCustomer
    //         }, 'xAuto');
    //         await page.reload()
    //         await customerPage.clickOnToggleItem();
    //
    //         const customerItem = await customerPage.getRowByText(nameCustomer);
    //         const customerText = await customerItem.element.textContent();
    //         test.expect(customerText).toContain(nameCustomer);
    //     });
    // });

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
// })