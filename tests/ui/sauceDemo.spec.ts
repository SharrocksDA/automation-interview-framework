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

  interviewTest("should add an item to the cart and check for cart badge count", async ({ page, InventoryPage, runAccessibilityTests }, testInfo) => {
    // Add item to cart
    await InventoryPage.addItemToCart("backpack");

    // Verify cart badge count
    await InventoryPage.checkCartCount(1);

    await runAccessibilityTests(page, 'sauce-demo-inventory-page', 5, testInfo);
  });

  // Additional Test Scenarios:
  // 1. Invalid Login:
  //    - Verify error messages for incorrect credentials.
  // 2. Session Timeout:
  //    - Verify that the user is logged out after a period of inactivity and redirected to the login page.
  // 3. Checkout Flow:
  //    - Validate the happy path and error handling during checkout.
  // 4. Add/Remove Multiple Items:
  //    - Test cart functionality with multiple items.
  // 5. Session Persistence:
  //    - Ensure cart state is maintained across navigation.
  // 6. Sorting and Filtering:
  //    - Verify that sorting and filtering options on the inventory page work as expected.
  //    - Test edge cases like no results or invalid filter criteria.
  // 7. Error Handling:
  //    - Simulate network failures or server errors and verify that the UI displays appropriate error messages.
  // 8. Responsive Design:
  //    - Test the UI on different screen sizes (e.g., mobile, tablet, desktop) to ensure it is responsive.
  // 9. Accessibility:
  //    - Test the application for accessibility compliance (e.g., keyboard navigation, screen reader support).
  // 10. Checkout Edge Cases:
  //    - Test scenarios like:
  //       - Attempting to checkout with an empty cart.
  //       - Removing items from the cart during the checkout process.
  // 11. UI Performance:
  //    - Measure the time it takes for key pages (e.g., login, inventory, checkout) to load and ensure it meets performance benchmarks.
});
