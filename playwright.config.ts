import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 100 * 1000,  // Global timeout for all tests
    fullyParallel: true,
    forbidOnly: !!process.env.CI,  // Prevent 'test.only' in CI environments
    retries: process.env.CI ? 2 : 0,  // Retry failed tests in CI
    workers: 10, // Run up to three tests simultaneously
    reporter: [['html', { outputFolder: 'playwright-report' }]],
    headless: true,
    expect: {
        timeout: 20000,  // Unified timeout for expect statements to 20 seconds
    },
    projects: [
        {
            name: 'plooto',
            testMatch: 'tests/**/*.ts',
            use: {
                navigationTimeout: 60 * 1000,
                actionTimeout: 60 * 1000,
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