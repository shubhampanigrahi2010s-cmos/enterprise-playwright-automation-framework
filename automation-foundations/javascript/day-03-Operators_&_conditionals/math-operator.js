"use strict";

/*
  ======================================================
  DAY 03 – MATH & CALCULATIONS (AUTOMATION CONTEXT)
  ======================================================
  Focus:
  - Metrics used in automation reporting
  - Time conversions and timeout calculations
  - Retry logic and exponential backoff
  - Throughput, coverage, and SLA metrics
  
  Why Math in Test Automation?
  - Calculate test pass rates and coverage percentages
  - Convert time units (ms ↔ seconds ↔ minutes)
  - Implement retry strategies with timeouts
  - Measure performance (response times, throughput)
  - Generate test reports with statistical data
  - Make data-driven decisions about test health
*/

// =====================================================
// BASIC TEST METRICS
// =====================================================
// Calculate fundamental test execution metrics
// These are the most common calculations in test reporting

const testMetrics = {
  total: 20,                               // Total number of tests executed
  passed: 18                               // Number of tests that passed
};

// Calculate failed tests by subtraction
testMetrics.failed = testMetrics.total - testMetrics.passed; // 20 - 18 = 2

// Pass Rate formula: (passed / total) × 100
// This gives us percentage of tests that succeeded
const passRate =
  (testMetrics.passed / testMetrics.total) * 100; // (18/20) × 100 = 90%

// toFixed(1) rounds to 1 decimal place for readable output
console.log(`Pass Rate: ${passRate.toFixed(1)}%`); // "Pass Rate: 90.0%"

// =====================================================
// AVERAGE TEST DURATION (SCALABLE)
// =====================================================
// Calculate average execution time across multiple tests
// Uses reduce() method for clean, scalable summation

const durations = [2.5, 3.1, 1.8, 4.2];    // Test durations in seconds

// reduce() accumulates values - perfect for summing arrays
// Parameters: (accumulator, currentValue) => operation
// Second parameter (0) is the initial value for sum
const totalDuration = durations.reduce(
  (sum, value) => sum + value,             // Add each value to running sum
  0                                        // Start sum at 0
);
// Result: 0 + 2.5 + 3.1 + 1.8 + 4.2 = 11.6

// Average formula: total sum / number of items
const averageDuration = totalDuration / durations.length; // 11.6 / 4 = 2.9

// Display with 2 decimal places for precision
console.log(`Average test time: ${averageDuration.toFixed(2)}s`); // "2.90s"

// =====================================================
// TIME CONVERSIONS
// =====================================================
// Convert between different time units
// Critical for timeout calculations and time-based logic

const timeoutMs = 5000;                    // Timeout in milliseconds (5000ms)
const timeoutSeconds = timeoutMs / 1000;   // Convert to seconds: 5000 / 1000 = 5s

console.log(`Timeout: ${timeoutMs}ms (${timeoutSeconds}s)`);

// Common time conversion formulas:
// - Milliseconds to Seconds: ms / 1000
// - Seconds to Milliseconds: s × 1000
// - Seconds to Minutes: s / 60
// - Minutes to Seconds: min × 60
// - Hours to Milliseconds: hours × 60 × 60 × 1000

// =====================================================
// RETRY & TIMEOUT CALCULATIONS
// =====================================================
// Calculate total time needed including retry attempts
// Essential for setting realistic test timeouts

const retryConfig = {
  baseTimeout: 3000,                       // Time for single attempt (3 seconds)
  retries: 3                               // Number of retry attempts allowed
};

// Total timeout = base timeout × (number of attempts)
// Number of attempts = original attempt + retries (1 + 3 = 4 attempts)
const totalTimeout =
  retryConfig.baseTimeout * (retryConfig.retries + 1); // 3000 × 4 = 12000ms

console.log(
  `Total timeout with retries: ${totalTimeout}ms`    // "12000ms"
);

// This ensures we allocate enough time for all retry attempts

// =====================================================
// ASSIGNMENT SHORTCUTS
// =====================================================
// Compound assignment operators combine operation with assignment
// More concise than writing "variable = variable + value"

