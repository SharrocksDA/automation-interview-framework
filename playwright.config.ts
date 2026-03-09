import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    [
      'html', {
        open: 'never',
        outputFolder: 'test-results',
      }

    ],
    [
      'junit', {
        outputFile: './test-results/test-results.xml'
      }
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
    projects: [
    {
      name: 'ui-setup',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
      testMatch: 'setup/setup.spec.ts',
    },
    {
      name: 'ui',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.saucedemo.com',
      },
      testMatch: 'ui/**/*.spec.ts',
      dependencies: ['ui-setup'],
    },
    {
      name: 'api',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://petstore.swagger.io',
      },
      testMatch: 'api/**/*.spec.ts',
    },
  ]
});

// Reports are saved in the `test-results` directory. The HTML report can be accessed by opening `test-results/index.html` in a browser.
