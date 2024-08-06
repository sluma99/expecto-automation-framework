// import { test } from '../fixtures/base.fixture'
// import {expect} from "playwright/test";
// import {accountData} from "../factories/account.factory";
//
// test.describe("Login", async () => {
//
//     test('Login to xControl', async ({page,loginPage}) => {
//         await page.goto(process.env.APP_URL as string);
//         await loginPage.loginToXcontrol(process.env.ROLE_ADMIN as string, process.env.USER_PASSWORD as string);
//     })
//
//     test('C400 - Logout', async ({page,loginPage, mainHeader, customerPage}) => {
//         await page.goto(process.env.APP_URL as string);
//         await loginPage.loginToXcontrol(process.env.ROLE_ADMIN as string, process.env.USER_PASSWORD as string);
//         await mainHeader.logoutFromXcontrol()
//
//         await customerPage.delay(3000)
//
//         test.expect(page.url()).toEqual(process.env.APP_URL as string);
//     })
// })