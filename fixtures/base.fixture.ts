import { Page, test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { NavigationBar } from "../fragments/navigation.bar";
import { AccountPage } from "../pages/account.page";
import { AccountPopup } from "../fragments/account.popup";
import { DeleteAccountPopup } from "../fragments/delete.account.popup";
import { CustomerPage } from "../pages/customer.page";
import { AddCustomer } from "../fragments/add.customer";
import { EditCustomerPopup } from "../fragments/edit.customer.popup";
import { MainHeader } from "../fragments/main.header";
import { ProfilePage } from "../pages/profile.page";
import { AddProfilePopup } from "../fragments/add.profile.popup";
import {WarningProfilePopup} from "../fragments/warning.profile.popup";

type BaseFixture = {
    loginPage: LoginPage,
    navigationBar: NavigationBar,
    accountPage: AccountPage,
    accountPopup: AccountPopup,
    deletePopup: DeleteAccountPopup,
    customerPage: CustomerPage,
    addCustomer: AddCustomer,
    editCustomerPopup: EditCustomerPopup,
    mainHeader: MainHeader,
    profilePage: ProfilePage,
    addProfilePopup: AddProfilePopup,
    warningProfilePopup: WarningProfilePopup,
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

    accountPopup: async ({ page }, use) => {
        await use(new AccountPopup(page));
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

    mainHeader: async ({ page }, use) => {
        await use(new MainHeader(page));
    },

    addProfilePopup: async ({ page }, use) => {
        await use(new AddProfilePopup(page));
    },

    profilePage: async ({ page, addProfilePopup }, use) => {
        await use(new ProfilePage(page, addProfilePopup));
    },

    warningProfilePopup: async ({ page }, use) => {
        await use(new WarningProfilePopup(page));
    },
});