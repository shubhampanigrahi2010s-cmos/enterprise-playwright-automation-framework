// ============================================================================
// OBJECT-ORIENTED PROGRAMMING: Classes in JavaScript
// ============================================================================
// Classes are blueprints for creating objects with shared properties and methods
// They help organize related data and functionality into reusable components
// Key OOP concepts: encapsulation, methods, state management, this keyword

// ============================================================================
// Simple test framework class
// ============================================================================
// This class encapsulates all the functionality needed to run and track tests
// It maintains state (test results, current test) and provides methods to interact with it
class TestFramework {
    // ========================================================================
    // CONSTRUCTOR: Special method that runs when creating a new instance
    // ========================================================================
    // Called automatically when you write: new TestFramework({...})
    // Purpose: Initialize the object's properties (its "state")
    // Parameter: config object with optional settings (has default empty object)
    constructor(config = {}) {
        // ====================================================================
        // Initialize configuration with defaults
        // ====================================================================
        // this.config refers to THIS instance's configuration property
        // "this" keyword refers to the current object instance
        this.config = {
            // Use provided environment or default to "staging"
            // || operator: if config.environment is falsy, use "staging"
            environment: config.environment || "staging",
            
            // Use provided browser or default to "chrome"
            browser: config.browser || "chrome",
            
            // Spread operator (...config) copies any additional properties
            // This allows users to pass extra config options we didn't explicitly define
            // Must come last to avoid being overwritten by defaults above
            ...config
        };
        
        // ====================================================================
        // Initialize instance properties (the object's "state")
        // ====================================================================
        
        // Array to store all completed test results
        // Persists across multiple tests during the framework's lifetime
        this.testResults = [];
        
        // Tracks the currently running test
        // null when no test is active, object when test is running
        this.currentTest = null;
    }
    
    // ========================================================================
    // METHOD: startTest() - Begin a new test
    // ========================================================================
    // Methods are functions that belong to a class
    // They can access the instance's properties using "this"
    startTest(testName) {
        // Create a new test object to track this test's execution
        // This becomes the "current test" that other methods will reference
        this.currentTest = {
            name: testName,              // Name of the test
            steps: [],                   // Array to collect test steps
            startTime: Date.now(),       // Timestamp when test started (milliseconds)
            status: "RUNNING"            // Initial status
        };
        
        // ====================================================================
        // Display test header with visual formatting
        // ====================================================================
        
        // "\n" creates a blank line for visual separation
        console.log(`\n${"═".repeat(60)}`);
        // "═".repeat(60) creates a string of 60 double-line characters
        
        console.log(`🚀 STARTING TEST: ${testName}`);
        
        // Display configuration info using this.config
        // "this" gives us access to the instance's properties
        console.log(`   Environment: ${this.config.environment}`);
        console.log(`   Browser: ${this.config.browser}`);
        
        console.log(`${"═".repeat(60)}`);
    }
    
    // ========================================================================
    // METHOD: logStep() - Record and execute a test step
    // ========================================================================
    // Parameters:
    //   - description: string describing what this step does
    //   - action: optional function to execute (callback pattern)
    logStep(description, action) {
        // ====================================================================
        // GUARD CLAUSE: Ensure a test is active before logging steps
        // ====================================================================
        // Prevents errors if someone calls logStep() without calling startTest() first
        if (!this.currentTest) {
            console.log("⚠️  No active test - call startTest() first");
            return; // Exit method early (defensive programming)
        }
        
        // Calculate step number based on how many steps we've already logged
        // .length gives us the count, +1 because we're adding a new step
        const stepNumber = this.currentTest.steps.length + 1;
        
        console.log(`\n📝 Step ${stepNumber}: ${description}`);
        
        // ====================================================================
        // TRY-CATCH: Execute the action and handle any errors gracefully
        // ====================================================================
        try {
            // Execute the action function if provided
            // If no action provided, default to success
            // Ternary operator: condition ? ifTrue : ifFalse
            // action() calls the function that was passed as a parameter (callback)
            const result = action ? action() : { success: true };
            
            // Create a step result object combining step info with action result
            const stepResult = {
                number: stepNumber,
                description,
                // Check if action failed (result.success === false)
                // !== false allows for truthy values or missing success property
                passed: result.success !== false,
                // Spread operator copies any additional properties from result
                // (like message, data, etc.)
                ...result
            };
            
            // Add this step to the current test's steps array
            // this.currentTest.steps is the array we're modifying
            this.currentTest.steps.push(stepResult);
            
            // ================================================================
            // Log step outcome and update test status if needed
            // ================================================================
            if (stepResult.passed) {
                console.log(`   ✅ PASSED`);
            } else {
                // Step failed - log details and mark entire test as failed
                console.log(`   ❌ FAILED: ${stepResult.message || "Step failed"}`);
                // || operator provides default message if none exists
                
                // Update the test's overall status to FAILED
                // Once failed, it stays failed even if later steps pass
                this.currentTest.status = "FAILED";
            }
            
            // Return the step result so caller can inspect it if needed
            return stepResult;
            
        } catch (error) {
            // ================================================================
            // CATCH BLOCK: Handle unexpected errors during step execution
            // ================================================================
            // If action() throws an error, we catch it here instead of crashing
            console.log(`   💥 ERROR: ${error.message}`);
            
            // Record the error as a failed step
            this.currentTest.steps.push({
                number: stepNumber,
                description,
                passed: false,
                error: error.message // Capture error details
            });
            
            // Mark test as failed
            this.currentTest.status = "FAILED";
            
            // Return failure info
            return { passed: false, error: error.message };
        }
    }
    
