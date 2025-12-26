"use strict";

/*
  ======================================================
  TEST SCORE CALCULATOR (NO LOOPS - DAY 03 SAFE)
  ======================================================
  
  Purpose:
  - Demonstrate conditional logic without loops (Day 03 appropriate)
  - Calculate test scores and identify performance issues
  - Generate automated test reports with actionable insights
  
  What this program does:
  1. Evaluates 4 test cases (each worth 25 points)
  2. Checks if each test passed/failed
  3. Identifies performance problems (tests taking too long)
  4. Calculates final score percentage
  5. Provides status report with recommendations
  
  Real-world application:
  - This mimics how test frameworks generate reports
  - Shows decision-making logic for test results
  - Demonstrates problem tracking and categorization
*/

console.log("TEST REPORT CARD\n");

// =====================================================
// TEST DATA SETUP
// =====================================================
// Each test is an object containing all relevant information
// In real automation, this data would come from test execution

// Test 1: Login functionality
const test1 = { 
  name: "Login",                           // Descriptive test name
  passed: true,                            // Did the test pass? (boolean)
  points: 25,                              // Points awarded if passed
  time: 2.1                                // Execution time in seconds
};

// Test 2: Shopping cart functionality
const test2 = { 
  name: "Add to Cart", 
  passed: true, 
  points: 25, 
  time: 1.5                                // Fast execution (under 3 seconds)
};

// Test 3: Checkout process (FAILING TEST)
const test3 = { 
  name: "Checkout", 
  passed: false,                           // This test failed!
  points: 25, 
  time: 5.2                                // Slow execution (over 3 seconds)
};

// Test 4: Payment processing
const test4 = { 
  name: "Payment", 
  passed: true, 
  points: 25, 
  time: 3.1                                // Slightly slow (just over threshold)
};

// =====================================================
// TRACKING VARIABLES
// =====================================================
// Variables to accumulate data across all test evaluations

let score = 0;                             // Total points earned (starts at 0)
let problemCount = 0;                      // Number of issues detected

// Separate variables to store problem descriptions
// We use 3 variables because we don't know loops yet (Day 03)
let problem1 = "";                         // First problem description
let problem2 = "";                         // Second problem description
let problem3 = "";                         // Third problem description

// Performance threshold - tests slower than this are flagged
const MAX_TIME = 3.0;                      // Maximum acceptable time in seconds

// =====================================================
// TEST 1 EVALUATION
// =====================================================
console.log("--- Evaluating Test 1: Login ---");

if (test1.passed) {
  // Test PASSED - award points
  score += test1.points;                   // Add 25 points to score (0 + 25 = 25)
  console.log(`PASS ${test1.name}: +${test1.points} points (${test1.time}s)`);

  // Even if test passed, check if it was too slow
  if (test1.time > MAX_TIME) {
    problemCount++;                        // Increment problem counter
    problem1 = `${test1.name} is slow (${test1.time}s)`; // Record the problem
  }
} else {
  // Test FAILED - no points awarded
  console.log(`FAIL ${test1.name}: FAILED`);
  problemCount++;                          // Count this as a problem
  problem1 = `${test1.name} failed completely`; // Record failure
}

// =====================================================
// TEST 2 EVALUATION
// =====================================================
console.log("--- Evaluating Test 2: Add to Cart ---");

if (test2.passed) {
  // Test PASSED - award points
  score += test2.points;                   // Add 25 points (25 + 25 = 50)
  console.log(`PASS ${test2.name}: +${test2.points} points (${test2.time}s)`);

  // Check performance
  if (test2.time > MAX_TIME) {
    problemCount++;
    // Check if problem1 is already used
    if (problem1 === "") {
      // problem1 is empty, use it
      problem1 = `${test2.name} is slow (${test2.time}s)`;
    } else {
      // problem1 is taken, use problem2
      problem2 = `${test2.name} is slow (${test2.time}s)`;
    }
  }
} else {
  // Test FAILED
  console.log(`FAIL ${test2.name}: FAILED`);
  problemCount++;
  // Find the first available problem slot
  if (problem1 === "") {
    problem1 = `${test2.name} failed completely`;
  } else {
    problem2 = `${test2.name} failed completely`;
  }
}

