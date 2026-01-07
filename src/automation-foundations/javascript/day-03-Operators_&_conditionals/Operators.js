"use strict";

/*
  ======================================================
  DAY 03 – OPERATORS IN JAVASCRIPT (AUTOMATION CONTEXT)
  ======================================================
  Purpose:
  - Understand operators through REAL automation examples
  - Focus on timeouts, retries, validations, conditions
  
  What are Operators?
  - Operators are symbols that perform operations on values and variables
  - They are fundamental building blocks in programming
  - In automation, we use them for calculations, comparisons, and logic
*/

// =====================================================
// ARITHMETIC OPERATORS
// =====================================================
// Used for mathematical calculations - very common in automation
// for calculating timeouts, averages, totals, etc.

// Addition (+) - Adds two values together
const totalTests = 10 + 5;                 // 15 tests - combining test counts
const extendedTimeout = 3000 + 2000;       // 5000 ms - adding extra wait time to base timeout

// Subtraction (-) - Subtracts one value from another
const remainingTests = 20 - 3;             // 17 tests - calculating how many tests are left
const testsLeft = 50 - 12;                 // 38 tests - after some tests have run

// Multiplication (*) - Multiplies two values
const totalTimeInSeconds = 5 * 60;         // 300 seconds - converting 5 minutes to seconds
const threeHoursInMs = 3 * 60 * 60 * 1000; // Converting 3 hours to milliseconds (3 × 60 min × 60 sec × 1000 ms)

// Division (/) - Divides one value by another
const avgTimePerTest = 300 / 10;           // 30 sec/test - finding average time per test
const halfTimeout = 6000 / 2;              // 3000 ms - reducing timeout by half

// Modulus (%) - Returns the remainder after division
const remainder = 10 % 3;                  // 1 - because 10 ÷ 3 = 3 remainder 1
const isEven = 8 % 2 === 0;                // true - even numbers have no remainder when divided by 2
const isOdd = 7 % 2 !== 0;                 // true - odd numbers have remainder of 1 when divided by 2

console.log("=== Arithmetic Operators ===");
console.log({ totalTests, extendedTimeout, remainingTests, testsLeft });
console.log({ totalTimeInSeconds, threeHoursInMs, avgTimePerTest, halfTimeout });
console.log({ remainder, isEven, isOdd });

// =====================================================
// ASSIGNMENT OPERATORS
// =====================================================
// These operators assign values to variables and perform operations at the same time
// Very useful for updating counters, timeouts, and other values in loops

let retryCount = 1;                        // Initial retry count
retryCount += 1;   // Same as: retryCount = retryCount + 1 → 2 (add and assign)
retryCount += 3;   // Add 3 to current value → 5
retryCount -= 1;   // Same as: retryCount = retryCount - 1 → 4 (subtract and assign)
retryCount -= 2;   // Subtract 2 from current value → 2
retryCount *= 3;   // Same as: retryCount = retryCount * 3 → 6 (multiply and assign)
retryCount /= 3;   // Same as: retryCount = retryCount / 3 → 2 (divide and assign)

let waitTime = 1000;                       // Initial wait time in milliseconds
waitTime *= 2;     // Double the wait time → 2000 ms (exponential backoff strategy)

let timeout = 10000;                       // Initial timeout value
timeout /= 2;      // Reduce timeout by half → 5000 ms

console.log("\n=== Assignment Operators ===");
console.log({ retryCount, waitTime, timeout });

// =====================================================
// COMPARISON OPERATORS (STRICT ONLY – BEST PRACTICE)
// =====================================================
// Used to compare values and return true or false
// ALWAYS use strict comparison (===, !==) to avoid type coercion bugs
// In automation, used for validating status codes, response times, element counts, etc.

console.log("\n=== Comparison Operators ===");
console.log(5 === 5);           // true - strict equality (checks value AND type)
console.log(5 !== "5");         // true - strict inequality (5 number is not equal to "5" string)
console.log(10 > 5);            // true - greater than (useful for threshold checks)
console.log(5 >= 5);            // true - greater than or equal to
console.log(3 < 10);            // true - less than (checking if value is below limit)
console.log(10 <= 3);           // false - less than or equal to

// =====================================================
// LOGICAL OPERATORS
// =====================================================
// Used to combine multiple conditions
// Critical for complex validation logic in automation tests

const isLoggedIn = true;                   // User authentication status
const isAdmin = false;                     // Admin privilege flag
const hasPermission = true;                // Specific permission flag

// AND (&&) - ALL conditions must be true
// User can edit if logged in AND (is admin OR has permission)
const canEdit = isLoggedIn && (isAdmin || hasPermission);

// OR (||) - At least ONE condition must be true
// NOT (!) - Reverses boolean value (true becomes false, false becomes true)
// Block user if NOT logged in OR (does NOT have permission AND is NOT admin)
const shouldBlock = !isLoggedIn || (!hasPermission && !isAdmin);

console.log("\n=== Logical Operators ===");
console.log({ canEdit, shouldBlock });

// =====================================================
// INCREMENT & DECREMENT
// =====================================================
// Shorthand for adding or subtracting 1
// Commonly used in loops and counters

