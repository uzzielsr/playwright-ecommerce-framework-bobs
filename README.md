<<<<<<< HEAD

# Playwright Ecommerce Framework

This project is an end-to-end and API automation framework for [automationexercise.com](https://www.automationexercise.com/), built with Playwright and TypeScript.

## Key Updates (August 2025)

- **User Data Handling:**
  - Login and checkout tests now use a fixed email from `.env` (`TEST_EMAIL`) to ensure the user exists and login is reliable.
  - Signup and test user generation use random emails for isolation and to avoid conflicts.
- **Overlay Handling:**
  - The PDP Page Object now automatically closes the Attentive overlay if it appears, using the `attentiveCloseButton` locator defined in `pdpLocators`.
- **Locator Best Practices:**
  - All selectors, including overlays and modals, are now centralized in the corresponding locator files for each environment.
- **Fixture Improvements:**
  - Fixtures use only the necessary fields, matching the actual test and page object requirements.

## Goals

This framework aims to achieve the following objectives:

1. **Automate Login, Account Creation, Checkout UI** - Comprehensive UI test coverage for core user flows
2. **Automate Login & User Account CRUD API** - Complete API testing for user management operations
3. **Utilize API to support UI tests** - Leverage API calls for efficient test setup and data management
4. **Have Fun** - Learn and explore automation testing with modern tools and best practices

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (version 14 or higher recommended)

## Installation

```sh
npm install                                                     # Install all dependencies (defined in package.json)
npx playwright install                                          # Install Playwright browsers (Chromium, Firefox, WebKit)
```

## Running Tests

### Quick Start Commands

```sh
# Run all tests (headless mode)
npm test

# Run all tests with browser UI visible
npm run test:headed

# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Debug tests (step-by-step execution)
npm run test:debug
```

### Environment-Specific Commands

```sh
# Production environment
npm run test:prod

# QA environment
npm run test:qa

# UAT environment
npm run test:uat
```

### Browser-Specific Commands

```sh
# Chrome (Chromium)
npm run test:prod:chrome         # Headless
npm run test:prod:chrome:headed  # With UI

# Firefox
npm run test:prod:firefox        # Headless
npm run test:prod:firefox:headed # With UI

# Safari (WebKit)
npm run test:prod:webkit         # Headless
npm run test:prod:webkit:headed  # With UI
```

### Reporting & Debugging

```sh
# Open HTML test report
npm run report

# Generate new tests using Playwright's codegen
npm run codegen

# View trace files for failed tests
npm run trace
```

### Direct Playwright Commands

```sh
# Run all tests in production environment
ENV=prod npx playwright test

# Run specific test file
ENV=prod npx playwright test tests/ui/checkout.ui.spec.ts --project=chromium --reporter=list

# Run with browser UI visible
ENV=prod npx playwright test tests/ui/checkout.ui.spec.ts --project=chromium --reporter=list --headed
```

## Project Structure

```
playwright-ecommerce-framework/
├── api/                        # API helpers and utilities
│   └── user.api.ts            # User API operations
├── fixtures/                   # Modern Playwright fixtures
│   ├── ui-fixtures.ts         # UI test fixtures with page objects
│   └── api-fixtures.ts        # API test fixtures with user management
├── locators/                   # Page selectors organized by environment
│   ├── cart/                  # Cart page locators
│   │   ├── cart.locators.prod.ts
│   │   ├── cart.locators.qa.ts
│   │   ├── cart.locators.uat.ts
│   │   └── index.ts
│   ├── checkout/              # Checkout page locators
│   │   ├── checkout.locators.prod.ts
│   │   ├── checkout.locators.qa.ts
│   │   ├── checkout.locators.uat.ts
│   │   └── index.ts
│   ├── login/                 # Login page locators
│   │   ├── login.locators.prod.ts
│   │   ├── login.locators.qa.ts
│   │   ├── login.locators.uat.ts
│   │   └── index.ts
│   ├── pdp/                   # Product Detail Page locators
│   │   ├── pdp.locators.prod.ts   # Includes attentiveCloseButton locator for overlay handling
│   │   ├── pdp.locators.qa.ts
│   │   ├── pdp.locators.uat.ts
│   │   └── index.ts
│   ├── plp/                   # Product List Page locators
│   │   ├── plp.locators.prod.ts
│   │   ├── plp.locators.qa.ts
│   │   ├── plp.locators.uat.ts
│   │   └── index.ts
│   └── signup/                # Signup page locators
│       ├── signup.locators.prod.ts
│       ├── signup.locators.qa.ts
│       ├── signup.locators.uat.ts
│       └── index.ts
├── pages/                     # Page Object Model implementations
│   ├── cart.page.ts          # Cart page actions and methods
│   ├── checkout.page.ts      # Checkout page actions and methods
│   ├── login.page.ts         # Login page actions and methods
│   ├── pdp.page.ts           # Product Detail Page actions and methods
│   ├── plp.page.ts           # Product List Page actions and methods
│   └── signup.page.ts        # Signup page actions and methods
├── tests/                     # Test files organized by type
│   ├── api/                  # API test files
│   │   ├── login.api.spec.ts # Login API tests
│   │   └── user-crud.api.spec.ts # User CRUD API tests
│   └── ui/                   # UI test files
│       ├── checkout.ui.spec.ts # Checkout UI tests
│       ├── login.ui.spec.ts   # Login UI tests
│       └── signup.ui.spec.ts  # Signup UI tests
├── utils/                     # Utilities and helper functions
│   └── test-users.ts         # Test user data generation (uses fixed and random emails as needed)
├── .env.prod                  # Production environment variables (only required fields)
├── .env.qa                    # QA environment variables (only required fields)
├── .env.uat                   # UAT environment variables (only required fields)
├── package.json              # Project dependencies and scripts
├── playwright.config.ts       # Playwright configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## Features

- **Modern Playwright Fixtures** - Clean test setup using fixtures pattern instead of traditional beforeEach/afterEach
- **Multi-environment support** (`prod`, `qa`, `uat`) with dedicated configuration files
- **Comprehensive test organization** - Separation of UI and API tests with dedicated fixtures
- **Page Object Model (POM)** - Maintainable and reusable page interactions
- **Dynamic locators per environment** - Environment-specific element selectors
- **Optimized npm script library** - 17 intelligent commands for different testing scenarios
- **Multi-browser support** - Chrome, Firefox, and Safari (WebKit) testing
- **Test utilities** - Helper functions for test data generation and user management
- **Advanced reporting** - HTML reports, traces, and screenshots on failure
- **API integration** - API helpers to support and enhance UI tests
- **TypeScript support** - Full type safety and modern development experience

## Test Coverage

### UI Tests

- **Login Flow** (`tests/ui/login.ui.spec.ts`) - User authentication scenarios using fixtures
- **Signup Flow** (`tests/ui/signup.ui.spec.ts`) - Account creation process with fixture-based setup
- **Checkout Flow** (`tests/ui/checkout.ui.spec.ts`) - End-to-end purchase process with clean test isolation

### API Tests

- **Login API** (`tests/api/login.api.spec.ts`) - Authentication API endpoints with automatic user cleanup
- **User CRUD API** (`tests/api/user-crud.api.spec.ts`) - User management operations using API fixtures

### Fixtures Architecture

- **UI Fixtures** (`fixtures/ui-fixtures.ts`) - Pre-configured page objects and user data for UI tests
- **API Fixtures** (`fixtures/api-fixtures.ts`) - User management with automatic creation and cleanup
- **Modern Pattern** - Eliminates code duplication from traditional beforeEach/afterEach blocks

### Page Objects

- **Login Page** - User authentication interactions with fixture integration
- **Signup Page** - Account registration interactions with automated cleanup
- **Cart Page** - Shopping cart management with clean test isolation
- **Checkout Page** - Order completion process using modern fixtures
- **Product List Page (PLP)** - Product browsing and selection
- **Product Detail Page (PDP)** - Individual product interactions

## Framework Improvements

### Recent Optimizations (August 2025)

- **✅ Modern Fixtures Pattern** - Replaced all beforeEach/afterEach blocks with Playwright fixtures
- **✅ Script Consolidation** - Reduced NPM scripts from 32 to 17 intelligent commands
- **✅ Code Deduplication** - Eliminated repetitive setup code across all test files
- **✅ Enhanced Documentation** - Added comprehensive JSDoc and updated README
- **✅ Clean Architecture** - Centralized test setup with automatic resource cleanup
- **✅ Overlay Handling** - Attentive overlay is now closed automatically in PDP flows
- **✅ Locator Centralization** - All selectors, including overlays, are in locator files
- **✅ Environment Variable Cleanup** - .env files now only include required fields for tests
- **✅ User Data Consistency** - Login/checkout use fixed emails, signup uses random emails

### Benefits of Fixtures Implementation

- **Improved Maintainability** - Single source of truth for test setup
- **Better Test Isolation** - Automatic cleanup prevents test interference
- **Reduced Code Duplication** - No more repetitive beforeEach/afterEach blocks
- **Enhanced Readability** - Tests focus on business logic, not setup
- # **Parallel Execution Safe** - Fixtures handle concurrent test execution properly