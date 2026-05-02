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

  test('should sort products by name A to Z', async () => {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();
    expect(names[0]).toBe('Sauce Labs Backpack');
    expect(names[names.length - 1]).toBe('Test.allTheThings() T-Shirt (Red)');
  });

  test('should sort products by name Z to A', async () => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
    expect(names[names.length - 1]).toBe('Sauce Labs Backpack');
  });

  test('should sort products by price low to high', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();
    expect(prices[0]).toBe(7.99);
    expect(prices[prices.length - 1]).toBe(49.99);
    // Verify the full list is in ascending order
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('should sort products by price high to low', async () => {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();
    expect(prices[0]).toBe(49.99);
    expect(prices[prices.length - 1]).toBe(7.99);
    // Verify the full list is in descending order
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('should add a product to the cart and update the cart badge', async () => {
    await inventoryPage.addToCartByIndex(0);
    expect(await inventoryPage.getCartCount()).toBe(1);
  });

  test('should add multiple products to the cart and reflect correct badge count', async () => {
    await inventoryPage.addToCartByIndex(0);
    await inventoryPage.addToCartByIndex(1);
    await inventoryPage.addToCartByIndex(2);
    expect(await inventoryPage.getCartCount()).toBe(3);
  });

  test('should display a name and price for every product', async () => {
    const names = await inventoryPage.getProductNames();
    const prices = await inventoryPage.getProductPrices();

    expect(names).toHaveLength(6);
    expect(prices).toHaveLength(6);

    for (const name of names) {
      expect(name.trim()).not.toBe('');
    }
    for (const price of prices) {
      expect(price).toBeGreaterThan(0);
    }
  });
});
