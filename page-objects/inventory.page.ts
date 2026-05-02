import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.pageTitle = page.locator('.title');
    this.inventoryItems = this.inventoryList.locator('.inventory_item');
    this.itemNames = this.inventoryList.locator('.inventory_item_name');
    this.itemPrices = this.inventoryList.locator('.inventory_item_price');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async getTitle(): Promise<string> {
    return await this.pageTitle.innerText();
  }

  async getProductCount(): Promise<number> {
    return await this.inventoryItems.count();
  }

  async getProductNames(): Promise<string[]> {
    return await this.itemNames.allInnerTexts();
  }

  async getProductPrices(): Promise<number[]> {
    const rawPrices = await this.itemPrices.allInnerTexts();
    return rawPrices.map((p) => parseFloat(p.replace('$', '')));
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async addToCartByIndex(index: number): Promise<void> {
    await this.inventoryItems.nth(index).locator('button').click();
  }

  async getCartCount(): Promise<number> {
    const text = await this.cartBadge.innerText();
    return parseInt(text, 10);
  }
}