    // ========================================================================
    // METHOD: endTest() - Finalize current test and generate report
    // ========================================================================
    endTest() {
        // Guard clause: nothing to end if no test is running
        if (!this.currentTest) return;
        
        // ====================================================================
        // Calculate test duration
        // ====================================================================
        // Record when test ended
        this.currentTest.endTime = Date.now();
        
        // Calculate duration: (end - start) gives milliseconds
        // Divide by 1000 to convert to seconds
        this.currentTest.duration = (this.currentTest.endTime - this.currentTest.startTime) / 1000;
        
        // ====================================================================
        // Determine final test status if still marked as RUNNING
        // ====================================================================
        if (this.currentTest.status === "RUNNING") {
            // Use .some() array method to check if ANY step failed
            // .some() returns true if the callback returns true for any element
            const hasFailures = this.currentTest.steps.some(step => !step.passed);
            
            // Set final status based on whether there were failures
            this.currentTest.status = hasFailures ? "FAILED" : "PASSED";
        }
        
        // ====================================================================
        // Archive this test in the results history
        // ====================================================================
        // { ...this.currentTest } creates a copy of the test object
        // This prevents future modifications from affecting archived results
        this.testResults.push({ ...this.currentTest });
        
        // ====================================================================
        // Generate and display the test report
        // ====================================================================
        // Call private method (indicated by _ prefix convention)
        this._generateReport(this.currentTest);
        
        // Clear the current test (no test is active now)
        this.currentTest = null;
    }
    
    // ========================================================================
    // PRIVATE METHOD: _generateReport() - Format and display test results
    // ========================================================================
    // Convention: _ prefix indicates this is a private/internal method
    // It's meant to be called only by other methods in this class, not externally
    _generateReport(test) {
        // ====================================================================
        // Calculate test statistics
        // ====================================================================
        
        // .filter() creates a new array with only passed steps
        // Then .length gives us the count of passed steps
        const passedSteps = test.steps.filter(step => step.passed).length;
        
        const totalSteps = test.steps.length;
        
        // Calculate pass rate as percentage
        const passRate = ((passedSteps / totalSteps) * 100).toFixed(1);
        
        // ====================================================================
        // Display formatted report header
        // ====================================================================
        console.log(`\n${"═".repeat(60)}`);
        console.log(`📊 TEST COMPLETE: ${test.name}`);
        console.log(`${"═".repeat(60)}`);
        
        // ====================================================================
        // List all test steps with their status
        // ====================================================================
        // .forEach() executes a function for each step in the array
        test.steps.forEach(step => {
            // Choose icon based on pass/fail
            const status = step.passed ? "✅" : "❌";
            console.log(`${status} Step ${step.number}: ${step.description}`);
        });
        
        // ====================================================================
        // Display summary statistics
        // ====================================================================
        console.log(`\n${"─".repeat(60)}`); // Different separator for visual hierarchy
        console.log(`RESULTS: ${passedSteps}/${totalSteps} steps passed (${passRate}%)`);
        console.log(`DURATION: ${test.duration.toFixed(2)} seconds`);
        console.log(`STATUS: ${test.status === "PASSED" ? "PASSED ✅" : "FAILED ❌"}`);
        console.log(`${"═".repeat(60)}\n`);
    }
    
