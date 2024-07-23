import {Page, test as base} from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { NavigationBar } from "../fragments/navigation.bar";
import { AccountPage } from "../pages/account.page";
import { AddAccountPopup } from "../fragments/add.account.popup";
import {DeleteAccountPopup} from "../fragments/delete.account.popup";
import {CustomerPage} from "../pages/customer.page";
import {AddCustomer} from "../fragments/add.customer";
import {EditCustomerPopup} from "../fragments/edit.customer.popup";

type BaseFixture = {
    loginPage: LoginPage,
    navigationBar: NavigationBar,
    accountPage: AccountPage,
    addAccountPopup: AddAccountPopup,
    deletePopup: DeleteAccountPopup,
    customerPage: CustomerPage,
    addCustomer: AddCustomer
    editCustomerPopup: EditCustomerPopup
    loginToXcontrol: string
}

export const test = base.extend<BaseFixture>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    navigationBar: async ({ page }, use) => {
        await use(new NavigationBar(page));
    },

    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },

    addAccountPopup: async ({ page }, use) => {
        await use(new AddAccountPopup(page));
    },

    deletePopup: async ({ page }, use) => {
        await use(new DeleteAccountPopup(page));
    },

    customerPage: async ({ page }, use) => {
        await use(new CustomerPage(page));
    },

    addCustomer: async ({ page }, use) => {
        await use(new AddCustomer(page));
    },

    editCustomerPopup: async ({ page }, use) => {
        await use(new EditCustomerPopup(page));
    },

    loginToXcontrol: [async({page, loginPage, navigationBar}, use, testInfo) => {
        await page.goto(process.env.APP_URL as string);
        await page.waitForLoadState('networkidle');
        const role = getRoleFromTestTitle(testInfo.title);
        await loginAndNavigate({ page, loginPage, navigationBar }, role);
        await navigationBar.clickOnTheCustomerBtn();
        await use('')
    }, {auto: true}]
});

const getRoleFromTestTitle = (title: string): string => {
    const match = title.match(/Customer-Admin|Admin|Read-Only/)?.[0];
    return roleMap[match || 'Admin'];
}

const roleMap: { [key: string]: string } = {
    'Customer-Admin': 'ROLE_CUSTOMER_ADMIN',
    'Admin': 'ROLE_ADMIN',
    'Read-Only': 'ROLE_READ_ONLY'
};

const loginAndNavigate = async ({ loginPage, navigationBar }: { page: Page, loginPage: any, navigationBar: any }, role: string) => {
    await loginPage.loginToXcontrol(process.env[role] as string, process.env.USER_PASSWORD as string);
    await navigationBar.clickOnTheCustomerBtn();
};