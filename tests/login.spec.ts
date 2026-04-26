import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login successfully with standard_user', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    // Assert that the user is redirected to the inventory page by verifying URL
    await expect(page).toHaveURL(/.*inventory.html/);

    // Assert that the header element is present and has the correct text
    const title = page.locator('.title');
    await expect(title).toHaveText('Products');
  });

  test('should login successfully with locked_out_user', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    // Assert that the error message is displayed
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('should show error with invalid password', async ({ page }) => {
    await loginPage.login('standard_user', 'wrong_password');

    // Assert that the error message is displayed
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('should show error with invalid username', async ({ page }) => {
    await loginPage.login('wrong_user', 'secret_sauce');

    // Assert that the error message is displayed
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Epic sadface: Username and password do not match any user in this service');
  });

  test('should require both username and password', async ({ page }) => {
    // Try to log in with empty username
    await loginPage.login('', 'secret_sauce');

    // Assert that the error message is displayed
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Epic sadface: Username is required');

    // Try to log in with empty password
    await loginPage.login('standard_user', '');

    // Assert that the error message is displayed
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Epic sadface: Password is required');
  });

  test('should show error when both fields are empty', async ({ page }) => {
    await loginPage.login('', '');

    // Assert that the error message is displayed
    const errorMsg = page.locator('[data-test="error"]');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toContainText('Epic sadface: Username is required');
  });
});
