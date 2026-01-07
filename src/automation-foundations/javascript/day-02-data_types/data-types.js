// ======================================
// Day 02 – JavaScript Data Types
// File: data-types.js
// Scope: Understanding core JS data types
// Focus: How each data type is used in
//        real-world automation frameworks
// ======================================


// --------------------------------------
// 1. STRING – Text Data (Most Used Type)
// --------------------------------------
// Strings are heavily used in automation for:
// - Test names
// - Error messages
// - UI selectors
// - Logs and assertions

const testName = "Login Test";
const errorMessage = "Invalid credentials";
const usernameSelector = "#username-field";
const passwordSelector = "#password-field";

// ---------- Template Literals ----------
// Used for dynamic logs, selectors, and messages
const browser = "chrome";
console.log(`Running "${testName}" on ${browser} browser`);


// --------------------------------------
// 2. NUMBER – Timeouts, Counts, Metrics
// --------------------------------------
// Numbers represent:
// - Wait times
// - Retry counts
// - Performance metrics

const timeout = 5000;           // milliseconds
const retryAttempts = 3;
const successRate = 98.5;

console.log(`Timeout set to ${timeout}ms`);
console.log(`Max retry attempts: ${retryAttempts}`);


// --------------------------------------
// 3. BOOLEAN – True / False Conditions
// --------------------------------------
// Booleans drive test flow and conditions:
// - Feature toggles
// - Assertions
// - Execution flags

const isHeadless = true;
const isElementVisible = false;
const testPassed = true;

console.log(`Headless mode enabled: ${isHeadless}`);


// --------------------------------------
// 4. UNDEFINED – Declared but No Value
// --------------------------------------
// Indicates a variable exists but has not
// been assigned any value yet.
// Often seen when elements are not initialized.

let submitButton;
console.log(submitButton); // undefined


// --------------------------------------
// 5. NULL – Intentionally Empty Value
// --------------------------------------
// Used when a value is deliberately cleared.
// Common in API testing and cleanup steps.

let apiResponse = null;
console.log(apiResponse); // null


// --------------------------------------
// 6. OBJECT – Group Related Configuration
// --------------------------------------
// Objects are the backbone of automation config:
// - Browser settings
// - Environment configuration
// - Test metadata

const testConfig = {
  browser: "chromium",
  headless: true,
  timeout: 30000,
  retries: 2,
  baseUrl: "https://example.com"
};

// Access object properties
console.log(testConfig.browser);
console.log(testConfig.timeout);


// --------------------------------------
// 7. ARRAY – Ordered Collections
// --------------------------------------
// Arrays are commonly used for:
// - Cross-browser testing
// - Iterating test data
// - Validation results

const browsers = ["chrome", "firefox", "safari"];
const testResults = ["pass", "pass", "fail"];

console.log(browsers[0]);        // chrome
console.log(browsers.length);   // total browsers


// --------------------------------------
// STRING OPERATIONS (Assertions & Logs)
// --------------------------------------
// Used heavily in validation and reporting

const pageTitle = "Shopping Cart - Amazon";

console.log(pageTitle.length);               // character count
console.log(pageTitle.includes("Cart"));     // assertion-style check
console.log(pageTitle.toUpperCase());
console.log(pageTitle.toLowerCase());


// --------------------------------------
// Dynamic Selector Creation
// --------------------------------------
// Dynamic selectors are required when IDs
// or attributes change based on runtime data

const userId = "12345";
const userSelector = `#user-${userId}`;

console.log(userSelector); // #user-12345


// --------------------------------------
// Dynamic Error Message (Real Automation)
// --------------------------------------
// Clear error messages improve debugging
// and test report readability

const elementName = "Submit Button";
const waitTime = 5000;

const errorMsg = `Element "${elementName}" not found within ${waitTime}ms`;
console.error(errorMsg);