let attempt = 0;                           // Initialize attempt counter
attempt++;                                 // Increment: attempt = attempt + 1 → 1
attempt++;                                 // Increment again: 1 + 1 → 2

let dynamicTimeout = 5000;                 // Start with 5000ms
dynamicTimeout -= 1000;                    // Subtract: 5000 - 1000 = 4000
dynamicTimeout *= 2;                       // Multiply: 4000 × 2 = 8000
dynamicTimeout /= 1000;                    // Divide: 8000 / 1000 = 8

console.log(`Attempts: ${attempt}`);       // "Attempts: 2"
console.log(`Final timeout: ${dynamicTimeout}s`); // "Final timeout: 8s"

// =====================================================
// EXPONENTIAL BACKOFF
// =====================================================
// Progressively increase wait time between retry attempts
// Common strategy to avoid overwhelming servers during failures

console.log("\nRetry strategy (exponential backoff):");

let retryDelay = 1000;                     // Start with 1 second delay

// Loop through 4 retry attempts
for (let i = 1; i <= 4; i++) {
  console.log(`Retry ${i}: wait ${retryDelay}ms`);
  retryDelay *= 2;                         // Double the delay each time
}
// Output:
// Retry 1: wait 1000ms   (1 second)
// Retry 2: wait 2000ms   (2 seconds)
// Retry 3: wait 4000ms   (4 seconds)
// Retry 4: wait 8000ms   (8 seconds)

// This prevents hammering a failing service and gives it time to recover

// =====================================================
// MODULO (%) – PATTERN CONTROL
// =====================================================
// Modulo returns remainder after division
// Used for cyclical patterns (every Nth run, rotation, even/odd checks)

const runNumber = 12;                      // Current test run number

// Check if run number is divisible by 5 (remainder is 0)
if (runNumber % 5 === 0) {
  // Runs on: 5, 10, 15, 20, 25... (every 5th run)
  console.log("Running full test suite");
} else {
  // Runs on all other numbers
  console.log("Running smoke tests");
}

// Other modulo use cases:
// - runNumber % 2 === 0 → check if even
// - runNumber % 10 === 0 → every 10th run
// - index % 3 → rotate through 3 options (0, 1, 2)

// =====================================================
// RESPONSE TIME PERCENTILES
// =====================================================
// Calculate P95 (95th percentile) response time
// Shows the response time that 95% of requests are faster than
// Important metric for performance SLAs

const responseTimes = [120, 145, 98, 210, 167, 134, 156, 189, 201, 178];

// Spread operator [...array] creates a copy (avoids modifying original)
// sort() arranges values from smallest to largest
const sortedTimes = [...responseTimes].sort((a, b) => a - b);
// Sorted: [98, 120, 134, 145, 156, 167, 178, 189, 201, 210]

// Calculate index for 95th percentile
// Formula: length × 0.95, rounded down
const p95Index = Math.floor(sortedTimes.length * 0.95); // floor(10 × 0.95) = floor(9.5) = 9

// Get the value at that index
const p95Value = sortedTimes[p95Index];    // sortedTimes[9] = 210ms

console.log(`P95 response time: ${p95Value}ms`);

// This means 95% of requests completed in 210ms or less

// =====================================================
// ERROR RATE
// =====================================================
// Calculate percentage of failed requests
// Key metric for API reliability and test stability

const totalRequests = 1000;                // Total API requests made
const errorCount = 23;                     // Number of requests that failed

// Error Rate formula: (errors / total) × 100
const errorRate =
  (errorCount / totalRequests) * 100;      // (23/1000) × 100 = 2.3%

console.log(`Error rate: ${errorRate.toFixed(2)}%`); // "Error rate: 2.30%"

// Lower error rate = more reliable system
// Industry standard: aim for <1% error rate

// =====================================================
// EXECUTION SPEED
// =====================================================
// Calculate how many tests execute per minute
// Helps estimate total test suite duration

const testsRun = 150;                      // Number of tests executed
const executionTime = 450;                 // Time taken in seconds (7.5 minutes)

