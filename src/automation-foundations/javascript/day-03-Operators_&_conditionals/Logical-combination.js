"use strict";

/*
  ======================================================
  DAY 03 – LOGICAL OPERATORS (AUTOMATION CONTEXT)
  ======================================================
  Operators covered:
  - AND (&&) - All conditions must be true
  - OR (||) - At least one condition must be true
  - NOT (!) - Inverts/reverses a boolean value

  Focus:
  - Safety checks before test execution
  - Permission logic for user actions
  - Environment-based execution rules
  - Retry & fallback logic
  
  What are Logical Operators?
  - Used to combine multiple boolean conditions
  - Return true or false based on the logic applied
  - Essential for complex decision-making in test automation
*/

// =====================================================
// AND (&&) OPERATOR
// =====================================================
// AND operator: ALL conditions must be true for overall result to be true
// If ANY condition is false, the entire expression is false
// Use case: When you need multiple requirements to be met simultaneously

const elementState = {
  isVisible: true,                         // Can the element be seen?
  isEnabled: true,                         // Is the element interactive?
  isStable: true                           // Is the element done moving/loading?
};

// ALL three conditions must be true to interact safely
// If even ONE is false, we should wait
if (elementState.isVisible && elementState.isEnabled && elementState.isStable) {
  // This block only runs if ALL conditions are true
  console.log("✅ Element ready – safe to interact");
} else {
  // This runs if ANY condition is false
  console.log("❌ Element not ready – waiting");
}

// Truth table for AND (&&):
// true && true = true
// true && false = false
// false && true = false
// false && false = false

// =====================================================
// OR (||) OPERATOR
// =====================================================
// OR operator: At least ONE condition must be true for overall result to be true
// Only returns false if ALL conditions are false
// Use case: When any of several conditions is acceptable

const operationStatus = "completed";       // Status returned from an operation

// Check if status matches ANY of the success states
// We accept "success", "completed", or "passed" as valid
if (
  operationStatus === "success" ||         // Is it "success"? OR...
  operationStatus === "completed" ||       // Is it "completed"? OR...
  operationStatus === "passed"             // Is it "passed"?
) {
  // Runs if ANY of the above conditions is true
  console.log("✅ Operation successful");
}

// Truth table for OR (||):
// true || true = true
// true || false = true
// false || true = true
// false || false = false (only case that's false)

// =====================================================
// NOT (!) OPERATOR
// =====================================================
// NOT operator: Reverses/inverts a boolean value
// true becomes false, false becomes true
// Use case: Checking if something is NOT true (safety guards, opposites)

const isProduction = false;                // Are we in production environment?

// The ! operator reverses the value
// !false becomes true, so this condition passes
if (!isProduction) {
  // This runs because we are NOT in production (isProduction is false)
  console.log("✅ Safe to run destructive tests (non-production)");
}

// Examples of NOT:
// !true = false
// !false = true
// !!true = true (double negative)

// =====================================================
// COMPLEX REAL-WORLD SAFETY CHECK
// =====================================================
// Combining multiple logical operators for comprehensive validation
// This pattern is common in test execution permission checks

const env = "staging";                     // Current environment
const userRole = "tester";                 // User's role/permission level
const testType = "load-testing";           // Type of test to run
const timeOfDay = "off-hours";             // Current time period

// Break down complex logic into readable boolean variables
// This makes the final condition much easier to understand

// Check 1: Is environment allowed? (staging OR dev)
const environmentAllowed = env === "staging" || env === "dev";

// Check 2: Is user role allowed? (admin OR tester)
const roleAllowed = userRole === "admin" || userRole === "tester";

// Check 3: Is timing allowed? (either NOT destructive, OR it's off-hours)
// Destructive tests are only allowed during off-hours
const timingAllowed = testType !== "destructive" || timeOfDay === "off-hours";

