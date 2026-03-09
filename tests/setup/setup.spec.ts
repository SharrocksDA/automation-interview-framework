import { sessionStoragePath } from "../../utils/config";
import { interviewTest } from "../../utils/interviewFixture";

interviewTest.describe("Login", () => {
    interviewTest("Login and store session storage", async ({ page, LoginPage }) => {
        await page.goto("/");
        await LoginPage.login(process.env.SAUCE_USERNAME as string, process.env.SAUCE_PASSWORD as string);

        // Store session storage after login to reuse in UI tests
        await page.context().storageState({ path: sessionStoragePath });
    });
});