// Convert to tests per minute: (tests / seconds) × 60
const testsPerMinute =
  (testsRun / executionTime) * 60;         // (150/450) × 60 = 20 tests/min

console.log(
  `Execution speed: ${testsPerMinute.toFixed(1)} tests/min` // "20.0 tests/min"
);

// Use this to estimate: 1000 tests ÷ 20 tests/min = 50 minutes

// =====================================================
// BATCH PROCESSING
// =====================================================
// Calculate how many batches needed to process all items
// Important for pagination, parallel processing, and resource management

const batchConfig = {
  totalItems: 1547,                        // Total items to process
  batchSize: 100                           // Items per batch
};

// Math.ceil() rounds UP to ensure we process all items
// Formula: total items / batch size, rounded up
const totalBatches =
  Math.ceil(batchConfig.totalItems / batchConfig.batchSize); // ceil(1547/100) = ceil(15.47) = 16

console.log(
  `Processing ${batchConfig.totalItems} items in ${totalBatches} batches`
);
// Output: "Processing 1547 items in 16 batches"
// Last batch will have only 47 items (1547 - 15×100)

// =====================================================
// MEMORY CONVERSION
// =====================================================
// Convert bytes to megabytes for readable memory metrics
// Essential for monitoring resource usage

const memoryBytes = 1536000;               // Memory in bytes

// Conversion formula: bytes / (1024 × 1024)
// Why 1024? Computer memory uses binary (2^10 = 1024)
const memoryMB =
  memoryBytes / (1024 * 1024);             // 1536000 / 1048576 ≈ 1.46 MB

console.log(`Memory usage: ${memoryMB.toFixed(2)} MB`); // "Memory usage: 1.46 MB"

// Common conversions:
// - Bytes to KB: bytes / 1024
// - Bytes to MB: bytes / (1024 × 1024)
// - Bytes to GB: bytes / (1024 × 1024 × 1024)

// =====================================================
// COVERAGE & THROUGHPUT
// =====================================================
// Calculate code coverage and data transfer metrics

// CODE COVERAGE: Percentage of code tested
const coverageMetrics = {
  totalLines: 5000,                        // Total lines of code
  coveredLines: 4250                       // Lines covered by tests
};

// Coverage formula: (covered / total) × 100
const coverage =
  (coverageMetrics.coveredLines / coverageMetrics.totalLines) * 100; // (4250/5000) × 100 = 85%

console.log(`Code coverage: ${coverage.toFixed(1)}%`); // "Code coverage: 85.0%"

// THROUGHPUT: Data transfer speed
const dataTransferred = 52428800;          // Total bytes transferred (50 MB)
const transferTime = 8;                    // Time in seconds

// Throughput formula: (total bytes / time) / (1024 × 1024) = MB/s
const throughputMBps =
  (dataTransferred / transferTime) / (1024 * 1024); // (52428800/8)/1048576 = 6.25 MB/s

console.log(`Throughput: ${throughputMBps.toFixed(2)} MB/s`); // "Throughput: 6.25 MB/s"

// =====================================================
// ROUNDING & RANDOM DATA
// =====================================================
// Different rounding methods for different use cases

const preciseValue = 3.14159265359;        // Pi with many decimal places

console.log(preciseValue.toFixed(2));      // "3.14" - rounds to 2 decimals (returns string)
console.log(Math.round(preciseValue));     // 3 - rounds to nearest integer
console.log(Math.floor(preciseValue));     // 3 - always rounds DOWN
console.log(Math.ceil(preciseValue));      // 4 - always rounds UP

// When to use each:
// - toFixed(): For display (converts to string with fixed decimals)
// - Math.round(): When you want nearest whole number
// - Math.floor(): For array indices, pagination (always round down)
// - Math.ceil(): For batch counts (ensure you process all items)

// RANDOM VALUES: Useful for test data variation
// Math.random() generates number between 0 (inclusive) and 1 (exclusive)

// Generate random delay between 1000ms and 6000ms
const randomDelay =
  Math.floor(Math.random() * 5000) + 1000;
//            ↑                ↑       ↑
//      [0 to 1)        [0 to 5000) + 1000 = [1000 to 6000)

