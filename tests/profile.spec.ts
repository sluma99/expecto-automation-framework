// import { test } from '../fixtures/base.fixture'
// import {customerName} from "../factories/customer.factory";
// import {profile} from "../factories/profile.factory";
//
// test.describe("Profile", async () => {
//     const data = customerName.build();
//     const dataProfile = profile.build();
//
//     test.beforeEach(async ({page, loginPage, navigationBar, profilePage}) => {
//         await page.goto(process.env.APP_URL as string)
//         await loginPage.loginToXcontrol(process.env.ROLE_ADMIN as string, process.env.USER_PASSWORD as string);
//         await navigationBar.clickOnTheProfilesBtn()
//         await profilePage.createProfile({
//             profileName: data.name,
//             systemName: dataProfile.systemName,
//             defaultApnInp: dataProfile.apnInp,
//             uploadBitRateInp: dataProfile.bitRate,
//             downloadBitRateInp: dataProfile.bitRate,
//         })
//     })
//
//     test.afterEach(async ({page}) => {
//         await page.close()
//     })
//
//     test('C300 - Create New Profile', async ({profilePage}) => {
//         await profilePage.checkSuccessfulMessage("Profile was added successfully!")
//     })
//
//     test('C304 - Search profile', async ({profilePage}) => {
//         await profilePage.searchProfile(data.name)
//         const items = await profilePage.getItemByIndex(0)
//         const nameItem = await items.getData()
//
//         test.expect(nameItem.name).toEqual(data.name)
//     })
//
//     test('C303 - Delete profile', async ({profilePage, warningProfilePopup}) => {
//         await profilePage.searchProfile(data.name)
//         const items = await profilePage.getItemByIndex(0)
//         const nameItem = await items.deleteBtn.click()
//         await warningProfilePopup.clickOnTheDeleteBtn()
//
//         const text = await profilePage.getTextNoData()
//
//         test.expect(text).toEqual("No data to show.")
//     })
// })