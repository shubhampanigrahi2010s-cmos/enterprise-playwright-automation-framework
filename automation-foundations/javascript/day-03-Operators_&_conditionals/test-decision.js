"use strict";

/*
  ======================================================
  DAY 03 – CONDITIONALS (AUTOMATION CONTEXT)
  ======================================================
  Focus:
  - if / else logic
  - decision making in tests
  - real-world automation scenarios
  
  What are Conditionals?
  - Conditionals allow your code to make decisions
  - They execute different code blocks based on whether conditions are true or false
  - Essential for test automation: validating results, handling errors, branching logic
*/

// =====================================================
// SIMPLE IF
// =====================================================
// The most basic conditional - executes code only if condition is true
// Syntax: if (condition) { code to execute }

const testPassed = true;                   // Boolean flag indicating test result

// If condition is true, the code block executes
if (testPassed) {
  console.log("✅ Test passed – proceeding to next step");
}
// If testPassed is false, nothing happens and code continues

// =====================================================
// IF / ELSE
// =====================================================
// Provides an alternative action when condition is false
// Syntax: if (condition) { do this } else { do that }

const elementVisible = false;              // Flag for element visibility check

// Choose one of two paths based on condition
if (elementVisible) {
  // This block runs if elementVisible is true
  console.log("✅ Element visible – clicking element");
} else {
  // This block runs if elementVisible is false
  console.log("❌ Element not visible – capturing screenshot");
}
// Exactly ONE of these blocks will execute, never both

// =====================================================
// IF / ELSE IF / ELSE
// =====================================================
// Multiple conditions checked in order until one is true
// Syntax: if (cond1) {...} else if (cond2) {...} else {...}

const browser = "chrome";                  // Browser type for test execution

// Checks conditions from top to bottom, stops at first true condition
if (browser === "chrome") {
  // First check - is it Chrome?
  console.log("Running Chrome-specific setup");
} else if (browser === "firefox") {
  // Second check - only evaluated if first was false
  console.log("Running Firefox-specific setup");
} else if (browser === "safari") {
  // Third check - only evaluated if previous checks were false
  console.log("Running Safari-specific setup");
} else {
  // Default fallback - runs if all above conditions are false
  console.log("⚠️ Unsupported browser – using defaults");
}

// =====================================================
// NESTED CONDITIONS (CONTROLLED USE)
// =====================================================
// Avoid deep nesting - use guard clauses or early returns instead
// This example shows FLAT conditionals (best practice)

const isLoggedIn = true;                   // User authentication status
const userRole = "admin";                  // User permission level
const environment = "staging";             // Current test environment

// GUARD CLAUSE PATTERN - check failure conditions first
if (!isLoggedIn) {
  // Exit early if user not logged in
  console.log("❌ User not logged in – redirecting to login");
} else if (userRole !== "admin") {
  // Check permissions next
  console.log("⚠️ Limited access – admin permissions required");
} else if (environment === "production") {
  // Environment safety check
  console.log("⚠️ Admin tests blocked in production");
} else {
  // All validations passed - proceed with test
  console.log("✅ Admin tests allowed in non-production environment");
}

// =====================================================
// TERNARY OPERATOR
// =====================================================
// Shorthand for simple if/else assignments
// Syntax: condition ? valueIfTrue : valueIfFalse
// Use for simple cases only - complex logic should use if/else

const score = 85;                          // Test score value
// Inline conditional assignment - more concise than if/else
const result = score >= 70 ? "Pass" : "Fail";
console.log(`Score: ${score} | Result: ${result}`);

const elementExists = true;                // Element existence flag
// Determining which action to take based on condition
const action = elementExists ? "click()" : "logError()";
console.log(`Action: ${action}`);

// =====================================================
// REAL-WORLD SCENARIOS
// =====================================================
// Practical examples showing conditionals in test automation

// SCENARIO 1: API validation (GUARD STYLE)
// Validate multiple aspects of an API response
const statusCode = 200;                    // HTTP status code from response
const responseTime = 2.5;                  // Response time in seconds
const hasData = true;                      // Whether response contains data

// Check each validation criterion in order
// Exit as soon as any validation fails (fail-fast approach)
if (statusCode !== 200) {
  // First check: Is status code correct?
  console.log("❌ Invalid status code");
} else if (responseTime > 3) {
  // Second check: Is response time acceptable?
  console.log("⚠️ API response too slow");
} else if (!hasData) {
  // Third check: Does response contain data?
  console.log("❌ Response has no data");
} else {
  // All validations passed
  console.log("✅ API validation passed");
}

// SCENARIO 2: Retry decision
// Decide whether to retry a failed operation
const retryCount = 2;                      // Current number of retries
const maxRetries = 3;                      // Maximum allowed retries

