import { sessionStoragePath } from "../../utils/config";
import { interviewTest } from "../../utils/interviewFixture";

interviewTest.describe("Sauce Demo UI", () => {
  interviewTest.use({ storageState: sessionStoragePath });

  interviewTest.beforeEach(async ({ page }) => {
    // Navigate to inventory page with logged in state
    await page.goto("/inventory.html");

    // I would create HAR files for each test section to keep all mocks in a single location and easily maintainable.
    // Using await page.routeFromHAR();
    // These mocks would only give back the information required for the tests.
    // This splits up the UI and API tests and allows us to test the UI in isolation without worrying about the API responses.
  });

  interviewTest("should add an item to the cart and check for cart badge count", async ({ InventoryPage }) => {
    // Add item to cart
    await InventoryPage.addItemToCart("backpack");

    // Verify cart badge count
    await InventoryPage.checkCartCount(1);
  });
});
