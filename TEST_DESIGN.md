# Test Design Explanation

## Implemented Scenarios

### API Test: Create Pet
- **Endpoint**: `POST /pet`
- **Positive Scenario**: Create a pet with valid data and verify the response.
  - **Assertions**:
    - Status code is `200`.
    - Response body contains the correct `id`, `name`, and `status`.
- **Negative Scenarios** (not implemented):
  - Incorrect Authorisation token - expected to be a 401
  - Missing key in payload - expected to be a 405
  - Non-existent pet ID - expected to be a 405
  - Type check for one of the keys for example: "status": 1 - expected to be a 405

### UI Test: Valid Login and Add Item to Cart
- **Application**: Sauce Demo
- **Positive Scenario**: Log in with valid credentials, add an item to the cart, and verify the cart badge.
  - **Assertions**:
    - Successful login and storage state saved/used.
    - Inventory page loaded and bakcpack added to cart.
    - Cart badge displays the correct count.
- **Negative Scenarios** (not implemented):
  - Invalid login credentials.
  - Locked-out user login attempt.
  - Logged in user timeout.

## Rationale
- **API Layer**: Faster, less flaky, and easier to debug. Ideal for validation, business rules, and error handling.
- **UI Layer**: Focused on critical user journeys and high risk areas. These tests should be mocked out for the majority and only a subset of sanity tests be allowed to fully call the backend API's.

## Prioritization
1. API tests for core CRUD operations.
2. UI tests for login and cart functionality.
3. Edge cases and error handling.

## Trade-offs
- Limited time required focusing on high-value scenarios.
- Additional scenarios documented for future implementation.

## Extra tests that could be used for these UI and API targets
- Contract Testing for the UI/API boundry that would enable integration checks before deployment.
- Accessibility testing using the axe-core playwright package for testing against WCAG standards.
- K6 for performance testing the API endpoints and UI pages.
- OWASP Zap for security and vulnerability scanning both the UI and the API.
- Docker could be utilised to run the Portal and the UI tests within a pipeline(Azure Devops for example) this would allow the UI tests to be run on a PR validation pipeline.