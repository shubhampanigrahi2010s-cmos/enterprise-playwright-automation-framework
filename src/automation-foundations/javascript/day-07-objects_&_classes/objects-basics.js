// ========================================== 
// 1. CREATING OBJECTS 
// ========================================== 

// Print section header to console for organization
console.log("=== CREATING OBJECTS ===\n"); 

// Method 1: Object literal (most common and easiest way to create objects)
// Use curly braces {} to define an object with properties
const testConfig = { 
    browser: 'chrome',        // Property: browser name as a string
    headless: true,           // Property: boolean indicating if browser runs without UI
    timeout: 30000,           // Property: timeout duration in milliseconds
    viewport: {               // Property: nested object for viewport settings
        width: 1920,          // Nested property: screen width in pixels
        height: 1080          // Nested property: screen height in pixels
    } 
}; 

// Output the entire testConfig object to see its structure
console.log("Test Config:", testConfig); 

// Method 2: Using new Object() constructor (less common, more verbose)
// Creates an empty object first
const testResult = new Object(); 

// Add properties one by one using dot notation
testResult.testName = "Login Test";  // Assign string value to testName property
testResult.status = "passed";        // Assign status as "passed"
testResult.duration = 2.5;            // Assign numeric value for duration in seconds

// Display the testResult object with all added properties
console.log("Test Result:", testResult); 

// Method 3: Object.create() - Creates object with specified prototype
// First, create a base object that will serve as prototype
const baseTest = { 
    status: "pending",        // Default status property
    run() {                   // Method that can be inherited by child objects
        console.log("Running test...");  // Logs when run method is called
    } 
}; 

// Create new object with baseTest as its prototype (inherits its properties)
const loginTest = Object.create(baseTest); 
// Add a specific property to loginTest (doesn't affect baseTest)
loginTest.name = "Login"; 
// loginTest can access both 'name' (own) and 'status'/'run()' (inherited) properties
console.log("Login Test:", loginTest); 

// ========================================== 
// 2. ACCESSING OBJECT PROPERTIES 
// ========================================== 

// Print section header
console.log("\n=== ACCESSING PROPERTIES ===\n"); 

// Create a user object with multiple properties
const user = { 
    username: 'testuser',           // String property for username
    email: 'test@example.com',      // String property for email
    role: 'admin',                  // String property for user role
    age: 25                         // Number property for age
}; 

// Dot notation - Direct access using property name (most common)
console.log("Username:", user.username);  // Accesses username using dot notation
console.log("Email:", user.email);        // Accesses email using dot notation

// Bracket notation - Access using string inside brackets
// Useful when property name is in a variable or contains special characters
console.log("Role:", user['role']);       // Accesses role using bracket notation

// Dynamic property access - Store property name in a variable
const property = 'age';                   // Variable holding property name
console.log("Age:", user[property]);      // Access property using variable

// Checking if property exists using 'in' operator
// Returns true if property exists, false otherwise
console.log("Has 'email'?", 'email' in user);  // true - email exists
console.log("Has 'phone'?", 'phone' in user);  // false - phone doesn't exist

// ========================================== 
// 3. ADDING, UPDATING, DELETING PROPERTIES 
// ========================================== 

// Print section header
console.log("\n=== MODIFYING OBJECTS ===\n"); 

// Create initial object with two properties
const testData = { 
    id: 'TC001',              // Test case ID
    name: 'Login Test'        // Test case name
}; 

// Add new properties to existing object using dot notation
testData.status = 'passed';   // Adds 'status' property with value 'passed'
testData.duration = 3.2;      // Adds 'duration' property with value 3.2
console.log("Added properties:", testData);  // Shows object with 4 properties now

// Update existing property by reassigning value
testData.status = 'failed';   // Changes status from 'passed' to 'failed'
console.log("Updated status:", testData.status);  // Shows new status value

// Delete property from object using delete operator
delete testData.duration;     // Removes 'duration' property completely
console.log("After delete:", testData);  // Shows object without duration property

// ========================================== 
// 4. OBJECT METHODS 
// ========================================== 

// Print section header
console.log("\n=== OBJECT METHODS ===\n"); 

