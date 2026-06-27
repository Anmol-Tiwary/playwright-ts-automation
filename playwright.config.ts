import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  // ─── Test Directory ──────────────────────────────────────────────────
  testDir: './tests',

  // ─── Global Settings ─────────────────────────────────────────────────
  timeout: 30000,
  expect: { timeout: 5000 },
  // fullyParallel: true,
  // forbidOnly: !!process.env.CI,
  // retries: process.env.CI ? 2 : 0,
  // workers: process.env.CI ? 2 : undefined,

  // ─── Reporters ───────────────────────────────────────────────────────
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright'],
    ['junit', { outputFile: 'test-results/allure-results.xml' }],
  ],

  // ─── Global Use Options ───────────────────────────────────────────────
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    //video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  // ─── Projects (Browsers) ─────────────────────────────────────────────
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    // ─── Mobile Viewports ──────────────────────────────────────────
    {
      name: 'Mobile Chrome',
      use: { ...devices['iPhone 17 Pro'] },
    },
  ],

  // ─── Output Folder ────────────────────────────────────────────────────
  outputDir: 'test-results/',
});
