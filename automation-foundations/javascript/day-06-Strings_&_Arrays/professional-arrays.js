// ========================================== 
// 1. TEST DATA GENERATION PATTERNS 
// ========================================== 

// Display section header for test data generation
console.log("=== TEST DATA GENERATION ===\n"); 

// Function to generate multiple test user objects dynamically
// Parameters: count - number of users to generate
const generateUserPool = (count) =>  
    // Array.from creates array from array-like object
    // { length: count } creates object with specified length
    // (_, i) => callback function where _ is unused value, i is index
    Array.from({ length: count }, (_, i) => ({ 
        // Create unique user ID with zero-padded number (USER_001, USER_002, etc.)
        // String(i + 1) converts number to string
        // padStart(3, '0') pads string to 3 chars with leading zeros
        id: `USER_${String(i + 1).padStart(3, '0')}`, 
        // Generate unique email using template literal and index
        email: `test.user.${i + 1}@example.com`, 
        // Create password with incrementing number
        password: `Pass${i + 1}@2024`, 
        // Assign role based on index: first user = admin, next 2 = power_user, rest = standard_user
        // Ternary operators check conditions and assign roles accordingly
        role: i === 0 ? 'admin' : i < 3 ? 'power_user' : 'standard_user' 
    })); 

// Call function to generate 5 test users and store in users array
const users = generateUserPool(5); 
// Print header for user list
console.log("Generated Test Users:"); 
// slice(0, 3) takes first 3 users from array
// forEach loops through each user and prints details
users.slice(0, 3).forEach(user =>  
    // Display user ID, email, and role using template literal
    console.log(`  ${user.id}: ${user.email} (${user.role})`) 
); 

// Create cross-browser test matrix combining browsers with environments
// Parameters: browsers array, environments array
const createTestMatrix = (browsers, environments) =>  
    // flatMap applies function to each browser and flattens result into single array
    browsers.flatMap(browser =>  
        // map creates new array by transforming each environment
        environments.map(env => ({ 
            // Store browser name
            browser, 
            // Store environment name
            environment: env, 
            // Create unique test ID combining browser, environment, and timestamp
            // Date.now() returns current timestamp in milliseconds
            testId: `${browser}_${env}_${Date.now()}` 
        })) 
    ); 

// Generate test matrix with 3 browsers × 3 environments = 9 combinations
const testMatrix = createTestMatrix( 
    // Array of browser names
    ['chrome', 'firefox', 'safari'], 
    // Array of environment types
    ['desktop', 'mobile', 'tablet'] 
); 
// Display total number of test combinations
console.log(`\nTest Matrix: ${testMatrix.length} combinations`); 
// Show first combination as sample
console.log("Sample:", testMatrix[0]); 

// Function to split array into smaller chunks for parallel execution
// Parameters: tests array, chunkSize - size of each chunk
const chunkTests = (tests, chunkSize) =>  
    // Array.from creates array of chunks
    Array.from( 
        // Calculate how many chunks needed by dividing total by chunk size and rounding up
        { length: Math.ceil(tests.length / chunkSize) },  
        // For each chunk index, slice appropriate portion of tests array
        // i * chunkSize = start index, (i + 1) * chunkSize = end index
        (_, i) => tests.slice(i * chunkSize, (i + 1) * chunkSize) 
    ); 

// Create array of 15 test names (Test_1, Test_2, ... Test_15)
const allTests = Array.from({ length: 15 }, (_, i) => `Test_${i + 1}`); 
// Split tests into batches of 5 each
const batches = chunkTests(allTests, 5); 
// Display number of batches created
console.log(`\nBatching: ${batches.length} batches of ~5 tests each`); 

// ========================================== 
// 2. TEST RESULT ANALYSIS 
// ========================================== 

// Display section header for test result analysis
console.log("\n=== TEST RESULT ANALYSIS ===\n"); 