// =====================================================
// TEST 3 EVALUATION
// =====================================================
console.log("--- Evaluating Test 3: Checkout ---");

if (test3.passed) {
  // Test PASSED - award points
  score += test3.points;                   // Would add 25 points
  console.log(`PASS ${test3.name}: +${test3.points} points (${test3.time}s)`);

  // Check performance
  if (test3.time > MAX_TIME) {
    problemCount++;
    // Need to check TWO problem slots now (problem1 and problem2)
    if (problem1 === "") {
      problem1 = `${test3.name} is slow (${test3.time}s)`;
    } else if (problem2 === "") {
      problem2 = `${test3.name} is slow (${test3.time}s)`;
    } else {
      // Both problem1 and problem2 are taken, use problem3
      problem3 = `${test3.name} is slow (${test3.time}s)`;
    }
  }
} else {
  // Test FAILED - this will execute for test3
  console.log(`FAIL ${test3.name}: FAILED`);
  problemCount++;                          // problemCount becomes 1
  // Store failure in first available slot
  if (problem1 === "") {
    problem1 = `${test3.name} failed completely`;
  } else if (problem2 === "") {
    problem2 = `${test3.name} failed completely`;
  } else {
    problem3 = `${test3.name} failed completely`;
  }
}

// =====================================================
// TEST 4 EVALUATION
// =====================================================
console.log("--- Evaluating Test 4: Payment ---");

if (test4.passed) {
  // Test PASSED - award points
  score += test4.points;                   // Add 25 points (50 + 25 = 75)
  console.log(`PASS ${test4.name}: +${test4.points} points (${test4.time}s)`);

  // Check performance - test4.time is 3.1, which is > 3.0
  if (test4.time > MAX_TIME) {
    problemCount++;                        // problemCount becomes 2
    // Check all THREE problem slots
    if (problem1 === "") {
      problem1 = `${test4.name} is slow (${test4.time}s)`;
    } else if (problem2 === "") {
      problem2 = `${test4.name} is slow (${test4.time}s)`;
    } else if (problem3 === "") {
      // problem1 and problem2 are taken, use problem3
      problem3 = `${test4.name} is slow (${test4.time}s)`;
    }
    // If all 3 slots are full, we can't record more problems (Day 03 limitation)
  }
} else {
  // Test FAILED
  console.log(`FAIL ${test4.name}: FAILED`);
  problemCount++;
  // Find first available problem slot
  if (problem1 === "") {
    problem1 = `${test4.name} failed completely`;
  } else if (problem2 === "") {
    problem2 = `${test4.name} failed completely`;
  } else if (problem3 === "") {
    problem3 = `${test4.name} failed completely`;
  }
}

// =====================================================
// FINAL SCORE CALCULATION
// =====================================================
// Each test is worth 25 points, so 4 tests = 100 points total
// Final score after all tests: 75 points (test3 failed)

const percentage = score;                  // score is already out of 100

console.log("\n" + "-".repeat(40));        // Visual separator (40 dashes)
console.log(`Final Score: ${percentage}% (need 80% to pass)`);

// =====================================================
// PROBLEM REPORT
// =====================================================
// Display all detected problems if any exist

if (problemCount > 0) {
  console.log("\nWARNING: Problems Found:");
  
  // Only display problems that have been recorded (non-empty strings)
  if (problem1 !== "") console.log(`  1. ${problem1}`);
  if (problem2 !== "") console.log(`  2. ${problem2}`);
  if (problem3 !== "") console.log(`  3. ${problem3}`);
}
// Expected output:
// 1. Checkout failed completely
// 2. Payment is slow (3.1s)

// =====================================================
// FINAL DECISION LOGIC
// =====================================================
// Determine overall test suite status and provide recommendations

console.log("\n" + "-".repeat(40));

