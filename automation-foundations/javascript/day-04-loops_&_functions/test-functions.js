// ============================================================================
// FUNCTION BASICS
// ============================================================================
// Functions are reusable blocks of code that perform specific tasks
// They help organize code, reduce repetition, and make testing easier
// Key concepts: parameters, return values, scope, and reusability

// ============================================================================
// Function with parameters and return value
// ============================================================================
// This function simulates a login process in test automation
// Parameters: email, password, expectedPage (with default value "Dashboard")
// Returns: An object containing success status, message, and optional user data
function performLogin(email, password, expectedPage = "Dashboard") {
    // Log the login attempt details for debugging/reporting
    console.log(`🔐 Login Attempt:`);
    console.log(`   Email: ${email}`);
    
    // Security: Hide password in logs by replacing each character with asterisk
    // password.length gives us the number of characters
    // "*".repeat(n) creates a string of n asterisks
    console.log(`   Password: ${"*".repeat(password.length)}`);
    
    // ========================================================================
    // INPUT VALIDATION: Check if inputs are valid before proceeding
    // ========================================================================
    
    // Check if email contains "@" symbol (basic email validation)
    // If invalid, immediately return (early return pattern) with error object
    if (!email.includes("@")) {
        return { success: false, message: "Invalid email format" };
        // Function exits here if condition is true, code below won't run
    }
    
    // Check if password is at least 6 characters long
    // Another early return for invalid input
    if (password.length < 6) {
        return { success: false, message: "Password too short" };
    }
    
    // ========================================================================
    // SIMULATE LOGIN PROCESS: Log the steps that would happen in real automation
    // ========================================================================
    
    console.log(`   → Navigating to login page`);
    // In real automation: await page.goto('https://example.com/login')
    
    console.log(`   → Filling credentials`);
    // In real automation: await page.fill('#email', email)
    //                     await page.fill('#password', password)
    
    console.log(`   → Clicking submit`);
    // In real automation: await page.click('#login-button')
    
    // ========================================================================
    // SIMULATE DIFFERENT OUTCOMES: Check if credentials are correct
    // ========================================================================
    
    // Use strict equality (===) to check both email AND password match
    // && means BOTH conditions must be true
    const success = email === "admin@test.com" && password === "Admin123";
    
    // Branch based on success/failure
    if (success) {
        // SUCCESS PATH: Login worked
        console.log(`   → Redirecting to ${expectedPage}`);
        
        // Return an object with multiple properties
        // This gives the caller detailed information about the result
        return {
            success: true,
            message: `Successfully logged in to ${expectedPage}`,
            userRole: "admin" // Additional data that might be useful
        };
    } else {
        // FAILURE PATH: Login failed
        return {
            success: false,
            message: "Invalid credentials"
        };
    }
}

// ============================================================================
// Function for page validation
// ============================================================================
// This function verifies that a web page is in the expected state
// Takes two objects: current page state and expected page state
// Returns: An object summarizing validation results
function validatePage(pageState, expectedState) {
    console.log("\n🔍 Page Validation:");
    
    // Initialize a results object to track validation outcomes
    // This will be populated as we perform checks and returned at the end
    const results = {
        passed: 0,      // Count of successful checks
        failed: 0,      // Count of failed checks
        issues: []      // Array to store descriptions of problems found
    };
    
    // ========================================================================
    // CHECK 1: Validate page title
    // ========================================================================
    
    // Compare actual title with expected title using strict equality
    if (pageState.title === expectedState.title) {
        console.log(`   ✓ Title: "${pageState.title}"`);
        results.passed++; // Increment pass counter
    } else {
        // Title doesn't match - log detailed error and record failure
        console.log(`   ✗ Title mismatch: Expected "${expectedState.title}", got "${pageState.title}"`);
        results.failed++; // Increment fail counter
        results.issues.push("Title mismatch"); // Add to issues array
    }
    
    // ========================================================================
    // CHECK 2: Validate URL contains expected segment
    // ========================================================================
    
    // Use .includes() to check if URL contains the expected substring
    // More flexible than exact match (handles query params, etc.)
    if (pageState.url.includes(expectedState.urlSegment)) {
        console.log(`   ✓ URL contains: "${expectedState.urlSegment}"`);
        results.passed++;
    } else {
        console.log(`   ✗ URL issue: ${pageState.url}`);
        results.failed++;
        results.issues.push("URL issue");
    }
    
    // ========================================================================
    // CHECK 3: Validate minimum number of elements on page
    // ========================================================================
    
    // Use >= (greater than or equal) to ensure minimum threshold is met
    // Useful for checking that a page fully loaded
    if (pageState.elementCount >= expectedState.minElements) {
        console.log(`   ✓ Elements: ${pageState.elementCount} (min: ${expectedState.minElements})`);
        results.passed++;
    } else {
        console.log(`   ✗ Insufficient elements: ${pageState.elementCount}`);
        results.failed++;
        results.issues.push("Element count low");
    }
    
    // Return the complete results object
    // Caller can use this to decide if test passed/failed
    return results;
}

