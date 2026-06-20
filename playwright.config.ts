import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
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
        appNmae: "CURA",
        Release: "Release 1.1",
      },
    },],
  ],
  use: {
    headless: false,
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
    },
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
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