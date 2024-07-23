import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import {tr} from "@faker-js/faker";

dotenv.config({ path: './.env' });

const config = {
    testDir: './tests',
    timeout: 100 * 1000,
    expect: {
        timeout: 5000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : 1,
    reporter: [['html', { outputFolder: 'playwright-report' }]],
    headless: false,
    projects: [
        {
            name: 'plooto',
            testMatch: 'tests/**/*.ts',
            use: {
                navigationTimeout: 60 * 1000,
                actionTimeout: 60 * 1000,
                channel: 'chrome',
                headless: !!process.env.CI,
                trace: process.env.CI ? 'retain-on-failure' : 'retain-on-failure',
                screenshot: process.env.CI ? 'off' : 'on',
                video: process.env.CI ? 'off' : 'retain-on-failure',
                permissions: ['geolocation'],
                baseURL: process.env.APP_URL,
                viewport: { width: 1280, height: 720 },
            },
        },
    ],
    outputDir: 'test-results/',
};

export default config;
