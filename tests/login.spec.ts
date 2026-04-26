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
});
