// ==============================
// Test Execution Summary Report
// File: test-report.js
// Purpose: Demonstrate how data types,
//          calculations, and string
//          formatting are used in
//          automation reporting
// ==============================


// ==============================
// 1. Test Configuration (Constants)
// ==============================
// These values describe the test context
// and usually come from config files in
// real automation frameworks

const testSuiteName = "Search Functionality Tests";
const environment = "Stage";
const browser = "Chrome";
const network = "WiFi - Airtel Airfibre";


// ==============================
// 2. Test Results (Runtime Data)
// ==============================
// These values are typically collected
// during test execution

const totalTests = 20;
const passedTests = 13;
const failedTests = 7;
const testDuration = 45.5; // total execution time in seconds


// ==============================
// 3. Calculations (Derived Metrics)
// ==============================
// Automation frameworks often calculate
// metrics for reporting dashboards

// Pass rate formula:
// (passedTests / totalTests) * 100
//
// Example:
// 13 / 20 * 100 = 65
//
// toFixed(1) is used ONLY for display
// It converts the number to a string
// with 1 decimal place for readability

const passRate = (passedTests / totalTests * 100).toFixed(1);


// ==============================
// 4. Console-Based Test Report
// ==============================
// Template literals allow clean, readable
// multi-line reports without complex logic
//
// In real projects, this data is usually
// sent to:
// - HTML reports (Extent / Allure)
// - CI logs (Jenkins / GitHub Actions)
// - Monitoring dashboards

console.log(`
========================================
TEST EXECUTION REPORT
========================================
Suite       : ${testSuiteName}
Environment : ${environment}
Browser     : ${browser}
Network     : ${network}

RESULTS:
✓ Passed    : ${passedTests}
✗ Failed    : ${failedTests}
○ Total     : ${totalTests}

METRICS:
Pass Rate  : ${passRate}%
Duration   : ${testDuration}s
========================================
`);


// ==============================
// End of Report
// ==============================
