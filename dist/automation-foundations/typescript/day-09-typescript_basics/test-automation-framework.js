"use strict";
// ==========================================
// EXAMPLE 2: test-automation-framework.ts
// AUTOMATED TEST EXECUTION FRAMEWORK
// ==========================================
// This example demonstrates TypeScript with test automation concepts:
// test configuration, execution tracking, reporting, and browser management
// ==========================================
// FUNCTION 1: CREATE TEST CONFIG
// ==========================================
// Factory function to create test configuration with defaults
// Parameters: environment and optional custom settings
// Return type: Complete TestConfig object
// Uses default parameters to provide sensible defaults
function createTestConfig(environment, // Required: which environment to test
customConfig // Optional: override any default settings
// Partial<T> makes all properties optional
) {
    // Log configuration creation
    console.log(`Creating test config for ${environment} environment`);
    // Define default configuration values
    // These are used unless overridden by customConfig
    const defaultConfig = {
        baseUrl: `https://${environment}.example.com`, // Construct URL from environment
        timeout: 30000, // 30 second default timeout
        headless: true, // Run headless by default
        browser: "chromium", // Default to Chromium
        environment: environment, // Use provided environment
        retryAttempts: 1, // Retry failed tests once
        screenshotOnFailure: true // Capture failure screenshots
    };
    // Merge default config with custom overrides
    // Spread operator (...) copies properties, right side overwrites left
    // customConfig || {} ensures we don't spread undefined
    const finalConfig = {
        ...defaultConfig, // Start with defaults
        ...customConfig // Override with custom settings
    };
    // Log the final configuration for debugging
    console.log(`Config created: ${finalConfig.browser} on ${finalConfig.baseUrl}`);
    // Return merged configuration
    return finalConfig;
}
// ==========================================
// FUNCTION 2: CREATE TEST CASE
// ==========================================
// Factory function to create a new test case object
// Parameters: Test details (id, name, priority)
// Return type: TestCase object with default values
// Simplifies test creation with sensible defaults
function createTestCase(id, // Unique test identifier
name, // Descriptive test name
priority // Test priority level
) {
    // Log test case creation
    console.log(`Creating test case: ${name} (Priority: ${priority})`);
    // Return new test case object with initial values
    return {
        id: id, // Assign provided ID
        name: name, // Assign provided name
        status: "pending", // Initial status is pending
        priority: priority, // Assign provided priority
        duration: 0, // Duration unknown until execution
        // errorMessage is undefined initially (optional property)
        // screenshotPath is undefined initially (optional property)
    };
}
// ==========================================
// FUNCTION 3: CREATE TEST SUITE
// ==========================================
// Factory function to create a test suite container
// Parameters: Suite details and array of test cases
// Return type: TestSuite object
// Groups related tests together for organization
function createTestSuite(id, // Suite identifier
name, // Suite name
tests, // Array of tests in this suite
browser = "chromium" // Browser to use (default: chromium)
) {
    // Log suite creation with test count
    console.log(`Creating test suite: ${name} with ${tests.length} test(s)`);
    // Return new test suite object
    return {
        id: id, // Assign provided ID
        name: name, // Assign provided name
        tests: tests, // Assign provided test array
        browser: browser // Assign browser (uses default if not provided)
        // beforeAll is undefined (optional)
        // afterAll is undefined (optional)
    };
}
// ==========================================
// FUNCTION 4: RUN TEST CASE
// ==========================================
// Simulates execution of a single test case
// Parameters: Test case object and configuration
// Return type: Updated TestCase with execution results
// In real framework, this would interact with actual browser/application
function runTestCase(test, config) {
    // Log test execution start
    console.log(`\n🚀 Running: ${test.name}`);
    console.log(`   Browser: ${config.browser} | Environment: ${config.environment}`);
    // Update test status to running
    // Create new object to maintain immutability
    const runningTest = {
        ...test, // Copy all properties from original test
        status: "running" // Update status to running
    };
    // Record start time for duration calculation
    const startTime = Date.now();
    // SIMULATION: Actual test execution would happen here
    // For this example, we'll randomly pass/fail tests based on priority
    // In real scenario: interact with browser, verify UI elements, etc.
    // Simulate test execution delay (random between 1-3 seconds)
    const executionDelay = Math.random() * 2000 + 1000;
    // Calculate if test should pass or fail (simulation)
    // Critical tests: 95% pass rate
    // High priority: 90% pass rate
    // Medium priority: 85% pass rate
    // Low priority: 80% pass rate
    let passThreshold;
    if (test.priority === "critical") {
        passThreshold = 0.95; // 95% chance to pass
    }
    else if (test.priority === "high") {
        passThreshold = 0.90; // 90% chance to pass
    }
    else if (test.priority === "medium") {
        passThreshold = 0.85; // 85% chance to pass
    }
    else {
        passThreshold = 0.80; // 80% chance to pass
    }
    // Generate random number to determine pass/fail
    const randomValue = Math.random();
    const testPassed = randomValue < passThreshold;
    // Calculate test duration
    // In real scenario, this would be actual execution time
    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000; // Convert to seconds
    // Create updated test object with results
    const completedTest = {
        ...runningTest, // Copy running test properties
        status: testPassed ? "passed" : "failed", // Set final status
        duration: duration, // Set execution duration
        // Add error message if test failed
        errorMessage: testPassed
            ? undefined // No error message for passed tests
            : `Test failed: Assertion error at step ${Math.floor(Math.random() * 5) + 1}`,
        // Add screenshot path if configured and test failed
        screenshotPath: (!testPassed && config.screenshotOnFailure)
            ? `screenshots/${test.id}_${Date.now()}.png`
            : undefined
    };
    // Log test result
    if (testPassed) {
        console.log(`   ✅ PASSED (${duration.toFixed(2)}s)`);
    }
    else {
        console.log(`   ❌ FAILED (${duration.toFixed(2)}s)`);
        if (completedTest.errorMessage) {
            console.log(`   Error: ${completedTest.errorMessage}`);
        }
        if (completedTest.screenshotPath) {
            console.log(`   Screenshot: ${completedTest.screenshotPath}`);
        }
    }
    // Return updated test object
    return completedTest;
}
// ==========================================
// FUNCTION 5: RUN TEST SUITE
// ==========================================
// Executes all tests in a suite sequentially
// Parameters: Test suite and configuration
// Return type: Updated TestSuite with all tests executed
// Manages suite lifecycle: beforeAll → tests → afterAll
function runTestSuite(suite, config) {
    // Log suite execution start with separator
    console.log("\n" + "=".repeat(60));
    console.log(`📦 SUITE: ${suite.name}`);
    console.log("=".repeat(60));
    // Execute beforeAll hook if defined
    if (suite.beforeAll) {
        console.log("Running beforeAll hook...");
        suite.beforeAll(); // Execute setup function
    }
    // Execute all tests in the suite
    // map() transforms each test by running it and returning updated version
    const executedTests = suite.tests.map(test => {
        // Run each test and get updated test object
        return runTestCase(test, config);
    });
    // Execute afterAll hook if defined
    if (suite.afterAll) {
        console.log("\nRunning afterAll hook...");
        suite.afterAll(); // Execute cleanup function
    }
    // Create updated suite with executed tests
    const completedSuite = {
        ...suite, // Copy all suite properties
        tests: executedTests // Replace tests with executed versions
    };
    // Log suite completion
    console.log("\n" + "=".repeat(60));
    console.log(`✅ SUITE COMPLETE: ${suite.name}`);
    console.log("=".repeat(60));
    // Return updated suite
    return completedSuite;
}
// ==========================================
// FUNCTION 6: GENERATE TEST SUMMARY
// ==========================================
// Calculates statistics from executed test suite
// Parameters: Test suite with executed tests
// Return type: TestSummary object with all statistics
// Aggregates results for reporting and metrics
function generateTestSummary(suite) {
    // Count tests by status using reduce
    // reduce() iterates through tests and accumulates counts
    const statusCounts = suite.tests.reduce((acc, test) => {
        // Increment counter for this test's status
        if (test.status === "passed") {
            acc.passed++;
        }
        else if (test.status === "failed") {
            acc.failed++;
        }
        else if (test.status === "skipped") {
            acc.skipped++;
        }
        return acc; // Return accumulator for next iteration
    }, 
    // Initial accumulator value: object with zero counts
    { passed: 0, failed: 0, skipped: 0 });
    // Calculate total number of tests
    const total = suite.tests.length;
    // Calculate total execution time by summing all test durations
    // reduce() adds up all duration values
    const totalDuration = suite.tests.reduce((sum, test) => sum + test.duration, // Add current test duration to sum
    0 // Start with 0
    );
    // Calculate pass rate as percentage
    // Avoid division by zero if no tests
    const passRate = total > 0
        ? (statusCounts.passed / total) * 100 // Calculate percentage
        : 0; // 0% if no tests
    // Create and return summary object
    const summary = {
        total: total, // Total test count
        passed: statusCounts.passed, // Number of passed tests
        failed: statusCounts.failed, // Number of failed tests
        skipped: statusCounts.skipped, // Number of skipped tests
        passRate: passRate, // Pass percentage
        totalDuration: totalDuration // Total execution time
    };
    // Return summary object
    return summary;
}
// ==========================================
// FUNCTION 7: DISPLAY TEST REPORT
// ==========================================
// Prints formatted test report to console
// Parameters: Test summary object
// Return type: void (only prints output, no return value)
// Creates visually appealing report for test results
function displayTestReport(summary) {
    // Print report header with decorative border
    console.log("\n" + "★".repeat(60));
    console.log("📊 TEST EXECUTION REPORT");
    console.log("★".repeat(60));
    // Print test counts
    console.log(`\nTotal Tests:    ${summary.total}`);
    console.log(`Passed:         ${summary.passed} ✅`);
    console.log(`Failed:         ${summary.failed} ❌`);
    console.log(`Skipped:        ${summary.skipped} ⏭️`);
    // Print pass rate with color indicator
    // Format to 2 decimal places
    console.log(`\nPass Rate:      ${summary.passRate.toFixed(2)}%`);
    // Print total execution time
    // Format to 2 decimal places
    console.log(`Total Duration: ${summary.totalDuration.toFixed(2)}s`);
    // Print status message based on pass rate
    console.log("\n" + "-".repeat(60));
    if (summary.passRate === 100) {
        console.log("🎉 Status: ALL TESTS PASSED!");
    }
    else if (summary.passRate >= 80) {
        console.log("✅ Status: MOSTLY PASSING (Good)");
    }
    else if (summary.passRate >= 60) {
        console.log("⚠️  Status: SOME FAILURES (Needs Attention)");
    }
    else {
        console.log("❌ Status: MANY FAILURES (Critical)");
    }
    // Print report footer
    console.log("★".repeat(60) + "\n");
}
// ==========================================
// EXECUTION: DEMONSTRATION
// ==========================================
// This section demonstrates the complete test execution workflow
console.log("========== TEST AUTOMATION FRAMEWORK DEMO ==========\n");
// STEP 1: Create test configuration for staging environment
console.log("--- Step 1: Creating Test Configuration ---");
const config = createTestConfig("staging", {
    browser: "chromium", // Override: use Chromium
    headless: false, // Override: run with UI visible
    timeout: 60000, // Override: 60 second timeout
    retryAttempts: 2 // Override: retry twice on failure
});
// STEP 2: Create individual test cases
console.log("\n--- Step 2: Creating Test Cases ---");
const test1 = createTestCase("TC001", "Login with valid credentials", "critical");
const test2 = createTestCase("TC002", "Login with invalid password", "high");
const test3 = createTestCase("TC003", "Password reset flow", "medium");
const test4 = createTestCase("TC004", "Remember me functionality", "low");
const test5 = createTestCase("TC005", "Login timeout handling", "high");
// STEP 3: Create test suite with all test cases
console.log("\n--- Step 3: Creating Test Suite ---");
const loginSuite = createTestSuite("SUITE001", // Suite ID
"Login Functionality Tests", // Suite name
[test1, test2, test3, test4, test5], // Array of tests
"chromium" // Browser
);
// STEP 4: Run the entire test suite
console.log("\n--- Step 4: Executing Test Suite ---");
const executedSuite = runTestSuite(loginSuite, config);
// STEP 5: Generate summary statistics
console.log("\n--- Step 5: Generating Summary ---");
const summary = generateTestSummary(executedSuite);
// STEP 6: Display final report
console.log("\n--- Step 6: Displaying Report ---");
displayTestReport(summary);
console.log("========== DEMO COMPLETE ==========");
