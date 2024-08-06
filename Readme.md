# Playwright Automation Framework Onboarding Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Setup and Installation](#setup-and-installation)
4. [Writing Test Cases](#writing-test-cases)
5. [Fixtures](#fixtures)
6. [Running Tests](#running-tests)

---

## Introduction

This guide provides a comprehensive overview to help new team members get started quickly.

## Project Structure

Below is the structure of our Playwright project:

- **bars/**: This directory contains files related to different navigation bars used in the application. Each file includes the selectors and functions to interact with the navigation elements.

- **fixtures/**: This directory includes setup and teardown logic for the tests. The base fixture file provides common initialization tasks such as launching the browser and setting up the environment.

- **pages/**: This directory contains page object models (POMs) for different pages of the application. Each page object encapsulates the locators and functions for interacting with a specific page. For example, `login.page.ts` contains methods for interacting with the login page, and `account.page.ts` for the account page. The `popups` subdirectory includes page objects for various popup elements in the application.

- **tests/**: This directory contains the actual test files. Each file includes test cases for a specific functionality or module of the application. For example, `account.spec.ts` contains test cases for the delete account functionality.

- **.env**: This file contains environment variables used in the project. It is used to store sensitive data such as URLs, usernames, and passwords. Environment variables help in keeping the configuration data separate from the code.

## Setup and Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Install Playwright browsers:**

    ```bash
    npx playwright install
    ```

4. **Environment Variables:**

   Create a `.env` file at the root of the project and add your environment-specific variables:

    ```env
    APP_URL=""
    USER_EMAIL=""
    USER_PASSWORD=""
    ```

## Writing Test Cases

Test cases are written using Playwright's test runner. Below is an example test case for logging in with valid credentials.

### Example Test Case

```typescript
import { test } from '../fixtures/base.fixture';
import { expect } from '@playwright/test';

test.describe('Login feature tests', async () => {
    test.beforeEach(async ({ page, LoginPage }) => {
        await page.goto(process.env.APP_URL);
        await page.waitForLoadState('networkidle');
        await LoginPage.loginToXcontrol(process.env.USER_EMAIL, process.env.USER_PASSWORD);
    });

    test('Login with valid credentials', async ({ page, navigationBar, accountPage, addAccountPopup, deletePopup }) => {
        await navigationBar.clickOnTheAccountBtn();
        await accountPage.clickOnTheAddBtn();
        const email = await addAccountPopup.generateEmail();
        await addAccountPopup.selectCustomerInputField();
        await addAccountPopup.selectRoleInputField();
        await addAccountPopup.fillEmailInputField(email);
        await addAccountPopup.fillPasswordInputField('123456789Asdads@');
        await addAccountPopup.clickOnTheSubmitBtn();
        await accountPage.fillSearchField(email);
        await deletePopup.clickOnTheDeleteBtn();
        await deletePopup.clickOnTheYesBtn();
        const message = await accountPage.checkSuccessfulMessage();
        expect(message).toEqual('Account was added successfully!');
    });
});
```

## Page Objects
Page objects are used to encapsulate the UI interactions in a separate class. This makes the tests cleaner and easier to maintain.

```typescript
import { Page } from '@playwright/test';

class LoginPage {
    fields = {
        loginPage: {
            usernameInputSel: 'input[name="username"]',
            passwordInputSel: 'input[name="password"]',
            loginBtnSel: 'button[type="submit"]',
        },
    };
    
    constructor(private page: Page) {}

    async loginToXcontrol(email: string, password: string): Promise<void> {
        await this.page.fill(this.fields.loginPage.usernameInputSel, email);
        await this.page.fill(this.fields.loginPage.passwordInputSel, password);
        await this.page.click(this.fields.loginPage.loginBtnSel);
        await this.page.waitForURL('https://admin05.expeto.io/ngui/accounts');
    }
}

export { LoginPage };
```

## Fixtures
Fixtures in Playwright help to set up the testing environment and ensure consistency across test runs. Here's an example of how to define and use fixtures:

```typescript
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { NavigationBar } from '../bars/navigation.bar';
import { AccountPage } from '../pages/account.page';
import { AccountPopup } from '../pages/popups/add.account.popup';
import { DeleteAccountPopup } from '../pages/popups/delete.popup';

export const test = base.extend<{ loginPage: LoginPage, navigationBar: NavigationBar, accountPage: AccountPage, addAccountPopup: AccountPopup, deletePopup: DeleteAccountPopup }>({
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
        await use(new AccountPopup(page));
    },
    deletePopup: async ({ page }, use) => {
        await use(new DeleteAccountPopup(page));
    },
});
```

## Running Tests
To run the tests, use the following command:

```bash
npx playwright test
```

You can also run a specific test file:

```bash
npx playwright test ./tests/account.spec.ts
```


