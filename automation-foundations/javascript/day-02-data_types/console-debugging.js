// ======================================
// Day 02 – Logging & Debugging Basics
// File: logging-basics.js
// Purpose: Demonstrate effective logging
//          techniques used in automation
//          for debugging and reporting
// ======================================


// ----------------------------
// 1. Basic Logging
// ----------------------------
// console.log is commonly used to trace
// test execution flow during debugging

console.log("Test started");


// ----------------------------
// 2. Logging Multiple Values
// ----------------------------
// Useful when inspecting variables or
// validating runtime data

const user = "test@email.com";
const pass = "secret123"; 
//  Never log real passwords in production

console.log("Credentials:", user, pass);


// ----------------------------
// 3. Template Literals (Clean Logs)
// ----------------------------
// Template literals improve readability
// and are widely used in automation logs

console.log(`Logging in with user: ${user}`);


// ----------------------------
// 4. Log Types by Severity
// ----------------------------
// Different log levels help classify messages
// when reviewing logs in CI/CD pipelines

console.log("✓ INFO: Step executed successfully");
console.warn("⚠ WARN: Optional field missing");
console.error("✗ ERROR: Login failed");


// ----------------------------
// 5. Table Logging (Structured Output)
// ----------------------------
// console.table is useful for visualizing
// test results, API responses, or datasets

const results = [
  { test: "Login", status: "Pass", time: "2.3s" },
  { test: "Search", status: "Pass", time: "1.5s" },
  { test: "Checkout", status: "Fail", time: "0.5s" }
];

console.table(results);


// ----------------------------
// 6. Performance Timing
// ----------------------------
// Used to measure execution time of
// specific test steps or flows

console.time("Login Test");

// Simulated test steps
for (let i = 0; i < 1_000_000; i++) {}

console.timeEnd("Login Test");


// ----------------------------
// End of Day 02 – Logging & Debugging
// ----------------------------