// Check if we haven't exceeded retry limit
if (retryCount < maxRetries) {
  // Still have retries left - try again
  console.log(`🔁 Retrying… attempt ${retryCount + 1}`);
} else {
  // Exhausted all retries - give up
  console.log("❌ Max retries reached – failing test");
}

// SCENARIO 3: Environment-based configuration (READABLE)
// Configure different URLs based on environment
const env = "staging";                     // Current environment name
let baseURL;                               // Variable to store selected URL

// Switch is cleaner than if/else for multiple exact-match comparisons
switch (env) {
  case "production":
    // Production environment configuration
    baseURL = "https://api.prod.com";
    break;                                 // Exit switch after match
  case "staging":
    // Staging environment configuration
    baseURL = "https://api.staging.com";
    break;                                 // Break prevents fall-through
  default:
    // Default case handles all other values
    baseURL = "https://api.dev.com";
    // No break needed on last case
}

console.log(`Using API: ${baseURL}`);

// SCENARIO 4: Complex validation
// Multi-step eligibility check (e.g., for user permissions)
const age = 25;                            // User's age
const hasLicense = true;                   // Whether user has license
const hasInsurance = false;                // Whether user has insurance

// Check each requirement in logical order
if (age < 18) {
  // Age is the first requirement
  console.log("❌ Underage – cannot drive");
} else if (!hasLicense) {
  // Must have license (checked only if age check passed)
  console.log("❌ No driving license");
} else if (!hasInsurance) {
  // Must have insurance (checked only if previous checks passed)
  console.log("❌ Insurance missing");
} else {
  // All requirements met
  console.log("✅ Eligible to drive");
}

// =====================================================
// SWITCH STATEMENT
// =====================================================
// Best for checking one variable against multiple exact values
// More readable than if/else when you have many cases

const testStatus = "passed";               // Current status of a test

// Switch compares testStatus to each case value
switch (testStatus) {
  case "passed":
    // Executes if testStatus === "passed"
    console.log("✅ Test passed");
    break;                                 // IMPORTANT: break exits switch
  case "failed":
    // Executes if testStatus === "failed"
    console.log("❌ Test failed");
    break;                                 // Without break, code "falls through" to next case
  case "skipped":
    // Executes if testStatus === "skipped"
    console.log("⏭️ Test skipped");
    break;
  default:
    // Executes if no case matches (like else in if/else)
    console.log("⚠️ Unknown test status");
    // No break needed on last case/default
}

// =====================================================
// GUARD CLAUSES (BEST PRACTICE)
// =====================================================
// Check for invalid conditions first and exit early
// Avoids deep nesting and makes code more readable
// Also called "early returns" or "fail-fast" pattern

/**
 * Validates a user object
 * @param {Object} user - User object to validate
 * @returns {boolean} - True if valid, false if invalid
 */
function validateUser(user) {
  // GUARD CLAUSE 1: Check if user object exists
  if (!user) {
    console.log("❌ User object missing");
    return false;                          // Exit immediately if no user object
  }
  
  // GUARD CLAUSE 2: Check if name property exists
  if (!user.name) {
    console.log("❌ User name missing");
    return false;                          // Exit early if name missing
  }
  
  // GUARD CLAUSE 3: Check if email property exists
  if (!user.email) {
    console.log("❌ User email missing");
    return false;                          // Exit early if email missing
  }

  // All validations passed - this is the "happy path"
  console.log("✅ User validation passed");
  return true;
}

// Test the function with valid and invalid inputs
validateUser({ name: "John", email: "john@test.com" }); // Should pass
validateUser({ name: "Jane" });            // Should fail - missing email

/*
  ======================================================
  KEY TAKEAWAYS FOR AUTOMATION TESTING:
  ======================================================
  
  1. Simple if: Use when you only need to do something if condition is true
  2. if/else: Use when you need one of two paths
  3. if/else if/else: Use for multiple mutually exclusive conditions
  4. Switch: Use for multiple exact-value comparisons of one variable
  5. Ternary: Use for simple inline conditional assignments
  6. Guard clauses: Check failure conditions first and exit early
  
  Best Practices:
  - Keep conditions simple and readable
  - Avoid deep nesting (max 2-3 levels)
  - Use guard clauses to exit early
  - Use switch for multiple exact matches
  - Always use strict equality (===) in conditions
  - Put most likely conditions first for performance
  - Use meaningful variable names for boolean flags
  
  Common Test Automation Uses:
  - Validating API responses (status codes, data presence)
  - Deciding whether to retry failed operations
  - Handling different browsers/environments
  - Checking element states (visible, enabled, etc.)
  - Determining test pass/fail status
  - Conditional test execution based on environment
  - Error handling and fallback logic
  
  Anti-patterns to Avoid:
  - Deeply nested if statements (use guard clauses instead)
  - Complex ternary operators (use if/else instead)
  - Missing else clauses when you need default behavior
  - Forgetting break in switch statements (causes fall-through bugs)
  - Using == instead of === (causes type coercion issues)
*/