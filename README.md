# SauceDemo Playwright Automation

A Playwright + TypeScript test automation framework for [SauceDemo](https://www.saucedemo.com/).

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm (comes with Node.js)

## Project Structure

```text
saucedemo-playwright/
├── page-objects/
│   ├── login.page.ts       # Login page locators and actions
│   └── inventory.page.ts   # Inventory page locators and actions
├── tests/
│   ├── login.spec.ts       # Login test scenarios
│   └── inventory.spec.ts   # Inventory page test scenarios
├── .github/workflows/      # GitHub Actions CI configuration
├── playwright.config.ts    # Playwright configuration
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/appygppy-afk/saucedemo-playwright.git
cd saucedemo-playwright
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install chromium
```

## Running Tests

Headless mode (default):
```bash
npx playwright test
```

Headed mode (visible browser):
```bash
npx playwright test --headed
```

View HTML report:
```bash
npx playwright show-report
```

## CI

Tests run automatically on every push via GitHub Actions.

## Test Coverage

| Area | Tests |
|------|-------|
| Login | 6 |
| Inventory | 9 |
| **Total** | **15** |
