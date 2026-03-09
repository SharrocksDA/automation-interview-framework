import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly addToCartPrefix: string;
    readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        // Similar to the LoginPage, I would prefer to use page.getByTestId('add-to-cart-sauce-labs-backpack') etc. 
        // for these locators, but the saucedemo app doesn't have data-testid attributes, so I'm using the existing 
        // data-test attributes instead.
        this.addToCartPrefix = '[data-test="add-to-cart-';
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    /**
     * Adds an item to the cart based on the provided item name.
     * @param {'backpack' | 'bike-light' | 'bolt-t-shirt' | 'fleece-jacket' | 'onesie' | 'red-t-shirt'} item - The name of the item to add to the cart.
     * @returns {Promise<void>} Resolves when the item is added to the cart.
     * 
     * @example
     * // Adds a backpack to the cart
     * await inventoryPage.addItemToCart('backpack');
     */
    async addItemToCart(item: 'backpack' | 'bike-light' | 'bolt-t-shirt' | 'fleece-jacket' | 'onesie' | 'red-t-shirt'): Promise<void> {
        switch (item) {
            case 'backpack':
                await this.page.click(`${this.addToCartPrefix}sauce-labs-backpack"]`);
                break;
            case 'bike-light':
                await this.page.click(`${this.addToCartPrefix}sauce-labs-bike-light"]`);
                break;
            case 'bolt-t-shirt':
                await this.page.click(`${this.addToCartPrefix}sauce-labs-bolt-t-shirt"]`);
                break;
            case 'fleece-jacket':
                await this.page.click(`${this.addToCartPrefix}sauce-labs-fleece-jacket"]`);
                break;
            case 'onesie':
                await this.page.click(`${this.addToCartPrefix}sauce-labs-onesie"]`);
                break;
            case 'red-t-shirt':
                await this.page.click(`${this.addToCartPrefix}test.allthethings()-t-shirt-(red)"]`);
                break;
            default:
                throw new Error(`Item ${item} not found`);
        }
    };

    /**
     * Verifies that the shopping cart contains the expected number of items.
     * @param {number} count - The expected number of items in the cart.
     * @returns {Promise<void>} Resolves when the cart count matches the expected value.
     * 
     * @example
     * // Checks if the cart contains 2 items
     * await inventoryPage.checkCartCount(2);
     */
    async checkCartCount(count: number): Promise<void> {
        await expect(this.shoppingCartLink).toHaveText(count.toString());
    }
}