// Create calculator object with methods (functions inside objects)
const calculator = { 
    value: 0,                 // Property to store current calculation value
    
    // Method to add a number to current value
    add(num) { 
        this.value += num;    // 'this' refers to calculator object, adds num to value
        return this;          // Return the object itself to enable method chaining
    }, 
    
    // Method to subtract a number from current value
    subtract(num) { 
        this.value -= num;    // Subtracts num from current value
        return this;          // Return this for chaining
    }, 
    
    // Method to multiply current value by a number
    multiply(num) { 
        this.value *= num;    // Multiplies current value by num
        return this;          // Return this for chaining
    }, 
    
    // Method to get the final result
    getResult() { 
        return this.value;    // Simply returns current value
    }, 
    
    // Method to reset calculator to 0
    reset() { 
        this.value = 0;       // Sets value back to 0
        return this;          // Return this for chaining
    } 
}; 

// Method chaining - Call multiple methods in sequence
// Executes: add(10) -> value=10, multiply(2) -> value=20, subtract(5) -> value=15
const result = calculator.add(10).multiply(2).subtract(5).getResult(); 
console.log("Calculation result:", result);  // Outputs: 15

// Reset calculator back to 0
calculator.reset(); 
console.log("After reset:", calculator.value);  // Outputs: 0

// ========================================== 
// 5. NESTED OBJECTS 
// ========================================== 

// Print section header
console.log("\n=== NESTED OBJECTS ===\n"); 

// Create object with nested objects (objects inside objects)
const testReport = { 
    suiteName: 'Login Tests',     // Top-level property
    environment: 'staging',        // Top-level property
    browser: {                     // Nested object for browser details
        name: 'chrome',            // Property inside browser object
        version: '120.0',          // Property inside browser object
        headless: true             // Property inside browser object
    }, 
    results: {                     // Nested object for test results
        total: 10,                 // Total number of tests
        passed: 8,                 // Number of passed tests
        failed: 2,                 // Number of failed tests
        passRate: 80               // Pass percentage
    }, 
    metadata: {                    // Nested object for timing information
        startTime: '2025-12-19T10:00:00Z',  // ISO format start time
        endTime: '2025-12-19T10:05:00Z',    // ISO format end time
        duration: 300              // Duration in seconds
    } 
}; 

// Accessing nested properties using dot notation
// Chain dots to go deeper into nested structure
console.log("Browser name:", testReport.browser.name);        // Access browser.name
console.log("Pass rate:", testReport.results.passRate + "%"); // Access results.passRate
console.log("Duration:", testReport.metadata.duration + "s"); // Access metadata.duration

// Optional chaining (?.) - Safely access nested properties
// If any property in chain is undefined, returns undefined instead of error
console.log("Headless mode:", testReport.browser?.headless);  // Safe access
console.log("Non-existent:", testReport.settings?.timeout);   // undefined, no error

// ========================================== 
// 6. OBJECT DESTRUCTURING 
// ========================================== 

// Print section header
console.log("\n=== OBJECT DESTRUCTURING ===\n"); 

// Create test case object
const testCase = { 
    id: 'TC001',                      // Test ID
    name: 'Login Test',               // Test name
    status: 'passed',                 // Test status
    duration: 2.5,                    // Duration in seconds
    tags: ['smoke', 'critical']       // Array of tags
}; 

// Destructuring - Extract multiple properties in one line
// Creates variables with same names as properties
const { id, name, status } = testCase;  // Creates id, name, status variables
console.log(`Test ${id}: ${name} - ${status}`);  // Use extracted variables

// Rename while destructuring using colon
// Extract 'duration' but store it in variable named 'executionTime'
const { duration: executionTime } = testCase; 
console.log("Execution time:", executionTime);  // Uses new variable name

// Default values in destructuring
// If 'retries' doesn't exist in testCase, use default value 3
const { retries = 3 } = testCase; 
console.log("Retries:", retries);  // Outputs: 3 (default value)

// Nested destructuring - Extract from nested objects
const config = { 
    browser: {                        // Nested browser object
        name: 'firefox',              // Browser name
        options: {                    // Further nested options object
            headless: true,           // Headless option
            slowMo: 100               // Slow motion option
        } 
    } 
}; 

// Extract nested properties and rename them
// browser.name -> browserName, browser.options.headless -> headless
const { browser: { name: browserName, options: { headless } } } = config; 
console.log(`Browser: ${browserName}, Headless: ${headless}`);  // Use extracted values

