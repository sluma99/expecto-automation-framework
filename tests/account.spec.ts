// import { test } from '../fixtures/base.fixture'
// import {expect} from "playwright/test";
// import {base, faker} from "@faker-js/faker";
//
// test.describe("Account", async () => {
//
//     test.beforeEach(async ({page, loginPage}) => {
//         await page.goto(process.env.APP_URL as string)
//         await page.waitForLoadState('networkidle')
//         await loginPage.loginToXcontrol(process.env.ROLE_ADMIN as string, process.env.USER_PASSWORD as string);
//     })
//
//     test("C6 - Create new Account with GUI", async ({navigationBar, accountPage, addAccountPopup, deletePopup}) => {
//         await navigationBar.clickOnTheAccountBtn()
//         await accountPage.clickOnTheAddBtn()
//         await addAccountPopup.selectCustomerInputField()
//         await addAccountPopup.selectRoleInputField()
//         await addAccountPopup.fillEmailInputField(email)
//         await addAccountPopup.fillPasswordInputField(faker.internet.password() + "@2")
//         await addAccountPopup.clickOnTheSubmitBtn()
//         const message = await accountPage.checkSuccessfulMessage()
//         expect(message).toEqual('Account was added successfully!')
//         await accountPage.fillSearchField(email)
//         await deletePopup.clickOnTheDeleteBtn()
//         await deletePopup.clickOnTheYesBtn()
//     })
// })