// Final check: ALL three conditions must pass
if (environmentAllowed && roleAllowed && timingAllowed) {
  // All safety checks passed - proceed with test
  console.log("✅ Test execution allowed");
} else {
  // At least one safety check failed - block execution
  console.log("❌ Test execution blocked – safety check failed");
}

// =====================================================
// PRACTICAL PATTERNS
// =====================================================
// Common patterns you'll use repeatedly in test automation

// Pattern 1: Element readiness check
// Verify element is in correct state before interaction
const uiElement = { 
  visible: true,                           // Element is rendered on page
  clickable: true,                         // Element can receive click events
  loading: false                           // Element is not in loading state
};

// Element is ready if: visible AND clickable AND NOT loading
if (uiElement.visible && uiElement.clickable && !uiElement.loading) {
  console.log("✅ UI element ready");
}

// Pattern 2: Safe default using nullish coalescing (BEST PRACTICE)
// Provide fallback values when data might be missing
const userConfig = null;                   // User config might not exist

// ?? operator: Use right side ONLY if left side is null or undefined
// Different from || which also treats 0, "", false as falsy
const browser = userConfig?.browser ?? "chrome";
console.log(`Using browser: ${browser}`); // Will use "chrome" as default

// Pattern 3: Skip test conditions
// Determine whether to skip a test based on environment or feature flags
const inProd = true;                       // Are we in production?
const featureEnabled = false;              // Is the feature we're testing enabled?

// Skip test if: in production OR feature is NOT enabled
if (inProd || !featureEnabled) {
  console.log("⏭️ Test skipped due to environment or feature flag");
}

// =====================================================
// ADDITIONAL REAL-WORLD SCENARIOS
// =====================================================
// More practical examples showing logical operators in action

// SCENARIO 1: Login validation
// All fields must be present and valid for login to proceed
const username = "john_doe";               // Username from input field
const password = "pass123";                // Password from input field
const captchaValid = true;                 // Captcha verification result

// Login requires: username exists AND password exists AND captcha is valid
if (username && password && captchaValid) {
  // All three are truthy (non-empty strings and true boolean)
  console.log("✅ Login validation passed");
} else {
  // At least one field is missing or invalid
  console.log("❌ Login validation failed");
}

// SCENARIO 2: API retry logic
// Decide whether to retry a failed API call
let apiRetry = 2;                          // Current retry attempt number
const apiMaxRetries = 3;                   // Maximum allowed retries
const networkError = true;                 // Was it a network error?

// Retry if: haven't exceeded max retries AND error is network-related
if (apiRetry < apiMaxRetries && networkError) {
  // Network errors are retryable and we have retries left
  console.log("🔁 Retrying API request");
} else if (apiRetry >= apiMaxRetries) {
  // Exhausted all retries
  console.log("❌ Max retries reached");
} else {
  // Not a network error - don't retry
  console.log("❌ Non-retryable error");
}

// SCENARIO 3: Permission checks
// Determine if user has permission to perform an action
const isAdmin = false;                     // Is user an administrator?
const isOwner = true;                      // Is user the content owner?
const canEdit = false;                     // Does user have explicit edit permission?

// User can edit if: admin OR owner OR has edit permission
// Only ONE of these needs to be true
if (isAdmin || isOwner || canEdit) {
  console.log("✅ User can edit content");
} else {
  // User has none of the required permissions
  console.log("❌ Edit permission denied");
}

// SCENARIO 4: Form validation
// Validate all form fields before submission
const email = "user@test.com";             // Email input value
const emailValid = email.includes("@");    // Simple email format check
const age = 25;                            // Age input value
const termsAccepted = true;                // Terms of service checkbox

// Form is valid if: email is valid AND age >= 18 AND terms accepted
// ALL conditions must be true
if (emailValid && age >= 18 && termsAccepted) {
  console.log("✅ Form valid – submitting");
} else {
  // One or more validation rules failed
  console.log("❌ Form validation failed");
}