console.log(`Random delay: ${randomDelay}ms`);

// Random number formula: Math.floor(Math.random() * (max - min + 1)) + min

// =====================================================
// SLA COMPLIANCE
// =====================================================
// Measure percentage of requests meeting SLA requirements
// SLA = Service Level Agreement (performance guarantee)

const targetResponseTime = 2000;           // Target: 2000ms or less
const actualResponses = [1800, 2100, 1950, 2300, 1700, 1900]; // Actual response times

// filter() keeps only values that meet condition (≤ target)
// .length counts how many passed the SLA requirement
const compliantResponses =
  actualResponses.filter(t => t <= targetResponseTime).length; // Keeps: 1800, 1950, 1700, 1900 = 4 values

// Compliance formula: (compliant / total) × 100
const slaCompliance =
  (compliantResponses / actualResponses.length) * 100; // (4/6) × 100 = 66.67%

console.log(`SLA compliance: ${slaCompliance.toFixed(1)}%`); // "SLA compliance: 66.7%"

// 66.7% means only 4 out of 6 requests met the 2-second target
// This might trigger alerts or indicate performance issues

// =====================================================
// AUTOMATION RATIO
// =====================================================
// Calculate what percentage of tests are automated
// Key metric for test automation maturity

const automatedTests = 450;                // Tests that run automatically
const manualTests = 50;                    // Tests requiring human execution

// Automation ratio formula: automated / (automated + manual) × 100
const automationRatio =
  (automatedTests / (automatedTests + manualTests)) * 100; // (450/500) × 100 = 90%

console.log(`Automation coverage: ${automationRatio.toFixed(1)}%`); // "Automation coverage: 90.0%"

// Higher automation ratio = less manual effort, faster feedback
// Industry target: 70-80% automation for mature test suites

/*
  ======================================================
  KEY MATH CONCEPTS FOR TEST AUTOMATION:
  ======================================================
  
  ESSENTIAL CALCULATIONS:
  1. Percentages: (part / whole) × 100
  2. Averages: sum / count
  3. Ratios: value1 / value2
  4. Time conversions: multiply/divide by appropriate factors
  5. Rounding: toFixed(), Math.round(), Math.floor(), Math.ceil()
  
  COMMON METRICS:
  - Pass Rate: Success percentage of test execution
  - Error Rate: Failure percentage of operations
  - Coverage: Percentage of code/features tested
  - Throughput: Operations or data per unit time
  - SLA Compliance: Percentage meeting performance targets
  - Automation Ratio: Automated vs manual test percentage
  
  USEFUL METHODS:
  - toFixed(n): Round to n decimal places (returns string)
  - Math.round(): Round to nearest integer
  - Math.floor(): Always round down
  - Math.ceil(): Always round up
  - Math.random(): Generate random number [0, 1)
  - Array.reduce(): Sum or accumulate values
  - Array.filter(): Count items meeting condition
  - Array.sort(): Order values for percentile calculations
  
  TIME CONVERSION CHEAT SHEET:
  - ms → s: divide by 1000
  - s → ms: multiply by 1000
  - s → min: divide by 60
  - min → s: multiply by 60
  - hours → ms: multiply by 3,600,000
  
  MEMORY CONVERSION CHEAT SHEET:
  - Bytes → KB: divide by 1024
  - Bytes → MB: divide by 1,048,576 (1024²)
  - Bytes → GB: divide by 1,073,741,824 (1024³)
  
  BEST PRACTICES:
  1. Use meaningful variable names for calculations
  2. Add comments explaining formulas
  3. Use toFixed() for display, not for calculations
  4. Be careful with integer division (use Math.floor/ceil)
  5. Store intermediate results for debugging
  6. Consider precision requirements (float vs integer)
  7. Document units in variable names (timeMs, durationSec)
  
  COMMON PITFALLS:
  - Dividing by zero (always check denominator)
  - Forgetting to convert time units
  - Using toFixed() in calculations (it returns a string!)
  - Not rounding appropriately (batch counts need ceil)
  - Mixing decimal and integer division
*/