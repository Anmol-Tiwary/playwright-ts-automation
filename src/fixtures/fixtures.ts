import { test as base, BrowserContext, Page } from '@playwright/test';
import { CartPage } from '../pages/sauceDemo/CartPage';
import { CheckoutPage } from '../pages/sauceDemo/CheckoutPage';
import { InventoryPage } from '../pages/sauceDemo/InventoryPage';
import { SauceLoginPage } from '../pages/sauceDemo/SauceLoginPage';
import { CuraLoginPage } from '../pages/cura/CuraLoginPage';
import AppointmentPage from '../pages/cura/AppointmentPage';

type Fixtures = {
  sauceLoginPage: SauceLoginPage;
  loginPage: SauceLoginPage;
  curaLoginPage: CuraLoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  appointmentPage: AppointmentPage;
  //Add new page fixtures here as your suite grows
};

// Extend base test with all page fixtures
export const test = base.extend<Fixtures>({
  sauceLoginPage: async ({ page }, use) => {
    await use(new SauceLoginPage(page));
  },

  loginPage: async ({ sauceLoginPage }, use) => {
    await use(sauceLoginPage);
  },

  curaLoginPage: async ({ page }, use) => {
    await use(new CuraLoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  appointmentPage: async ({ page }, use) => {
    await use(new AppointmentPage(page));
  },
});

export { expect } from '@playwright/test';