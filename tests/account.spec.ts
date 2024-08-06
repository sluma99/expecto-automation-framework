// import { test } from '../fixtures/base.fixture'
// import {expect} from "playwright/test";
// import {accountData} from "../factories/account.factory";
//
// const accounts = [
//     { role: process.env.ROLE_ADMIN, password: process.env.USER_PASSWORD },
//     { role: process.env.ROLE_ADMIN_ALAINA, password: process.env.USER_PASSWORD },
//     { role: process.env.ROLE_ADMIN_ANTHONY, password: process.env.USER_PASSWORD },
// ];
//
// const columnsAudit = [
//     { firstColumn: 'IP Origin', secondColumn: 'Email Address'},
//     { firstColumn: 'First Attempt', secondColumn: 'Email Address'},
//     { firstColumn: 'Last Attempt', secondColumn: 'Email Address'},
// ];
//
// test.describe("Account", async () => {
//     const data = accountData.build();
//
//     test.beforeEach(async ({page, loginPage, navigationBar, accountPage, accountPopup, deletePopup}, testInfo) => {
//         const workerIndex = testInfo.workerIndex % accounts.length;
//         let currentAccount = accounts[workerIndex];
//
//         await page.goto(process.env.APP_URL as string)
//         await loginPage.loginToXcontrol(currentAccount.role as string, currentAccount.password as string);
//         await navigationBar.clickOnTheAccountBtn()
//
//         await accountPage.clickOnTheAddBtn()
//         await accountPopup.selectCustomerInputField()
//         await accountPopup.selectRoleInputField()
//         await accountPopup.fillEmailInputField(data.email)
//         await accountPopup.fillPasswordInputField(data.password)
//         await accountPopup.clickOnTheSubmitBtn()
//     })
//
//     test.afterEach(async ({page}) => {
//         await page.close()
//     })
//
//     test('C254 - Edit Account', {tag: 'safe'}, async ({accountPage,accountPopup}) => {
//         await accountPage.fillSearchField(data.email)
//         const items = await accountPage.getItemByIndex(0)
//         await items.editBtn.click()
//         await accountPopup.fillEmailInputField(data.exampleEmail)
//         await accountPopup.clickOnTheSubmitBtn()
//         await accountPopup.clickOnTheSubmitBtn()
//
//         const message = await accountPage.checkSuccessfulMessage("Account was updated")
//         test.expect(message).toEqual("Account was updated successfully!")
//     })
//
//     test('C253 - Delete Account',async ({accountPage, deletePopup}) => {
//         await accountPage.fillSearchField(data.email)
//         const items = await accountPage.getItemByIndex(0)
//         await items.deleteBtn.click()
//         await deletePopup.clickOnTheYesBtn()
//         const message = await accountPage.checkSuccessfulMessage("Account was deleted")
//
//         test.expect(message).toEqual("Account was deleted successfully!")
//     })
//
//     test("C252 - Create new Account with GUI", async ({accountPage}) => {
//         const message = await accountPage.checkSuccessfulMessage("Account was added")
//         expect(message).toEqual('Account was added successfully!')
//     })
//
//     test('C255 - Search Account', async ({accountPage}) => {
//         await accountPage.fillSearchField(data.email)
//         const items = await accountPage.getItemByIndex(0)
//         const emailItem = await items.getData()
//
//
//         test.expect(emailItem.email).toEqual(data.email)
//     })
//
//     columnsAudit.forEach(({firstColumn, secondColumn}) => {
//         test(`Filter Columns by ${firstColumn} and ${secondColumn}`, async ({accountPage}) => {
//             await accountPage.clickOnTheColumnsAuditBtn();
//             await accountPage.selectCheckbox("Select All");
//             await accountPage.selectCheckbox(firstColumn);
//             const headerFirst = await accountPage.getItemHeaderAuditByText(firstColumn);
//             const headerSecond = await accountPage.getItemHeaderAuditByText(secondColumn);
//
//             expect(headerFirst).toEqual(firstColumn);
//             expect(headerSecond).toEqual(secondColumn);
//         });
//     })
//
//     test('C267 - Verify "Reset Tiles" Button Functionality', async ({accountPage}) => {
//         await accountPage.selectTiles("Select All")
//         await accountPage.clickOnTheResetTilesBtn()
//
//         const nameTable = await accountPage.getNameOfTheTable("List of Accounts")
//         test.expect(nameTable).toEqual("List of Accounts")
//     })
//
//     test('C264 - None selected in the table columns', async ({accountPage}) => {
//         await accountPage.clickOnTheColumnsAccountBtn()
//         await accountPage.selectCheckbox("Select All")
//
//         const header = await accountPage.getItemHeaderAccountByText("Email Address");
//         test.expect(header).toEqual("Email Address");
//     })
//
//     test('C263 - Display default columns', async ({accountPage}) => {
//         const headerEmail = await accountPage.getItemHeaderAccountByText("Email Address");
//         const headerCustomer = await accountPage.getItemHeaderAccountByText("Customer");
//         const headerRole = await accountPage.getItemHeaderAccountByText("Role");
//
//         test.expect(headerEmail).toEqual("Email Address");
//         test.expect(headerCustomer).toEqual("Customer");
//         test.expect(headerRole).toEqual("Role");
//     })
//
//     test('C259 - Display Only List of Accounts Tile', async ({accountPage}) => {
//         await accountPage.selectTiles("Audit")
//
//         const nameTable = await accountPage.getNameOfTheTable("List of Accounts")
//         test.expect(nameTable).toEqual("List of Accounts")
//     })
//
//     test('C260 - Display Only Audit Tile', async ({accountPage}) => {
//         await accountPage.selectTiles("List of Accounts")
//
//         const nameTable = await accountPage.getNameOfTheTable("Audit")
//         test.expect(nameTable).toEqual("Audit")
//     })
// })