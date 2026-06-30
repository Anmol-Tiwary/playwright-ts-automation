// spec: tests/cura-login-validation-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../../../src/fixtures/fixtures';

test.describe('CURA Healthcare Login Validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.gotoCuraHome();
    await loginPage.assertCuraHomeVisible();
    await loginPage.gotoCuraLogin();
    await loginPage.assertCuraLoginFormVisible();
  });

  test('Positive Login with Valid Credentials', async ({ loginPage }) => {
    await loginPage.loginToAppointment('John Doe', 'ThisIsNotAPassword');
    await loginPage.assertCuraLoggedIn();
  });

  test('Negative Login with Invalid Credentials', async ({ loginPage }) => {
    await loginPage.loginToAppointment('invalid-user', 'invalid-pass');
    await loginPage.assertCuraLoginFailed();
    await loginPage.assertCuraLoginPageUrl();
  });

  test('Negative Login with Empty Username', async ({ loginPage }) => {
    await loginPage.loginToAppointment('', 'ThisIsNotAPassword');
    await loginPage.assertCuraLoginFailed();
    await loginPage.assertCuraLoginPageUrl();
  });

  test('Negative Login with Empty Password', async ({ loginPage }) => {
    await loginPage.loginToAppointment('John Doe', '');
    await loginPage.assertCuraLoginFailed();
    await loginPage.assertCuraLoginPageUrl();
  });
});
