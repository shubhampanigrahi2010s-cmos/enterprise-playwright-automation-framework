// ==========================================
// ARROW FUNCTION SYNTAX EXAMPLES
// ==========================================

// TRADITIONAL FUNCTION - Old ES5 syntax
// Uses the 'function' keyword and explicit return statement
function traditionalAdd(a, b) { 
    return a + b; 
} 

// ARROW FUNCTION - Modern ES6 syntax with explicit return
// Uses arrow (=>) notation, requires 'return' keyword
const arrowAdd = (a, b) => { 
    return a + b; 
}; 

// ARROW FUNCTION - Concise syntax with implicit return
// Single expression automatically returns without 'return' keyword
// No curly braces needed for one-line returns
const shortAdd = (a, b) => a + b; 

// ONE PARAMETER - Parentheses are optional for single parameters
// Can write (x) => or just x =>
const square = x => x * x; 

// NO PARAMETERS - Parentheses are REQUIRED when there are no parameters
// Must use () => not just =>
const getTimestamp = () => Date.now(); 

// ==========================================
// REAL-WORLD AUTOMATION UTILITIES
// ==========================================

// EMAIL VALIDATION - Checks if string matches email pattern
// Uses regex to test for basic email format: something@something.something
const isEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 

// PASSWORD STRENGTH CHECKER - Validates password meets security requirements
// Checks: minimum 8 characters, at least one uppercase letter, at least one digit
const isStrongPassword = pass => pass.length >= 8 && /[A-Z]/.test(pass) && /[0-9]/.test(pass); 

// NULL/EMPTY CHECK - Ensures value is not empty, null, or undefined
// Useful for form validation and data verification
const isNotEmpty = value => value !== "" && value !== null && value !== undefined; 

// TEST EMAIL GENERATOR - Creates unique email addresses for testing
// Uses current timestamp to ensure uniqueness
const generateTestEmail = () => `test${Date.now()}@example.com`; 

// TEST ID GENERATOR - Creates unique identifiers with prefix
// Combines prefix, timestamp, and random number for uniqueness
// Default prefix is "TEST" if none provided
const generateTestId = (prefix = "TEST") => 
    `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`; 

// LOGGING UTILITY OBJECT - Provides formatted console logging
// Creates visual distinction between different log types using emojis
const log = { 
    // Info messages - general information
    info: msg => console.log(`📋 ${msg}`), 
    // Success messages - operations that completed successfully
    success: msg => console.log(`✅ ${msg}`), 
    // Error messages - failures and exceptions
    error: msg => console.log(`❌ ${msg}`), 
    // Warning messages - potential issues or important notices
    warning: msg => console.log(`⚠️  ${msg}`) 
}; 

// ==========================================
// ARRAY METHODS WITH ARROW FUNCTIONS
// ==========================================

// SAMPLE TEST DATA - Array of test result objects
// Simulates automated test results with id, name, status, and duration
const testData = [ 
    { id: 1, name: "Login Test", status: "passed", duration: 2.5 }, 
    { id: 2, name: "Search Test", status: "failed", duration: 1.8 }, 
    { id: 3, name: "Checkout Test", status: "passed", duration: 4.2 }, 
    { id: 4, name: "Payment Test", status: "passed", duration: 3.1 } 
]; 

// FILTER METHOD - Creates new array with elements that match condition
// Returns only tests where status equals "failed"
const failedTests = testData.filter(test => test.status === "failed"); 
log.info(`Failed tests: ${failedTests.length}`); 

// MAP METHOD - Transforms each element in array
// Extracts just the 'name' property from each test object
const testNames = testData.map(test => test.name); 
log.info(`Test names: ${testNames.join(", ")}`); 

// REDUCE METHOD - Accumulates array values into single result
// Sums all test durations, starting with initial value of 0
const totalDuration = testData.reduce((sum, test) => sum + test.duration, 0); 
// Calculate average by dividing total by number of tests
const avgDuration = totalDuration / testData.length; 
log.info(`Average duration: ${avgDuration.toFixed(2)}s`); 

