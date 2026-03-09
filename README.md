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

## Additional Documentation
- **[TEST_DESIGN.md](TEST_DESIGN.md)**: Explains the implemented scenarios, additional test ideas, and prioritization rationale.

## License
This project is licensed under the MIT License.