// =====================================================
// SHORT-CIRCUIT EVALUATION
// =====================================================
// Logical operators "short-circuit" - they stop evaluating as soon as result is known
// This is a performance optimization and a useful pattern

// Expensive operation (database query, API call, complex calculation)
const expensiveCheck = () => {
  console.log("Running expensive check...");
  return true;
};

const quickFail = false;                   // Simple boolean check

// With AND (&&): If first condition is false, second is never evaluated
// This is called "short-circuit evaluation"
if (quickFail && expensiveCheck()) {
  console.log("Both checks passed");
}
// Output: Nothing!
// expensiveCheck() is NEVER called because quickFail is false
// Since quickFail is false, the entire AND expression must be false
// No need to check the second condition - saves time and resources

// Short-circuit rules:
// - AND (&&): Stops at first false value (because false && anything = false)
// - OR (||): Stops at first true value (because true || anything = true)

// Practical use cases:
// 1. Avoid null/undefined errors:
//    if (user && user.name) { } // Only checks user.name if user exists
//
// 2. Performance optimization:
//    if (cheapCheck() && expensiveCheck()) { } // Skip expensive check if cheap one fails
//
// 3. Conditional execution:
//    isLoggedIn && performAction() // Only perform action if logged in

// =====================================================
// COMBINING LOGICAL OPERATORS - PRECEDENCE
// =====================================================
// When mixing operators, understand precedence (order of evaluation)
// Precedence: ! (highest) > && > || (lowest)
// Use parentheses to make intent clear

const a = true;
const b = false;
const c = true;

// Without parentheses - can be confusing
const result1 = a || b && c;               // Evaluates as: a || (b && c)

// With parentheses - crystal clear
const result2 = (a || b) && c;             // Explicitly grouped
const result3 = a || (b && c);             // Explicitly grouped

console.log("\n=== Operator Precedence ===");
console.log({ result1, result2, result3 });

// Best practice: Always use parentheses for complex conditions
// Makes code more readable and prevents bugs

// =====================================================
// FINAL TAKEAWAY
// =====================================================
/*
  KEY CONCEPTS:
  
  AND (&&) - "All conditions must pass"
  - Use when you need multiple requirements simultaneously
  - Returns true only if ALL conditions are true
  - Common uses: Safety checks, multi-field validation, permission checks
  
  OR (||) - "Any condition can pass"
  - Use when any of several conditions is acceptable
  - Returns true if AT LEAST ONE condition is true
  - Common uses: Multiple valid states, fallback options, permission alternatives
  
  NOT (!) - "Opposite/Inverse"
  - Use to check if something is NOT true
  - Reverses boolean values (true ↔ false)
  - Common uses: Safety guards (!isProduction), negation checks (!hasErrors)
  
  SHORT-CIRCUIT EVALUATION:
  - Operators stop as soon as result is known
  - AND stops at first false, OR stops at first true
  - Use to optimize performance and avoid errors
  
  BEST PRACTICES:
  1. Break complex conditions into named boolean variables
     - Makes code self-documenting and easier to debug
  2. Use parentheses to clarify precedence
     - Don't rely on memorizing operator precedence
  3. Put simple/cheap checks first
     - Take advantage of short-circuiting
  4. Keep individual conditions simple
     - Each condition should test ONE thing
  5. Use consistent naming for boolean variables
     - Prefix with is/has/can/should (e.g., isValid, hasPermission)
  
  COMMON AUTOMATION PATTERNS:
  - Element state validation (visible && enabled && !loading)
  - Permission checks (isAdmin || isOwner || canEdit)
  - Environment guards (!isProduction && canRunTest)
  - Retry logic (retries < max && isRetryableError)
  - Multi-field validation (field1 && field2 && field3)
  - Skip conditions (inProd || !featureEnabled)
  
  DEBUGGING TIPS:
  - Log individual conditions to see which one fails
  - Use descriptive variable names for boolean values
  - Test edge cases (all true, all false, mixed)
  - Watch out for truthy/falsy values (0, "", null, undefined)
*/