// REDUCE FOR COMPARISON - Find item with maximum value
// Compares each test's duration to find the slowest one
// Returns the test object with longest duration
const slowestTest = testData.reduce((slowest, test) =>  
    test.duration > slowest.duration ? test : slowest 
); 
log.info(`Slowest test: ${slowestTest.name} (${slowestTest.duration}s)`); 

// ==========================================
// CONFIGURATION PATTERNS
// ==========================================

// CONFIGURATION BUILDER - Creates test config with defaults
// Uses destructuring with default values for flexible configuration
// If no parameters provided, uses all defaults
const createTestConfig = ({ 
    browser = "chrome",          // Default browser
    headless = true,             // Run without UI by default
    timeout = 30000,             // 30 second default timeout
    viewport = { width: 1920, height: 1080 }  // Full HD default resolution
} = {}) => ({  // Empty object default allows calling with no params
    browser, 
    headless, 
    timeout, 
    viewport, 
    id: generateTestId("CONFIG")  // Auto-generate unique config ID
}); 

// USAGE EXAMPLE 1 - Using all default values
// Call with no arguments to get default configuration
const defaultConfig = createTestConfig(); 
log.info(`Default browser: ${defaultConfig.browser}`); 

// USAGE EXAMPLE 2 - Custom configuration with overrides
// Only specify values you want to change, rest use defaults
const customConfig = createTestConfig({ 
    browser: "firefox",          // Override browser
    headless: false,             // Override headless mode
    viewport: { width: 1366, height: 768 }  // Override viewport
    // timeout will use default value of 30000
}); 
log.info(`Custom browser: ${customConfig.browser}`); 

// ==========================================
// HIGHER-ORDER FUNCTIONS
// ==========================================

// RETRY HANDLER FACTORY - Function that returns a function
// Creates reusable retry logic for flaky operations
// Parameters: maxAttempts (how many tries), delay (wait between tries)
const createRetryHandler = (maxAttempts = 3, delay = 1000) => { 
    // Returns a new function that will execute the retry logic
    return (action) => { 
        // Loop through each attempt
        for (let attempt = 1; attempt <= maxAttempts; attempt++) { 
            log.info(`Attempt ${attempt}/${maxAttempts}`); 
             
            try { 
                // Execute the action (passed as parameter)
                const result = action(); 
                // Check if action succeeded (not explicitly false)
                if (result.success !== false) { 
                    log.success("Action succeeded!"); 
                    return result;  // Return successful result
                } 
            } catch (error) { 
                // Log error but continue to next attempt
                log.error(`Attempt ${attempt} failed: ${error.message}`); 
            } 
             
            // Wait before retrying (but not after last attempt)
            if (attempt < maxAttempts) { 
                log.info(`Waiting ${delay}ms before retry...`); 
            } 
        } 
         
        // All attempts failed - throw error
        throw new Error(`Action failed after ${maxAttempts} attempts`); 
    }; 
}; 

// ==========================================
// PRACTICAL DEMONSTRATION
// ==========================================

log.info("\n=== ARROW FUNCTIONS DEMONSTRATION ===\n"); 

// TEST USER DATA - Sample user object for validation
const testUser = { 
    email: "test@example.com", 
    password: "Password123", 
    username: "testuser" 
}; 

// VALIDATE USER DATA - Check each field against validation rules
log.info("Validating test user:"); 
log.info(`Email valid: ${isEmail(testUser.email)}`); 
log.info(`Password strong: ${isStrongPassword(testUser.password)}`); 
log.info(`Username not empty: ${isNotEmpty(testUser.username)}`); 

// GENERATE NEW TEST DATA - Create unique test identifiers
const newEmail = generateTestEmail(); 
const testId = generateTestId("USER"); 
log.info(`\nGenerated email: ${newEmail}`); 
log.info(`Generated ID: ${testId}`); 

// CALCULATE TEST SUMMARY - Aggregate test results
// Filter to get only passed tests
const passedTests = testData.filter(test => test.status === "passed"); 
log.info(`\nTest Summary:`); 
log.info(`Total: ${testData.length} | Passed: ${passedTests.length} | Failed: ${failedTests.length}`); 
log.info(`Total duration: ${totalDuration.toFixed(1)}s`);