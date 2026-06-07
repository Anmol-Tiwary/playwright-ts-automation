import { test, expect } from '@playwright/test';

test.describe("make Appointment", () => {
    test.beforeEach("Login with valid credentials", async({page}) => {
        //goto url and click on make appointment
          await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  //provide the valid credentials and login and validate the login
  await page.getByLabel('Username').fill('John Doe');
  await page.getByLabel('Password').fill('ThisIsNotAPassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('h2')).toContainText('Make Appointment');
    })

    test("should make an appointment by non default values", async ({page}) => {
        await expect(page.locator('h2')).toContainText('Make Appointment');
  await page.getByLabel('Facility').selectOption('Seoul CURA Healthcare Center');
  await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
  await page.getByRole('radio', { name: 'Medicaid' }).check();
  await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
  await page.getByRole('cell', { name: '29' }).click();
  await page.getByRole('textbox', { name: 'Comment' }).fill('This is a multi line comment box and I am testing my 1st e2e testing for this project');
  await page.getByRole('button', { name: 'Book Appointment' }).click();

  //assertion of data post booking
  await expect(page.locator('h2')).toContainText('Appointment Confirmation');
  await expect(page.locator('#summary')).toContainText('Please be informed that your appointment has been booked as following:');
  })
})