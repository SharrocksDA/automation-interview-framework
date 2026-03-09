import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { buildPet } from "../test-data/pets";
import { Pet } from "../types/petstoreTypes";
import { measureResponseTime } from "./responseTimeChecker";
import { runAccessibilityTests } from "./accessibility";
import test from "@playwright/test";

type testFixure = {
    LoginPage: LoginPage;
    InventoryPage: InventoryPage;
    buildPet: () => Promise<Pet>;
    measureResponseTime: (apiCall: () => Promise<any>, threshold?: number) => Promise<any>;
    runAccessibilityTests: (page: any, reportName: string, violationCountMax: number, testInfo: any) => Promise<any>;
}

export const interviewTest = test.extend<testFixure>({
    LoginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    InventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    buildPet: async ({ }, use) => {
        await use(async () => {
            const pet = buildPet();
            return pet;
        });
    },
    measureResponseTime: async ({ }, use) => {
        await use(async (apiCall: () => Promise<any>, threshold?: number) => {
            return measureResponseTime(apiCall, threshold);
        });
    },
    runAccessibilityTests: async ({ }, use) => {
        await use(async (page: any, reportName: string, violationCountMax: number, testInfo: any) => {
            return runAccessibilityTests(page, reportName, violationCountMax, testInfo);
        });
    }
});