// ============================================================================
// Function for test reporting
// ============================================================================
// Generates a formatted test report showing which steps passed/failed
// Parameters: test name, array of test steps, duration in seconds
// Returns: Summary object with test results
function generateTestReport(testName, testSteps, duration) {
    // Create a visual separator using repeated "=" characters
    // "=".repeat(60) creates a string of 60 equal signs
    console.log("\n" + "=".repeat(60));
    console.log(`📊 TEST REPORT: ${testName}`);
    console.log("=".repeat(60));
    
    // Initialize counters for passed and failed steps
    let passedSteps = 0;
    let failedSteps = 0;
    
    // ========================================================================
    // ITERATE THROUGH TEST STEPS: Process each step and display status
    // ========================================================================
    
    // forEach() is an array method that runs a function for each element
    // Parameters: (element, index) where element is the current item
    testSteps.forEach((step, index) => {
        // Determine which symbol to use based on pass/fail
        // Ternary operator: condition ? valueIfTrue : valueIfFalse
        const status = step.passed ? "✓" : "✗";
        
        // Display step number (index + 1 since arrays are 0-indexed)
        console.log(`${status} Step ${index + 1}: ${step.description}`);
        
        // Update our counters based on whether step passed
        if (step.passed) {
            passedSteps++;
        } else {
            failedSteps++;
            
            // If there's an error message, display it indented
            // This provides additional context for failures
            if (step.error) {
                console.log(`    Error: ${step.error}`);
            }
        }
    });
    
    // ========================================================================
    // CALCULATE SUMMARY STATISTICS
    // ========================================================================
    
    // Get total number of steps
    const totalSteps = testSteps.length;
    
    // Calculate pass percentage
    // (passedSteps / totalSteps) gives decimal (e.g., 0.8)
    // * 100 converts to percentage (e.g., 80)
    // .toFixed(1) rounds to 1 decimal place (e.g., "80.0")
    const passPercentage = ((passedSteps / totalSteps) * 100).toFixed(1);
    
    // ========================================================================
    // DISPLAY SUMMARY
    // ========================================================================
    
    console.log("\n" + "-".repeat(60)); // Separator line
    console.log(`RESULTS: ${passedSteps}/${totalSteps} steps passed (${passPercentage}%)`);
    
    // Display duration rounded to 2 decimal places
    console.log(`DURATION: ${duration.toFixed(2)} seconds`);
    
    // Overall test status: PASSED only if ALL steps passed (failedSteps === 0)
    console.log(`STATUS: ${failedSteps === 0 ? "PASSED ✅" : "FAILED ❌"}`);
    console.log("=".repeat(60));
    
    // Return a summary object that can be used for further processing
    // (e.g., saving to database, sending notifications, generating reports)
    return {
        name: testName,
        passedSteps,
        failedSteps,
        passPercentage,
        duration,
        status: failedSteps === 0 ? "PASSED" : "FAILED"
    };
}

