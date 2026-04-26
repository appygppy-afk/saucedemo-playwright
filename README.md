# SauceDemo Playwright Automation

A professional Playwright + TypeScript automation repository for testing [SauceDemo](https://www.saucedemo.com/).

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

## Project Structure

\`\`\`text
saucedemo-playwright/
├── data/                  # Test data
│   └── users.json         # Example data file
├── page-objects/          # Page Object Model (POM) classes
│   └── login.page.ts      # Login page interactions and selectors
├── tests/                 # Test specifications
│   └── login.spec.ts      # Login test scenarios
├── playwright.config.ts   # Playwright configuration
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
\`\`\`

## Installation

1. Clone or navigate to the repository directory.
2. Install the dependencies:

\`\`\`bash
npm install
\`\`\`

3. Install Playwright browsers (if not already installed):

\`\`\`bash
npx playwright install chromium
\`\`\`

## Running Tests

To run the tests in headless mode (default):

\`\`\`bash
npx playwright test
# or
npm run test
\`\`\`

To run the tests in headed mode (visible browser):

\`\`\`bash
npx playwright test --headed
# or
npm run test:headed
\`\`\`

## Initialization Commands Reference

If you want to initialize a similar project from scratch, use the following commands:

\`\`\`bash
# Create a new directory and navigate into it
mkdir my-playwright-project
cd my-playwright-project

# Initialize a new Playwright project with TypeScript (Interactive)
npm init playwright@latest
# Note: Choose TypeScript, tests folder, and add a GitHub Actions workflow if desired.

# Alternatively, manual setup (what we did for this repo):
npm init -y
npm install -D @playwright/test typescript @types/node
mkdir tests page-objects data
\`\`\`
