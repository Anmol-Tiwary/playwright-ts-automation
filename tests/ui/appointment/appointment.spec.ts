import { test, expect } from '@playwright/test';
import { APPOINTMENT_DATA } from '../../../src/data/appointment.data';
import LoginPage from '../../../src/pages/common/LoginPage';
import AppointmentPage from '../../../src/pages/appointment/AppointmentPage';

test.describe('Appointment flow', () => {
  test('should book an appointment', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await loginPage.goto(APPOINTMENT_DATA.url);
    await loginPage.login('testuser', 'Password123!');
    await appointmentPage.bookAppointment(
      APPOINTMENT_DATA.appointment.date,
      APPOINTMENT_DATA.appointment.time,
      APPOINTMENT_DATA.appointment.type
    );

    await expect(appointmentPage.getConfirmationText()).resolves.toContain('Appointment');
  });
});