// ============================================================================
// Function for generating test data
// ============================================================================
// Creates realistic test data for different entity types
// Useful for creating test accounts, products, etc. during automation
// Parameters: dataType (string), count (number with default value of 1)
// Returns: Array of generated data objects
function generateTestData(dataType, count = 1) {
    // Initialize empty array to store generated data
    const data = [];
    
    // ========================================================================
    // LOOP THROUGH: Generate 'count' number of data objects
    // ========================================================================
    
    // Start at 1 (not 0) since we use i in generated values like "user1"
    for (let i = 1; i <= count; i++) {
        // Create base data that all types will have
        // Date.now() gives current timestamp in milliseconds (ensures uniqueness)
        const baseData = {
            id: Date.now() + i, // Unique ID by adding index to timestamp
            timestamp: new Date().toISOString() // ISO format: "2024-01-15T10:30:00.000Z"
        };
        
        // ====================================================================
        // SWITCH STATEMENT: Generate different data based on type
        // ====================================================================
        // Switch is useful when you have multiple distinct cases
        // Better than multiple if-else when checking one variable
        
        switch (dataType) {
            case "user":
                // ============================================================
                // Generate USER data
                // ============================================================
                data.push({
                    ...baseData, // Spread operator: copies all properties from baseData
                    
                    // Generate unique username using timestamp
                    username: `testuser_${i}_${Date.now()}`,
                    
                    // Generate unique email (timestamp ensures uniqueness)
                    email: `user${i}@test${Date.now()}.com`,
                    
                    // Generate password with index and last 4 digits of timestamp
                    // .slice(-4) gets last 4 characters
                    password: `TestPass${i}!${Date.now().toString().slice(-4)}`,
                    
                    // First user is admin, rest are regular users
                    // Ternary operator for conditional assignment
                    role: i === 1 ? "admin" : "user"
                });
                break; // Exit switch after this case
                
            case "product":
                // ============================================================
                // Generate PRODUCT data
                // ============================================================
                data.push({
                    ...baseData,
                    
                    name: `Test Product ${i}`,
                    
                    // SKU (Stock Keeping Unit) with timestamp for uniqueness
                    sku: `SKU-${Date.now()}-${i}`,
                    
                    // Random price between $10 and $110
                    // Math.random() gives 0 to 1
                    // * 100 gives 0 to 100
                    // + 10 gives 10 to 110
                    // .toFixed(2) rounds to 2 decimal places for currency
                    price: (Math.random() * 100 + 10).toFixed(2),
                    
                    // Cycle through categories using modulo operator
                    // i % 3 gives remainder: 0, 1, 2, 0, 1, 2...
                    // So products are evenly distributed across categories
                    category: ["Electronics", "Clothing", "Home"][i % 3]
                });
                break;
                
            default:
                // ============================================================
                // FALLBACK: Generate generic data for unknown types
                // ============================================================
                // 'default' case handles all other values of dataType
                data.push({ 
                    ...baseData, 
                    type: "generic", 
                    value: `Test Data ${i}` 
                });
        }
    }
    
    // Return the complete array of generated data
    return data;
}

// ============================================================================
// Function with retry logic
// ============================================================================
// Executes an action multiple times if it fails (common in flaky tests)
// Parameters: 
//   - action: a function to execute (function as parameter!)
//   - actionName: string describing the action (for logging)
//   - maxRetries: maximum attempts (default 3)
// Returns: boolean indicating ultimate success or failure
function executeWithRetry(action, actionName, maxRetries = 3) {
    console.log(`\n🔄 Attempting: ${actionName}`);
    
    // ========================================================================
    // RETRY LOOP: Try the action up to maxRetries times
    // ========================================================================
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        console.log(`  Attempt ${attempt}/${maxRetries}:`);
        
        // ====================================================================
        // TRY-CATCH: Handle errors gracefully without crashing
        // ====================================================================
        // try block: code that might throw an error
        // catch block: code to run if an error occurs
        
        try {
            // Execute the action (it's a function passed as parameter)
            // This is a callback - we're calling a function that was passed to us
            const result = action();
            
            // Check if action succeeded
            // !== false allows for truthy values or objects with success: true
            if (result.success !== false) {
                console.log(`  ✓ ${actionName} successful`);
                return true; // Exit function immediately on success
            } else {
                // Action returned failure result
                console.log(`  ✗ Failed: ${result.message || "Unknown error"}`);
                // || operator: use message if it exists, otherwise "Unknown error"
            }
        } catch (error) {
            // Catch block runs if action() throws an error
            // error.message contains the error description
            console.log(`  ✗ Error: ${error.message}`);
        }
        
        // ====================================================================
        // WAIT BEFORE RETRY: Implement progressive backoff
        // ====================================================================
        
        // Only wait if this isn't the last attempt
        if (attempt < maxRetries) {
            // Wait time increases with each attempt (1000ms, 2000ms, 3000ms)
            // This is called "linear backoff" (could be exponential too)
            const waitTime = attempt * 1000;
            console.log(`  ⏳ Waiting ${waitTime}ms before retry...`);
            // In real code: await new Promise(resolve => setTimeout(resolve, waitTime))
        }
    }
    
    // ========================================================================
    // ALL RETRIES FAILED: Log final failure and return false
    // ========================================================================
    
    console.log(`  ❌ ${actionName} failed after ${maxRetries} attempts`);
    return false; // Indicate ultimate failure
}

