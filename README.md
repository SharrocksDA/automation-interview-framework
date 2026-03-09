# Playwright UI & API Test Automation Framework

This repository contains a lightweight test automation framework built using **Playwright with TypeScript**.  
It demonstrates both **UI automation** and **API testing** as part of a structured technical assessment.

## Features
- **UI tests** for the Sauce Demo application
- **API tests** for the Swagger Petstore API
- Clear test structure using maintainable patterns
- Example positive and negative test scenarios
- Built-in Playwright HTML reporting
- Environment variable support via `.env` file
- **Response Time Checks**: Ensures API responses meet performance benchmarks using a configurable threshold.
- **Accessibility Testing**: Validates web pages against WCAG 2.2 standards using Axe and generates detailed HTML reports.

## Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/SharrocksDA/automation-interview-framework.git
   ```
2. Navigate to the project directory:
   ```bash
   cd automation-interview-framework
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables (this can be skipped for this demo repo)
- Create a `.env` file in the root directory to configure environment-specific settings, example variables are in the .env.example file.

## Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run API Tests Only
```bash
npx playwright test --project="API Tests"
```

### Run UI Tests Only
```bash
npx playwright test --project="UI Tests"
```

### View HTML Report
```bash
npx playwright show-report
```

## Project Structure
- **pages/**: Page Object Models for UI tests.
- **tests/**: Contains API and UI test files.
  - `api/`: API test cases.
  - `ui/`: UI test cases.
- **utils/**: Utility functions and helpers.
- **test-data/**: Test data files.
- **playwright-report/**: HTML reports generated after test runs.
- **test-results/**: Raw test results and JUnit XML files.

## Folder Structure

- `tests/api/`: Contains API test cases.
- `tests/ui/`: Contains UI test cases.
- `utils/`: Utility functions and shared fixtures.
- `types/`: Type definitions for API and other shared data structures.
- `test-data/`: Static test data used in the tests.
- `playwright-report/`: Contains the HTML report generated after test execution.
- `test-results/`: Stores test results, including JUnit XML and HTML reports.

## Accessibility Testing
This framework includes automated accessibility testing using Axe. To run accessibility tests:
1. Ensure the `@axe-core/playwright` package is installed.
2. Use the `runAccessibilityTests` utility in your tests to validate pages and generate reports.

## Response Time Checks
Response time checks are implemented using the `measureResponseTime` utility. This ensures API endpoints respond within a configurable threshold defined in the `config.ts` file.

## Additional Documentation
- **[TEST_DESIGN.md](TEST_DESIGN.md)**: Explains the implemented scenarios, additional test ideas, and prioritization rationale.

## Troubleshooting

### Common Issues
- **Playwright not installed**: Ensure you have run `npm install` to install all dependencies.
- **Node.js version mismatch**: Verify that you are using Node.js v16 or higher.
- **Environment variables not set**: If required, create a `.env` file in the root directory with the necessary variables.
- **Tests failing due to network issues**: Ensure you have a stable internet connection and the required endpoints are accessible.

### Viewing Reports
- After running the tests, the HTML report will be generated in the `test-results` directory.
- To view the report, open the `test-results/index.html` file in your browser.

## License
This project is licensed under the MIT License.