// ========================================== 
// 7. USEFUL OBJECT METHODS 
// ========================================== 

// Print section header
console.log("\n=== OBJECT METHODS ===\n"); 

// Create element object for demonstration
const element = { 
    selector: '#login-btn',   // CSS selector
    type: 'button',           // Element type
    text: 'Login',            // Button text
    visible: true             // Visibility flag
}; 

// Object.keys() - Returns array of all property names (keys)
const keys = Object.keys(element); 
console.log("Keys:", keys);  // Outputs: ['selector', 'type', 'text', 'visible']

// Object.values() - Returns array of all property values
const values = Object.values(element); 
console.log("Values:", values);  // Outputs: ['#login-btn', 'button', 'Login', true]

// Object.entries() - Returns array of [key, value] pairs
const entries = Object.entries(element); 
console.log("Entries:", entries);  // Outputs: [['selector', '#login-btn'], ...]

// Iterating over object using for...of loop with Object.entries()
console.log("\nElement properties:"); 
// Destructure each entry into key and value
for (const [key, value] of Object.entries(element)) { 
    console.log(`  ${key}: ${value}`);  // Print each key-value pair
} 

// Object.assign() - Merge multiple objects into one
const defaults = { timeout: 30000, retries: 3 };     // Default settings
const custom = { timeout: 60000, headless: true };   // Custom overrides

// Merge: {} (empty target) <- defaults <- custom (last one wins for duplicates)
const merged = Object.assign({}, defaults, custom); 
console.log("\nMerged config:", merged);  // timeout: 60000 (from custom), retries: 3, headless: true

// Spread operator (...) - Modern way to merge objects (preferred)
// Same result as Object.assign but cleaner syntax
const spreadMerged = { ...defaults, ...custom };  // Spread both objects
console.log("Spread merged:", spreadMerged);  // Same result as above

// ========================================== 
// 8. PRACTICAL AUTOMATION EXAMPLE 
// ========================================== 

// Print section header
console.log("\n=== PRACTICAL EXAMPLE ===\n"); 

// Test execution tracker object - Practical real-world example
const testExecution = { 
    // Generate unique run ID using current timestamp
    runId: `run_${Date.now()}`,              // e.g., "run_1703001234567"
    
    // Store start time in ISO format
    startTime: new Date().toISOString(),     // e.g., "2025-01-02T10:30:00.000Z"
    
    // Array to store all test results
    tests: [],                                // Initially empty array
    
    // Method to add a test result to the tests array
    addTest(testData) { 
        // Push new test object to tests array
        this.tests.push({ 
            ...testData,                      // Spread operator: copy all properties from testData
            timestamp: new Date().toISOString()  // Add timestamp to each test
        }); 
    }, 
    
    // Method to calculate and return statistics
    getStats() { 
        const total = this.tests.length;      // Count total number of tests
        
        // Filter tests array to count only passed tests
        const passed = this.tests.filter(t => t.status === 'passed').length; 
        
        const failed = total - passed;        // Calculate failed tests
        
        // Calculate pass rate as percentage, handle division by zero
        const passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : 0; 
        
        // Return stats object
        return { total, passed, failed, passRate }; 
    }, 
    
    // Method to generate human-readable summary string
    getSummary() { 
        const stats = this.getStats();        // Call getStats to get statistics
        
        // Create formatted summary string using template literals
        return `Tests: ${stats.total} | Passed: ${stats.passed} | Failed: ${stats.failed} | Pass Rate: ${stats.passRate}%`; 
    } 
}; 

// Add first test result - Login Test (passed)
testExecution.addTest({ 
    name: 'Login Test',      // Test name
    status: 'passed',        // Test passed
    duration: 2.5            // Took 2.5 seconds
}); 

// Add second test result - Search Test (passed)
testExecution.addTest({ 
    name: 'Search Test',     // Test name
    status: 'passed',        // Test passed
    duration: 1.8            // Took 1.8 seconds
}); 

// Add third test result - Checkout Test (failed)
testExecution.addTest({ 
    name: 'Checkout Test',   // Test name
    status: 'failed',        // Test failed
    duration: 3.2            // Took 3.2 seconds
}); 

// Display formatted summary of all test results
console.log("Test Summary:", testExecution.getSummary()); 

// Display complete array of all test objects with all details
console.log("All tests:", testExecution.tests);