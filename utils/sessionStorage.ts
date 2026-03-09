import { Page } from "@playwright/test";
import fs from "fs/promises";

// INFO: This amount of session and local storage setup isn't requred for this sauce demo site but this is how I have setup session storage for more complex sites.
/**
 * Saves the session storage data of the current page to a file.
 * @param {Page} page - The Playwright page instance.
 * @param {string} filePath - The file path to save the session storage data.
 * @returns {Promise<void>} Resolves when the session storage data is saved.
 */
export async function saveSessionStorage(page: Page, filePath: string): Promise<void> {
    const sessionStorageData = await page.evaluate(() => {
        const data: { [key: string]: string } = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            if (key) {
                data[key] = sessionStorage.getItem(key) || '';
            }
        }
        return data;
    });

    const storageJson = await fs.readFile(filePath, 'utf-8');
    const storageState = JSON.parse(storageJson);

    const originIndex = storageState.origins.findIndex((origin: any) => origin.origin === page.url());
    if (originIndex >= 0) {
        storageState.origins[originIndex].sessionStorage = sessionStorageData;
    } else {
        storageState.origins.push({
            origin: page.url(),
            localStorage: [],
            sessionStorage: sessionStorageData,
        });
    }
    await fs.writeFile(filePath, JSON.stringify(storageState, null, 2), 'utf-8');
};

/**
 * Loads session storage data from a file and applies it to the current page.
 * @param {Page} page - The Playwright page instance.
 * @param {string} filePath - The file path to load the session storage data from.
 * @returns {Promise<void>} Resolves when the session storage data is applied.
 */
export async function loadSessionStorage(page: Page, filePath: string): Promise<void> {
    const context = page.context();

    const storageJson = await fs.readFile(filePath, 'utf-8');
    const storageState = JSON.parse(storageJson);
    await context.addCookies(storageState.cookies);

    const origin = storageState.origins.find((origin: Origin) => origin.sessionStorage);
    if (origin && origin.sessionStorage) {
        for (const [key, value] of Object.entries(origin.sessionStorage)) {
            await context.addInitScript(([key, value]) => {
                sessionStorage.setItem(key as string, value as string);
            }, [key, value]);
        }
    };
};

type Origin = {
    origin: string;
    localStorage: Array<Record<string, string>>;
    sessionStorage: Record<string, string>;
}