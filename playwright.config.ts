import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv'
import { resolve } from 'dns';

dotenv.config({path: path.resolve(__dirname, '.env')});

export const baseConfig = defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  globalSetup: './tests/helpers/global-setup.ts',
  reporter: [['html',{
    open: "never",
  }],
  [
    "allure-playwright",
    {
      detail: true,
      suiteTitle: true,
      environmentInfo: {
        name: "TEST",
        appName: "CURA",
        Release: "Release 1.1",
      },
    },],
  ],
  use: {
    headless: false,
    viewport: null,
    screenshot: "only-on-failure",

    //setting timeout globally for action
    actionTimeout: 10000
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"],
        },
      },
    },
    // {
    //   name: 'msedge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //   },
    // },
  ],
});