let attempt = 0;                           // Initialize attempt counter
attempt++;                                 // Increment by 1 → 1 (same as attempt = attempt + 1)
attempt++;                                 // Increment by 1 → 2
attempt--;                                 // Decrement by 1 → 1 (same as attempt = attempt - 1)
attempt++;                                 // Increment by 1 → 2

// Post-increment (x++) - uses current value THEN increments
let x = 5;
let y = x++;                               // y gets 5, then x becomes 6

// Pre-increment (++x) - increments FIRST then uses new value
let a = 5;
let b = ++a;                               // a becomes 6 first, then b gets 6

console.log("\n=== Increment / Decrement ===");
console.log({ attempt, x, y, a, b });      // x=6, y=5, a=6, b=6

// =====================================================
// TERNARY OPERATOR (VERY IMPORTANT IN AUTOMATION)
// =====================================================
// Shorthand for if-else statements
// Syntax: condition ? valueIfTrue : valueIfFalse
// Extremely useful for inline conditional assignments in test automation

// Simple ternary - checking performance threshold
const responseTime = 2.5;                  // API response time in seconds
const performanceStatus =
  responseTime <= 3 ? "✓ Performance OK" : "✗ Performance Slow";

// Validating API status code
const statusCode = 200;                    // HTTP status code
const apiMessage = statusCode === 200 ? "Success" : "Failure";

// Age verification
const age = 17;                            // User age
const access = age >= 18 ? "Allowed" : "Denied";

// Nested ternary - multiple conditions (use sparingly for readability)
// Assigning grade based on score ranges
const score = 85;
const grade =
  score >= 90 ? "A" :                      // If 90+, grade is A
  score >= 80 ? "B" :                      // Else if 80+, grade is B
  score >= 70 ? "C" : "F";                 // Else if 70+, grade is C, otherwise F

console.log("\n=== Ternary Operator ===");
console.log({ performanceStatus, apiMessage, access, grade });

// =====================================================
// TYPE OPERATORS
// =====================================================
// Used to check the type of a value or if an object is an instance of a class
// Important for validation and debugging in automation

const arr = [];                            // Empty array
const date = new Date();                   // Date object

console.log("\n=== Type Operators ===");
console.log(typeof "hello");               // "string" - checks primitive type
console.log(typeof 100);                   // "number" - numeric type
console.log(typeof true);                  // "boolean" - true/false type
console.log(typeof undefined);             // "undefined" - variable not assigned
console.log(typeof null);                  // "object" - this is a known JavaScript quirk/bug
console.log(arr instanceof Array);         // true - checks if arr is an Array instance
console.log(date instanceof Date);         // true - checks if date is a Date instance

// =====================================================
// REAL-WORLD AUTOMATION SCENARIOS
// =====================================================
// Practical examples showing how operators are used in actual test automation

// SCENARIO 1: Retry mechanism
// Automatically retry failed operations (common in flaky tests or network calls)
let retries = 0;                           // Initialize retry counter
const maxRetries = 3;                      // Maximum number of retry attempts

console.log("\n=== Retry Simulation ===");
while (retries < maxRetries) {             // Loop while retries is less than max
  console.log(`Attempt ${retries + 1}`);   // Display current attempt (1-based for readability)
  retries++;                               // Increment retry counter
}

// SCENARIO 2: API validation
// Check if API response meets health criteria (status code AND response time)
const apiStatusCode = 200;                 // HTTP 200 means success
const apiResponseTime = 2.1;               // Response time in seconds

// Both conditions must be true for API to be considered healthy
if (apiStatusCode === 200 && apiResponseTime <= 3) {
  console.log("✓ API healthy");            // API passes both checks
} else {
  console.log("✗ API issue detected");     // API fails one or both checks
}

// SCENARIO 3: Conditional logging
// Generate different messages based on test results
const failedTests = 5;                     // Number of failed tests

// Use ternary to create appropriate summary message
const summary =
  failedTests === 0
    ? "All tests passed 🎉"                // If no failures, celebrate
    : `${failedTests} test(s) failed ❌`;  // Otherwise, report number of failures

console.log(summary);

// SCENARIO 4: Dynamic timeout
// Adjust timeout value based on previous response time
// If API is slow, use longer timeout to prevent false failures
const dynamicTimeout =
  apiResponseTime > 5 ? 10000 : 5000;      // If slow (>5s), use 10s timeout, else use 5s

console.log("Dynamic Timeout:", dynamicTimeout);

/*
  ======================================================
  KEY TAKEAWAYS FOR AUTOMATION TESTING:
  ======================================================
  
  1. Arithmetic operators: Calculate timeouts, averages, totals
  2. Assignment operators: Update counters and values efficiently
  3. Comparison operators: Validate responses, status codes, element counts
  4. Logical operators: Combine conditions for complex validations
  5. Ternary operator: Quick inline decisions for pass/fail status
  6. Type operators: Verify data types before operations
  
  Common Patterns:
  - Use % for even/odd checks or rotating through options
  - Use ternary for quick status messages
  - Use logical operators for permission/validation checks
  - Use comparison for threshold validation (timeouts, response times)
  - Use arithmetic for time conversions and calculations
  
  Best Practices:
  - Always use strict comparison (===, !==)
  - Keep ternary operators simple (avoid deep nesting)
  - Use meaningful variable names for readability
  - Comment complex logical conditions
*/