# Playwright E2E Tests

This directory contains end-to-end tests for the Monex currency converter application using Playwright.

## Running Tests

### Run all E2E tests

```bash
yarn test:e2e
```

### Run tests with UI mode (interactive)

```bash
yarn test:e2e:ui
```

### Run tests in headed mode (see browser)

```bash
npx playwright test --headed --config e2e-playwright/playwright.config.js
```

### Run specific test file

```bash
npx playwright test currency-converter.spec.ts --config e2e-playwright/playwright.config.js
```
