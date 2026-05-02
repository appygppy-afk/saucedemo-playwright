import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { InventoryPage } from '../page-objects/inventory.page';

test.describe('Inventory Page', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('should display the inventory page with correct URL and title', async ({ page }) => {
    await expect(page).toHaveURL(/.*inventory\.html/);
    expect(await inventoryPage.getTitle()).toBe('Products');
  });

  test('should display exactly 6 products', async () => {
    expect(await inventoryPage.getProductCount()).toBe(6);
  });
});
