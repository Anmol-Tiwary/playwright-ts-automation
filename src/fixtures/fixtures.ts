import { test as base, BrowserContext, Page } from '@playwright/test';
import { CartPage } from '../pages/inventory/CartPage';       // ✅ named import
import { CheckoutPage } from '../pages/inventory/CheckoutPage';
import { InventoryPage } from '../pages/inventory/InventoryPage';
import { LoginPage } from '../pages/common/LoginPage';
import AppointmentPage from '../pages/appointment/AppointmentPage';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  appointmentPage: AppointmentPage;
  //Add new page fixtures here as your suite grows
};

// Extend base test with all page fixtures
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
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