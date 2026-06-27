import { Locator, Page } from '@playwright/test';

export default class AppointmentPage {
  readonly page: Page;
  readonly dateInput: Locator;
  readonly timeInput: Locator;
  readonly typeSelect: Locator;
  readonly submitButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateInput = page.locator('input[type="date"], input[name="date"]');
    this.timeInput = page.locator('input[type="time"], input[name="time"]');
    this.typeSelect = page.locator('select[name="appointmentType"], select#appointment-type');
    this.submitButton = page.locator('button:has-text("Book appointment"), button:has-text("Submit")');
    this.confirmationMessage = page.locator('text=Appointment confirmed, .confirmation-message');
  }

  async bookAppointment(date: string, time: string, type: string) {
    await this.dateInput.fill(date);
    await this.timeInput.fill(time);
    await this.typeSelect.selectOption({ label: type });
    await this.submitButton.click();
  }

  async getConfirmationText() {
    return this.confirmationMessage.textContent();
  }
}
