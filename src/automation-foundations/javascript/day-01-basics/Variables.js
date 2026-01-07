// =====================================
// Day 01 - JavaScript Variables
// File: variables.js
// Scope: ONLY variables (no logic, no functions)
// Purpose: Understand how variables are used
//          in real-world automation frameworks
// =====================================

// -------------------------------------
// 1. const → Fixed / Read-only values
// -------------------------------------
// const is used when the value should NEVER change
// during test execution. This improves stability
// and prevents accidental reassignment.

// ---------- Application & Environment ----------
// URLs are constant across test runs
const BASE_URL = "https://www.saucedemo.com";
const LOGIN_PAGE_URL = "https://www.saucedemo.com/";
const DASHBOARD_PAGE_URL = "https://www.saucedemo.com/inventory.html";

// ---------- Credentials (Never Mutate) ----------
// In real projects, credentials come from env/config files
// Hardcoding is ONLY for learning purposes
const USER_EMAIL = "shubhampanigrahi@gmail.com";
const USER_PASSWORD = "1234@#"; // ❌ Never hardcode in production

// ---------- UI Selectors ----------
// Selectors should be constant because they represent
// stable identifiers used across multiple tests
const USERNAME_INPUT_SELECTOR = "#user-name";
const PASSWORD_INPUT_SELECTOR = "#password";
const LOGIN_BUTTON_SELECTOR = "#login-button";
const LOGOUT_BUTTON_SELECTOR = "#logout_sidebar_link";

// ---------- Timeouts & Limits ----------
// Centralizing timeouts avoids magic numbers
// and makes maintenance easier
const DEFAULT_TIMEOUT_MS = 30000;      // General wait time
const PAGE_LOAD_TIMEOUT_MS = 15000;    // Page load specific
const MAX_RETRY_COUNT = 3;             // Retry flaky steps

// ---------- Test Metadata ----------
// Metadata helps in reporting and debugging
const PROJECT_NAME = "Test Automation Practice";
const TEST_SUITE_NAME = "Login Flow";
const BROWSER_NAME = "Chromium";

// -------------------------------------
// 2. let → Mutable / Runtime values
// -------------------------------------
// let is used when the value WILL change
// during test execution.

// ---------- Test Execution Status ----------
let testStatus = "NOT_STARTED";  // NOT_STARTED | PASSED | FAILED
let isTestCompleted = false;

// ---------- Authentication State ----------
// These values change based on login result
let isUserLoggedIn = false;
let loggedInUserName = "";

// ---------- Navigation Tracking ----------
// Useful for debugging failures and navigation flow
let currentPageName = "LOGIN_PAGE";
let previousPageName = "";

// ---------- Counters ----------
// Used for retry logic and step tracking
let retryCount = 0;
let stepNumber = 1;

// ---------- Dynamic Data Placeholders ----------
// Values generated or captured during runtime
let generatedOrderId = null;
let capturedErrorMessage = "";

// ---------- Timing Values ----------
// Used for performance tracking and reporting
let testStartTime = null;
let testEndTime = null;

// -------------------------------------
// 3. var → Legacy (Avoid using)
// -------------------------------------
// var has function/global scope issues and can
// cause unpredictable bugs in automation frameworks
// Included ONLY for learning and comparison
var legacyVariableExample = "Avoid var in automation";

// -------------------------------------
// 4. Safe Variable Access & Logging
// -------------------------------------
// Logging is useful for debugging test flow
// but sensitive data must never be logged

console.log("Project Name:", PROJECT_NAME);
console.log("Test Suite:", TEST_SUITE_NAME);
console.log("Browser:", BROWSER_NAME);
console.log("Base URL:", BASE_URL);
console.log("Test Status:", testStatus);
console.log("Retry Count:", retryCount);
console.log("Current Page:", currentPageName);

// ❌ Never log passwords or secrets in real projects
// console.log(USER_PASSWORD);
