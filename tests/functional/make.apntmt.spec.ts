import { test, expect } from '@playwright/test';
import path from 'path';
import * as fileHelpers from '../helpers/file-helpers';

const csvFilePath = path.resolve(`${process.cwd()}/data/functional/make-apt-testData.csv`)
const makeAppttestData = fileHelpers.readCsv(csvFilePath)

test.describe("make Appointment", () => {
    test.beforeEach("Login with valid credentials", async ({ page }) => {
        //goto url and click on make appointment
        await page.goto('https://katalon-demo-cura.herokuapp.com/');
        await page.getByRole('link', { name: 'Make Appointment' }).click();
        //provide the valid credentials and login and validate the login
        await page.getByLabel('Username').fill('John Doe');
        await page.getByLabel('Password').fill('ThisIsNotAPassword');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('h2')).toContainText('Make Appointment');
    })

    makeAppttestData.forEach((row: any) => {
        test(`Make appointment - ${row.testId}`, async ({ page }) => {
            await expect(page.locator('h2')).toContainText('Make Appointment');
            await page.getByLabel('Facility').selectOption({ label: row.facility });
            await page.getByRole('checkbox', { name: 'Apply for hospital readmission' }).check();
            await page.getByRole('radio', { name: row.hcp }).check();
            // open date picker and select the day from CSV (format DD/MM/YYYY)
            const [dd, mm, yyyy] = row.visitDt.split('/');
            const day = String(Number(dd));
            await page.getByRole('textbox', { name: 'Visit Date (Required)' }).click();
            // pick the day cell that belongs to the current month (exclude .new/.old cells)
            const dayLocator = page.locator(`td.day:not(.new):not(.old):has-text("${day}")`).first();
            await dayLocator.click();
            await page.getByRole('textbox', { name: 'Comment' }).fill(`Booking for ${row.testId}`);
            await page.getByRole('button', { name: 'Book Appointment' }).click();

            //assertion of data post booking
            await expect(page.locator('h2')).toContainText('Appointment Confirmation');
            await expect(page.locator('#summary')).toContainText('Please be informed that your appointment has been booked as following:');
        })
    })
})