// Array of test result objects containing detailed test information
const testResults = [ 
    // Each object represents one test case with all relevant data
    { id: "TC001", name: "Login", status: "passed", duration: 2.5, browser: "chrome", tags: ["smoke", "critical"] }, 
    { id: "TC002", name: "Search", status: "failed", duration: 3.2, browser: "firefox", tags: ["regression"] }, 
    { id: "TC003", name: "Checkout", status: "passed", duration: 4.1, browser: "chrome", tags: ["critical", "e2e"] }, 
    { id: "TC004", name: "Payment", status: "failed", duration: 2.9, browser: "safari", tags: ["critical"] }, 
    { id: "TC005", name: "Registration", status: "passed", duration: 1.8, browser: "chrome", tags: ["smoke"] }, 
    { id: "TC006", name: "Profile", status: "passed", duration: 3.5, browser: "firefox", tags: ["regression"] } 
]; 

// Comprehensive function to analyze test results from multiple dimensions
// Parameter: results - array of test result objects
const analyzeResults = (results) => { 
    // reduce() iterates through array and accumulates analysis into single object
    // analysis is accumulator (starts with initial object below)
    // test is current test result being processed
    return results.reduce((analysis, test) => { 
        // Count tests by status (passed/failed)
        // || 0 provides default value of 0 if status doesn't exist yet
        analysis.byStatus[test.status] = (analysis.byStatus[test.status] || 0) + 1; 
        
        // Initialize browser tracking object if not exists
        if (!analysis.byBrowser[test.browser]) { 
            // Create object to track passed and failed counts per browser
            analysis.byBrowser[test.browser] = { passed: 0, failed: 0 }; 
        } 
        // Increment count for this browser's status
        analysis.byBrowser[test.browser][test.status]++; 
        
        // Collect all test durations for performance analysis
        analysis.durations.push(test.duration); 
        
        // Iterate through each tag in current test
        test.tags.forEach(tag => { 
            // Initialize tag tracking object if not exists
            if (!analysis.byTag[tag]) { 
                // Track passed, failed, and total for each tag
                analysis.byTag[tag] = { passed: 0, failed: 0, total: 0 }; 
            } 
            // Increment status count for this tag
            analysis.byTag[tag][test.status]++; 
            // Increment total count for this tag
            analysis.byTag[tag].total++; 
        }); 
        
        // Return updated analysis object for next iteration
        return analysis; 
    }, { 
        // Initial value - structure for accumulating analysis data
        byStatus: {},      // Will hold counts by status
        byBrowser: {},     // Will hold stats by browser
        byTag: {},         // Will hold stats by tag
        durations: []      // Will hold all test durations
    }); 
}; 

// Execute analysis on test results
const analysis = analyzeResults(testResults); 
// Display analysis header
console.log("Analysis Summary:"); 
// Show count of tests by status (passed/failed)
console.log("  By Status:", analysis.byStatus); 
// Show breakdown by browser
console.log("  By Browser:", analysis.byBrowser); 
// Show breakdown by tag categories
console.log("  By Tag:", analysis.byTag); 

// Calculate performance percentiles from duration data
// Parameter: durations - array of test duration values
const calculatePercentiles = (durations) => { 
    // Create copy using spread operator and sort numerically
    // (a, b) => a - b sorts in ascending order
    const sorted = [...durations].sort((a, b) => a - b); 
    // Return object with various percentile calculations
    return { 
        // p50 (median) - middle value at 50% position
        p50: sorted[Math.floor(sorted.length * 0.5)], 
        // p90 - value at 90th percentile (90% of tests are faster)
        p90: sorted[Math.floor(sorted.length * 0.9)], 
        // p95 - value at 95th percentile
        p95: sorted[Math.floor(sorted.length * 0.95)], 
        // Maximum duration (slowest test)
        max: Math.max(...sorted), 
        // Minimum duration (fastest test)
        min: Math.min(...sorted) 
    }; 
}; 

// Calculate percentiles from collected durations
const percentiles = calculatePercentiles(analysis.durations); 
// Display percentile header
console.log("\nPerformance Percentiles:"); 
// Show median test duration
console.log("  Median (p50):", percentiles.p50, "seconds"); 
// Show 90th percentile duration
console.log("  p90:", percentiles.p90, "seconds"); 
// Show slowest test duration
console.log("  Slowest:", percentiles.max, "seconds"); 

