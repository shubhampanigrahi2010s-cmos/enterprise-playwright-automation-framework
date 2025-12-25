// 📊 TEST SCORE CALCULATOR
// Calculate test results and determine pass/fail

console.log("📊 TEST REPORT CARD\n");

// Test results - each test has name, pass status, points, and time
const test1 = { name: "Login", passed: true, points: 25, time: 2.1 };
const test2 = { name: "Add to Cart", passed: true, points: 25, time: 1.5 };
const test3 = { name: "Checkout", passed: false, points: 25, time: 5.2 };
const test4 = { name: "Payment", passed: true, points: 25, time: 3.1 };

// Variables to track results
let score = 0;                  // Total points earned
let problem1 = "";              // First problem found
let problem2 = "";              // Second problem found
let problem3 = "";              // Third problem found
let problemCount = 0;           // Count of problems

// Check test 1
if (test1.passed) {
  score += test1.points;        // Add points if passed
  console.log(`✓ ${test1.name}: +${test1.points} points (${test1.time}s)`);
  
  if (test1.time > 3.0) {       // Check if slow
    problemCount++;
    problem1 = `${test1.name} is too slow (${test1.time}s)`;
  }
} else {
  console.log(`✗ ${test1.name}: +0 points (FAILED)`);
  problemCount++;
  problem1 = `${test1.name} failed completely`;
}

// Check test 2
if (test2.passed) {
  score += test2.points;        // Add points if passed
  console.log(`✓ ${test2.name}: +${test2.points} points (${test2.time}s)`);
  
  if (test2.time > 3.0) {       // Check if slow
    problemCount++;
    if (problem1 === "") {
      problem1 = `${test2.name} is too slow (${test2.time}s)`;
    } else {
      problem2 = `${test2.name} is too slow (${test2.time}s)`;
    }
  }
} else {
  console.log(`✗ ${test2.name}: +0 points (FAILED)`);
  problemCount++;
  if (problem1 === "") {
    problem1 = `${test2.name} failed completely`;
  } else {
    problem2 = `${test2.name} failed completely`;
  }
}

// Check test 3
if (test3.passed) {
  score += test3.points;        // Add points if passed
  console.log(`✓ ${test3.name}: +${test3.points} points (${test3.time}s)`);
  
  if (test3.time > 3.0) {       // Check if slow
    problemCount++;
    if (problem1 === "") {
      problem1 = `${test3.name} is too slow (${test3.time}s)`;
    } else if (problem2 === "") {
      problem2 = `${test3.name} is too slow (${test3.time}s)`;
    } else {
      problem3 = `${test3.name} is too slow (${test3.time}s)`;
    }
  }
} else {
  console.log(`✗ ${test3.name}: +0 points (FAILED)`);
  problemCount++;
  if (problem1 === "") {
    problem1 = `${test3.name} failed completely`;
  } else if (problem2 === "") {
    problem2 = `${test3.name} failed completely`;
  } else {
    problem3 = `${test3.name} failed completely`;
  }
}

// Check test 4
if (test4.passed) {
  score += test4.points;        // Add points if passed
  console.log(`✓ ${test4.name}: +${test4.points} points (${test4.time}s)`);
  
  if (test4.time > 3.0) {       // Check if slow
    problemCount++;
    if (problem1 === "") {
      problem1 = `${test4.name} is too slow (${test4.time}s)`;
    } else if (problem2 === "") {
      problem2 = `${test4.name} is too slow (${test4.time}s)`;
    } else if (problem3 === "") {
      problem3 = `${test4.name} is too slow (${test4.time}s)`;
    }
  }
} else {
  console.log(`✗ ${test4.name}: +0 points (FAILED)`);
  problemCount++;
  if (problem1 === "") {
    problem1 = `${test4.name} failed completely`;
  } else if (problem2 === "") {
    problem2 = `${test4.name} failed completely`;
  } else if (problem3 === "") {
    problem3 = `${test4.name} failed completely`;
  }
}

// Calculate percentage
const percentage = (score / 100) * 100;     // Total score out of 100
console.log(`\n${"─".repeat(40)}`);
console.log(`Final Score: ${percentage}% (need 80% to pass)`);

// Show problems found
if (problemCount > 0) {
  console.log("\n⚠️ Problems Found:");
  if (problem1 !== "") {
    console.log(`  1. ${problem1}`);
  }
  if (problem2 !== "") {
    console.log(`  2. ${problem2}`);
  }
  if (problem3 !== "") {
    console.log(`  3. ${problem3}`);
  }
}

// Final decision with multiple conditions
console.log("\n" + "─".repeat(40));
if (percentage >= 80 && problemCount === 0) {
  console.log("✅ STATUS: PERFECT!");
  console.log("   All tests passed with no issues");
} else if (percentage >= 80 && problemCount > 0) {
  console.log("⚠️ STATUS: PASSED WITH WARNINGS");
  console.log("   Score is good but fix the issues above");
} else {
  console.log("❌ STATUS: FAILED");
  console.log("   Score too low - need at least 80%");
  
  // Give specific advice
  if (problem1.includes("Checkout") || problem2.includes("Checkout") || problem3.includes("Checkout")) {
    console.log("\n   💡 FIX: Checkout is broken - check payment gateway");
  }
  
  if (problemCount > 1) {
    console.log("   💡 FIX: Multiple issues detected - test one at a time");
  }
}

console.log("─".repeat(40));