    // ========================================================================
    // METHOD: generateSummary() - Display summary of all tests run
    // ========================================================================
    // This provides an overview after running multiple tests
    generateSummary() {
        // Guard clause: check if any tests have been run
        if (this.testResults.length === 0) {
            console.log("No tests have been run yet.");
            return;
        }
        
        // ====================================================================
        // Calculate overall statistics across all tests
        // ====================================================================
        
        const totalTests = this.testResults.length;
        
        // Count how many tests passed using .filter()
        // .filter() keeps only tests where status === "PASSED"
        const passedTests = this.testResults.filter(test => test.status === "PASSED").length;
        
        // Calculate overall pass rate
        const passRate = ((passedTests / totalTests) * 100).toFixed(1);
        
        // ====================================================================
        // Display summary header
        // ====================================================================
        console.log(`\n${"⭐".repeat(60)}`);
        console.log(`🏁 TEST EXECUTION SUMMARY`);
        console.log(`${"⭐".repeat(60)}`);
        
        // ====================================================================
        // List all tests with their outcomes
        // ====================================================================
        // .forEach() with both element and index parameters
        this.testResults.forEach((test, index) => {
            const statusIcon = test.status === "PASSED" ? "✅" : "❌";
            // index + 1 for human-readable numbering (1, 2, 3 instead of 0, 1, 2)
            console.log(`${statusIcon} ${index + 1}. ${test.name} - ${test.duration.toFixed(2)}s`);
        });
        
        // ====================================================================
        // Display aggregate metrics
        // ====================================================================
        console.log(`\n${"─".repeat(60)}`);
        console.log(`📈 SUMMARY METRICS:`);
        console.log(`   Total Tests: ${totalTests}`);
        console.log(`   Passed: ${passedTests}`);
        console.log(`   Failed: ${totalTests - passedTests}`);
        console.log(`   Pass Rate: ${passRate}%`);
        console.log(`${"⭐".repeat(60)}\n`);
    }
}

// ============================================================================
// USAGE EXAMPLE: Demonstrating the TestFramework class
// ============================================================================

// ============================================================================
// Step 1: Create an instance of the TestFramework class
// ============================================================================
// "new" keyword creates a new object from the class blueprint
// This calls the constructor() method automatically
// We pass a configuration object to customize this instance
const framework = new TestFramework({
    environment: "staging",
    browser: "chrome"
});
// Now "framework" is an instance of TestFramework with its own state

// ============================================================================
// Step 2: Run Test 1 - User Login Flow
// ============================================================================
// Call the startTest() method on our framework instance
framework.startTest("User Login Flow");

// ----------------------------------------------------------------------------
// Test Step 1: Navigate to login page
// ----------------------------------------------------------------------------
// logStep() takes a description and a callback function
// The callback is executed and its return value determines pass/fail
framework.logStep("Navigate to login page", () => {
    // This is the callback function - it runs when logStep executes it
    console.log("   → Opening browser");
    console.log("   → Navigating to /login");
    
    // Return an object indicating success
    // In real automation, you'd check actual browser state here
    return { success: true };
});

// ----------------------------------------------------------------------------
// Test Step 2: Enter credentials
// ----------------------------------------------------------------------------
framework.logStep("Enter credentials", () => {
    console.log("   → Typing email: user@test.com");
    console.log("   → Typing password: ********");
    return { success: true };
});

// ----------------------------------------------------------------------------
// Test Step 3: Click login button
// ----------------------------------------------------------------------------
framework.logStep("Click login button", () => {
    console.log("   → Clicking #login-button");
    return { success: true };
});

// ----------------------------------------------------------------------------
// Test Step 4: Verify dashboard loads (simulated failure)
// ----------------------------------------------------------------------------
framework.logStep("Verify dashboard loads", () => {
    console.log("   → Checking page title");
    
    // Simulate a failure for demonstration purposes
    // Return success: false with an error message
    return { success: false, message: "User menu not found" };
});