// Decision tree based on score and problem count
if (percentage >= 80 && problemCount === 0) {
  // Perfect run: High score AND no problems
  console.log("STATUS: PERFECT!");
} else if (percentage >= 80 && problemCount > 0) {
  // Good score but with warnings (e.g., slow tests)
  console.log("STATUS: PASSED WITH WARNINGS");
} else {
  // Failed: Score is below 80%
  console.log("STATUS: FAILED");

  // ===== INTELLIGENT DIAGNOSTICS =====
  // Provide specific recommendations based on which tests failed
  
  // Check if Checkout test is one of the problems
  // We need to check all three problem slots since we don't know which one contains it
  if (
    problem1.includes("Checkout") ||       // Is Checkout mentioned in problem1?
    problem2.includes("Checkout") ||       // Is Checkout mentioned in problem2?
    problem3.includes("Checkout")          // Is Checkout mentioned in problem3?
  ) {
    // Checkout failed - provide specific fix suggestion
    console.log("FIX: Checkout issue detected - verify payment gateway");
  }

  // Check if multiple problems exist (indicates systemic issues)
  if (problemCount > 1) {
    // Multiple failures suggest fixing them one at a time
    console.log("FIX: Multiple issues detected - fix sequentially");
  }
}

console.log("-".repeat(40));               // Final separator

/*
  =====================================================
  FINAL RESULTS FOR THIS EXAMPLE:
  =====================================================
  
  Score Breakdown:
  - Test 1 (Login): PASSED -> +25 points
  - Test 2 (Add to Cart): PASSED -> +25 points
  - Test 3 (Checkout): FAILED -> +0 points
  - Test 4 (Payment): PASSED -> +25 points
  
  Total Score: 75/100 (75%)
  
  Problems Detected:
  1. Checkout failed completely
  2. Payment is slow (3.1s)
  
  Final Status: FAILED
  Recommendations:
  - Verify payment gateway (Checkout issue)
  - Fix issues sequentially (multiple problems)
  
  =====================================================
  KEY CONCEPTS DEMONSTRATED:
  =====================================================
  
  1. CONDITIONAL LOGIC:
     - if/else statements for pass/fail decisions
     - Nested conditions for performance checks
     - Multiple conditions combined with && and ||
  
  2. VARIABLE TRACKING:
     - Accumulating score across tests
     - Counting problems
     - Storing problem descriptions in separate variables
  
  3. DATA STRUCTURES:
     - Objects to store test information
     - Using object properties (test.name, test.passed, etc.)
  
  4. STRING OPERATIONS:
     - Template literals for formatted output
     - String methods like includes() for search
     - Empty string checks for slot availability
  
  5. COMPARISON OPERATORS:
     - Equality checks (===, !==)
     - Greater than comparisons (>)
     - Logical combinations (&&, ||)
  
  6. REAL-WORLD PATTERNS:
     - Problem tracking without arrays (Day 03 limitation)
     - Intelligent diagnostics based on failure patterns
     - Actionable recommendations for fixing issues
  
  =====================================================
  WHY THIS APPROACH (NO LOOPS/ARRAYS)?
  =====================================================
  
  Day 03 Focus:
  - This code demonstrates pure conditional logic
  - Repetitive code is intentional (before learning loops)
  - Shows the pain points that loops/arrays solve
  - Builds foundation for understanding why loops matter
  
  =====================================================
  WHAT GETS LOGGED TO CONSOLE:
  =====================================================
  
  TEST REPORT CARD

  --- Evaluating Test 1: Login ---
  PASS Login: +25 points (2.1s)
  --- Evaluating Test 2: Add to Cart ---
  PASS Add to Cart: +25 points (1.5s)
  --- Evaluating Test 3: Checkout ---
  FAIL Checkout: FAILED
  --- Evaluating Test 4: Payment ---
  PASS Payment: +25 points (3.1s)

  ----------------------------------------
  Final Score: 75% (need 80% to pass)

  WARNING: Problems Found:
    1. Checkout failed completely
    2. Payment is slow (3.1s)

  ----------------------------------------
  STATUS: FAILED
  FIX: Checkout issue detected - verify payment gateway
  FIX: Multiple issues detected - fix sequentially
  ----------------------------------------
*/