// ============================================================================
// DEMONSTRATION SECTION
// ============================================================================
// This section demonstrates how to use all the functions we created above
// In real automation, these would be in separate test files

console.log("🧪 TEST FUNCTION LIBRARY DEMONSTRATION");
console.log("=".repeat(50));

// ============================================================================
// 1. Test login function
// ============================================================================
console.log("\n1. Testing Login Function:");

// Call performLogin() and store the returned object
const loginResult = performLogin("admin@test.com", "Admin123", "Admin Dashboard");

// Access properties from the returned object
console.log(`   Result: ${loginResult.success ? "✅ Success" : "❌ Failed"}`);
console.log(`   Message: ${loginResult.message}`);

// ============================================================================
// 2. Generate test data
// ============================================================================
console.log("\n2. Generating Test Data:");

// Call generateTestData() to create 3 user objects
const testUsers = generateTestData("user", 3);

console.log(`   Generated ${testUsers.length} test users:`);

// Iterate through the generated users and display them
testUsers.forEach(user => {
    console.log(`   - ${user.username} (${user.email})`);
});

// ============================================================================
// 3. Validate page
// ============================================================================
console.log("\n3. Page Validation:");

// Create an object representing the current page state
// In real automation, this would come from browser queries
const pageState = {
    title: "Checkout - MyStore",
    url: "https://mystore.com/checkout/payment",
    elementCount: 8
};

// Create an object representing what we expect the page to be
const expectedState = {
    title: "Checkout - MyStore",
    urlSegment: "checkout",
    minElements: 7
};

// Call validatePage() and store the validation results
const validation = validatePage(pageState, expectedState);

// Display summary of validation results
console.log(`   Validation: ${validation.passed} passed, ${validation.failed} failed`);

// ============================================================================
// 4. Generate test report
// ============================================================================
console.log("\n4. Generating Test Report:");

// Create an array of test step objects
// Each step has a description, pass/fail status, and optional error
const testSteps = [
    { description: "Navigate to login page", passed: true },
    { description: "Enter valid credentials", passed: true },
    { description: "Click login button", passed: true },
    { description: "Verify dashboard loads", passed: false, error: "Timeout" },
    { description: "Check user menu", passed: true }
];

// Call generateTestReport() to create formatted output
// The function also returns a summary object (we're not storing it here)
generateTestReport("User Login Flow", testSteps, 12.5);

// ============================================================================
// KEY CONCEPTS DEMONSTRATED:
// ============================================================================
// 1. FUNCTION DECLARATION: function name(params) { body }
//
// 2. PARAMETERS: Input values passed to functions
//    - Required parameters: email, password
//    - Optional parameters with defaults: expectedPage = "Dashboard"
//
// 3. RETURN VALUES: Functions can return data back to caller
//    - Primitive values: true, false, numbers, strings
//    - Objects: { success: true, message: "..." }
//    - Arrays: [user1, user2, user3]
//
// 4. EARLY RETURN: Exit function immediately when condition is met
//    - Improves readability by handling edge cases first
//    - Reduces nesting of if-else statements
//
// 5. OBJECT MANIPULATION:
//    - Creating objects: { key: value }
//    - Accessing properties: object.property
//    - Spread operator: { ...baseData, newProp: value }
//
// 6. ARRAY METHODS:
//    - .push() - add items to array
//    - .forEach() - iterate through array
//    - .length - get array size
//
// 7. HIGHER-ORDER FUNCTIONS:
//    - Functions as parameters: executeWithRetry(action, ...)
//    - Callbacks: calling a function passed as parameter
//
// 8. ERROR HANDLING:
//    - try-catch blocks for graceful error handling
//    - Prevents crashes, allows recovery
//
// 9. SWITCH STATEMENTS:
//    - Cleaner than multiple if-else for checking one variable
//    - Don't forget 'break' to exit each case!
//
// 10. CODE ORGANIZATION:
//     - Functions make code reusable and testable
//     - Each function has a single, clear responsibility
//     - Functions can call other functions (composition)
//
// 11. REAL-WORLD APPLICATIONS:
//     - Login automation with validation
//     - Test data generation for multiple test runs
//     - Page state verification
//     - Test reporting and metrics
//     - Retry logic for flaky tests
// ============================================================================