// ----------------------------------------------------------------------------
// End Test 1: Finalize and generate report
// ----------------------------------------------------------------------------
framework.endTest();
// This calculates duration, determines final status, archives results,
// and displays the test report

// ============================================================================
// Step 3: Run Test 2 - Product Search Test
// ============================================================================
framework.startTest("Product Search Test");

framework.logStep("Navigate to homepage", () => {
    console.log("   → Loading home page");
    return { success: true };
});

framework.logStep("Enter search term", () => {
    console.log("   → Typing: 'wireless headphones'");
    return { success: true };
});

framework.logStep("Verify results", () => {
    console.log("   → Checking results > 0");
    return { success: true };
});

framework.endTest();

// ============================================================================
// Step 4: Generate summary of all tests
// ============================================================================
// Call generateSummary() to see aggregate results across all tests
framework.generateSummary();
// This displays:
// - List of all tests with pass/fail status
// - Total tests, passed, failed counts
// - Overall pass rate percentage

// ============================================================================
// KEY CONCEPTS DEMONSTRATED:
// ============================================================================
// 
// 1. CLASS DECLARATION: class ClassName { ... }
//    - Blueprint for creating objects with shared behavior
//    - Combines data (properties) and functionality (methods)
//
// 2. CONSTRUCTOR: constructor(params) { ... }
//    - Special method that runs when creating new instance
//    - Initializes the object's properties (state)
//    - Sets up default values and configuration
//
// 3. THE "this" KEYWORD:
//    - Refers to the current instance of the class
//    - Used to access instance properties: this.config, this.testResults
//    - Used to call instance methods: this._generateReport()
//    - Each instance has its own "this" context
//
// 4. INSTANCE PROPERTIES (State):
//    - this.config: configuration object
//    - this.testResults: array of completed tests
//    - this.currentTest: currently running test (or null)
//    - Each instance maintains its own separate state
//
// 5. METHODS (Behavior):
//    - Functions that belong to the class
//    - Can access instance state using "this"
//    - Can call other methods using this.methodName()
//    - Examples: startTest(), logStep(), endTest()
//
// 6. PRIVATE METHODS (Convention):
//    - Methods prefixed with _ (underscore)
//    - Indicates: "internal use only, don't call from outside"
//    - Not enforced by JavaScript, just a convention
//    - Example: _generateReport()
//
// 7. ENCAPSULATION:
//    - Class bundles related data and operations together
//    - Internal state (properties) managed by methods
//    - Users interact through public interface (methods)
//    - Implementation details hidden in private methods
//
// 8. INSTANCE CREATION:
//    - new ClassName(args) creates an instance
//    - Each instance is independent with its own state
//    - Can create multiple instances: 
//      const fw1 = new TestFramework();
//      const fw2 = new TestFramework();
//
// 9. METHOD CHAINING POTENTIAL:
//    - Could modify methods to return "this"
//    - Would enable: framework.startTest("Test").logStep(...).endTest()
//    - Not shown here but common pattern
//
// 10. STATE MANAGEMENT:
//     - Class maintains state across method calls
//     - currentTest tracks active test
//     - testResults accumulates history
//     - Methods coordinate to maintain consistent state
//
// 11. CALLBACK PATTERN:
//     - logStep() accepts a function as parameter
//     - Executes the function and uses its return value
//     - Enables flexible, user-defined test logic
//     - Example: () => { ... return { success: true }; }
//
// 12. ERROR HANDLING:
//     - Try-catch prevents crashes
//     - Errors captured and logged
//     - Test continues even if step fails
//     - Maintains framework stability
//
// 13. ARRAY METHODS USED:
//     - .push() - add items to array
//     - .filter() - create array with matching items
//     - .forEach() - iterate through array
//     - .some() - check if any item matches condition
//     - .length - get array size
//
// 14. REAL-WORLD APPLICATION:
//     - Professional test frameworks use this pattern
//     - Examples: Jest, Mocha, Jasmine (for JavaScript)
//     - Selenium frameworks (for browser automation)
//     - Benefits: reusability, organization, scalability
//
// 15. ADVANTAGES OF CLASSES:
//     - Code organization: related functionality grouped together
//     - Reusability: create multiple instances as needed
//     - Maintainability: changes in one place affect all instances
//     - State management: each instance maintains its own data
//     - Clear interface: methods define how to interact with object
//
// ============================================================================