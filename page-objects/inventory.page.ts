import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.pageTitle = page.locator('.title');
    this.inventoryItems = this.inventoryList.locator('.inventory_item');
  }

  async getTitle(): Promise<string> {
    return await this.pageTitle.innerText();
  }

  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }
}