// Identify patterns and potential issues in test results
// Parameter: results - array of test results
const findPatterns = (results) => ({ 
    // Find all tests that took longer than 3 seconds
    // filter() returns array of tests matching condition
    slowTests: results.filter(t => t.duration > 3), 
    // Find failed tests that are marked as critical
    // Multiple conditions using && (both must be true)
    criticalFailures: results.filter(t =>  
        t.status === 'failed' && t.tags.includes('critical') 
    ), 
    // Count failures by browser to identify browser-specific issues
    // reduce accumulates failure counts per browser
    browserIssues: results.reduce((issues, test) => { 
        // Only count if test failed
        if (test.status === 'failed') { 
            // Increment counter for this browser (or initialize to 0)
            issues[test.browser] = (issues[test.browser] || 0) + 1; 
        } 
        // Return updated issues object
        return issues; 
    }, {}) 
}); 

// Execute pattern detection
const patterns = findPatterns(testResults); 
// Display patterns header
console.log("\nDetected Patterns:"); 
// Show names of slow tests using map to extract just names
console.log("  Slow tests (>3s):", patterns.slowTests.map(t => t.name)); 
// Show names of critical failures
console.log("  Critical failures:", patterns.criticalFailures.map(t => t.name)); 
// Show count of failures per browser
console.log("  Browser issues:", patterns.browserIssues); 

// ========================================== 
// 3. ARRAY TRANSFORMATIONS 
// ========================================== 

// Display section header
console.log("\n=== ARRAY TRANSFORMATIONS ===\n"); 

// Transform test results into standardized report format
// Parameter: results - array of test results
const transformForReport = (results) =>  
    // map() creates new array with transformed objects
    results.map(test => ({ 
        // Keep original test ID
        testId: test.id, 
        // Convert test name to uppercase for report
        testName: test.name.toUpperCase(), 
        // Standardize status to PASS/FAIL
        result: test.status === 'passed' ? 'PASS' : 'FAIL', 
        // Format duration with 's' suffix
        executionTime: `${test.duration}s`, 
        // Convert browser name to uppercase
        environment: test.browser.toUpperCase(), 
        // Determine severity based on critical tag
        severity: test.tags.includes('critical') ? 'HIGH' : 'MEDIUM', 
        // Add ISO timestamp for when report was generated
        timestamp: new Date().toISOString() 
    })); 

// Display report format header
console.log("Report Format:"); 
// Transform and display first 2 test results
// slice(0, 2) takes first 2 results
transformForReport(testResults.slice(0, 2)).forEach(report =>  
    // Print formatted report line
    console.log(`  ${report.testId}: ${report.result} in ${report.executionTime}`) 
); 

// Add metadata information to test results
// Parameters: results - test results array, metadata - metadata lookup object
const enrichWithMetadata = (results, metadata) =>  
    // map transforms each test
    results.map(test => ({ 
        // Spread operator copies all existing test properties
        ...test, 
        // Add metadata object
        metadata: { 
            // Get owner from metadata or default to 'unassigned'
            // ?. is optional chaining - safely access nested property
            owner: metadata[test.id]?.owner || 'unassigned', 
            // Get priority from metadata or default to 'medium'
            priority: metadata[test.id]?.priority || 'medium', 
            // Add current timestamp
            lastUpdated: new Date().toISOString() 
        } 
    })); 

// Define metadata for specific test cases
const testMetadata = { 
    // Metadata for TC001
    TC001: { owner: 'team-qa', priority: 'high' }, 
    // Metadata for TC002
    TC002: { owner: 'team-dev', priority: 'critical' } 
}; 

// Enrich first 2 tests with metadata
const enriched = enrichWithMetadata(testResults.slice(0, 2), testMetadata); 
// Display enriched tests header
console.log("\nEnriched Tests:"); 
// Loop through enriched tests
enriched.forEach(test =>  
    // Display test name and owner metadata
    console.log(`  ${test.name}: Owner=${test.metadata.owner}`) 
); 

// Validate test data and collect any issues found
// Parameter: tests - array of test objects to validate
const validateTestData = (tests) =>  
    // map transforms each test into validation result
    tests.map(test => { 
        // Array to collect validation issues
        const issues = []; 
        // Check if ID exists
        if (!test.id) issues.push('Missing ID'); 
        // Check if name exists and is not empty/whitespace
        // ?. safely accesses trim() even if name is undefined
        if (!test.name?.trim()) issues.push('Missing name'); 
        // Check if duration is positive
        if (test.duration <= 0) issues.push('Invalid duration'); 
        
        // Return validation result object
        return { 
            // Include original test
            test, 
            // Test is valid if no issues found
            isValid: issues.length === 0, 
            // Include array of issues
            issues 
        }; 
    }); 

// Display validation header
console.log("\nData Validation:"); 
// Validate all test results
validateTestData(testResults).forEach(v => { 
    // Set checkmark or X based on validity
    const status = v.isValid ? '✓' : '✗'; 
    // Show issues if any, otherwise 'Valid'
    const msg = v.issues.length > 0 ? v.issues.join(', ') : 'Valid'; 
    // Display validation status for each test
    console.log(`  ${status} ${v.test.id}: ${msg}`); 
}); 

// ========================================== 
// 4. COMPLEX AGGREGATIONS 
// ========================================== 

// Display section header
console.log("\n=== COMPLEX AGGREGATIONS ===\n"); 

// Aggregate comprehensive metrics from test results
// Parameter: results - array of test results
const aggregateMetrics = (results) => { 
    // reduce accumulates metrics into single object
    // metrics is accumulator, test is current item
    return results.reduce((metrics, test) => { 
        // Increment total test count
        metrics.totalTests++; 
        // Add duration to total
        metrics.totalDuration += test.duration; 
        
        // Check if test passed
        if (test.status === 'passed') { 
            // Increment passed count
            metrics.passed++; 
            // Add to passed duration total
            metrics.passedDuration += test.duration; 
        } else { 
            // Increment failed count
            metrics.failed++; 
            // Add to failed duration total
            metrics.failedDuration += test.duration; 
        } 
        
        // Get browser name for grouping
        const browser = test.browser; 
        // Initialize browser metrics if not exists
        if (!metrics.byBrowser[browser]) { 
            // Create object to track browser-specific metrics
            metrics.byBrowser[browser] = { passed: 0, failed: 0, duration: 0 }; 
        } 
        // Increment status count for this browser
        metrics.byBrowser[browser][test.status]++; 
        // Add duration to browser total
        metrics.byBrowser[browser].duration += test.duration; 
        
        // Return updated metrics for next iteration
        return metrics; 
    }, { 
        // Initial metrics object structure
        totalTests: 0,           // Total number of tests
        passed: 0,               // Number of passed tests
        failed: 0,               // Number of failed tests
        totalDuration: 0,        // Total time for all tests
        passedDuration: 0,       // Total time for passed tests
        failedDuration: 0,       // Total time for failed tests
        byBrowser: {}            // Browser-specific metrics
    }); 
}; 

// Execute aggregation on test results
const metrics = aggregateMetrics(testResults); 
// Calculate pass rate percentage
// Divide passed by total, multiply by 100, format to 1 decimal
const passRate = ((metrics.passed / metrics.totalTests) * 100).toFixed(1); 
// Calculate average duration per test
// Divide total duration by test count, format to 2 decimals
const avgDuration = (metrics.totalDuration / metrics.totalTests).toFixed(2); 

// Display metrics header
console.log("Aggregated Metrics:"); 
// Show total test count
console.log(`  Total: ${metrics.totalTests}`); 
// Show passed count with percentage
console.log(`  Passed: ${metrics.passed} (${passRate}%)`); 
// Show failed count
console.log(`  Failed: ${metrics.failed}`); 
// Show total duration with 2 decimals
console.log(`  Total Duration: ${metrics.totalDuration.toFixed(2)}s`); 
// Show average duration
console.log(`  Avg Duration: ${avgDuration}s`); 
// Display by browser header
console.log("\n  By Browser:"); 
// Object.entries converts object to array of [key, value] pairs
// Loop through each browser's metrics
Object.entries(metrics.byBrowser).forEach(([browser, stats]) => { 
    // Display browser name with pass/total ratio
    // stats.passed + stats.failed = total tests for this browser
    console.log(`    ${browser}: ${stats.passed}/${stats.passed + stats.failed} passed`); 
});