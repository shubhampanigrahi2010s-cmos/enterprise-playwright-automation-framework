// ==========================================
// PROFESSIONAL TEST FRAMEWORK
// ==========================================
// This framework demonstrates ALL concepts learned:
// 1. Module Pattern (IIFE with public/private members)
// 2. Closures (private variables persist across calls)
// 3. Arrow Functions (modern syntax throughout)
// 4. Scope Management (proper encapsulation)
// 5. Factory Pattern (createSuite returns isolated objects)
// 6. Best Practices (declare before use, no hoisting reliance)

const TestFramework = (() => { 
    // ==========================================
    // PRIVATE SCOPE - ENCAPSULATED STATE
    // ==========================================
    // These variables are PRIVATE - only accessible within this IIFE
    // They persist across multiple function calls (closure magic!)
    // Nobody outside can modify these directly - data integrity guaranteed
    
    // GLOBAL TEST STATISTICS
    // Track overall test execution across all suites
    let totalTests = 0;      // Counter: total tests executed
    let passedTests = 0;     // Counter: tests that passed
    let failedTests = 0;     // Counter: tests that failed
    
    // TEST SUITE STORAGE
    // Map data structure: faster lookups than objects for string keys
    // Key: suite name (string) → Value: suite object with tests array
    // Map is better than {} for dynamic keys and provides size, clear(), etc.
    const testSuites = new Map(); 
    
    // ==========================================
    // PRIVATE UTILITY FUNCTIONS
    // ==========================================
    // These helper functions are PRIVATE - not exposed in public API
    // Using arrow functions for concise syntax and lexical 'this' binding
    
    // UNIQUE ID GENERATOR
    // Creates unique test IDs to prevent collisions
    // Format: test_<timestamp>_<random-string>
    // Date.now() = milliseconds since 1970 (ensures uniqueness across time)
    // Math.random().toString(36) = random alphanumeric string
    // .substr(2, 9) = take 9 characters, skip "0." prefix
    const generateId = () => `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`; 
    
    // TEST CONFIGURATION VALIDATOR
    // Ensures test objects have required properties before execution
    // Throws descriptive errors early (fail-fast principle)
    // Returns true if valid (for potential use in conditions)
    const validateTest = config => { 
        // Check 1: Test must have a name for identification
        if (!config.name) throw new Error("Test must have a name"); 
        
        // Check 2: Test must have executable function
        // typeof check ensures it's actually a function, not just truthy
        if (typeof config.fn !== 'function') throw new Error("Test must have a function"); 
        
        // Validation passed - return true
        return true; 
    }; 
    
    // ==========================================
    // PUBLIC API - EXPOSED METHODS
    // ==========================================
    // Return object contains ONLY methods we want users to access
    // These methods form a "closure" - they can access private variables above
    // This is the MODULE PATTERN: private state + public interface
    
    return { 
        // ========================================
        // METHOD 1: CREATE TEST SUITE
        // ========================================
        // Creates a new test suite container
        // Each suite is independent with its own test array
        // Stores suite in private testSuites Map for later access
        // Parameters: suiteName (string) - identifier for the suite
        // Returns: suite object (for potential chaining or inspection)
        
        createSuite: (suiteName) => { 
            // Create suite object with default structure
            const suite = { 
                name: suiteName,        // Suite identifier
                tests: [],              // Array to hold test objects
                beforeAll: null,        // Hook: runs before all tests (not implemented in demo)
                afterAll: null          // Hook: runs after all tests (not implemented in demo)
            }; 
            
            // Store suite in Map using name as key
            // Map.set() adds/updates key-value pair
            testSuites.set(suiteName, suite); 
            
            // User feedback: confirm suite creation
            console.log(`✅ Created suite: "${suiteName}"`); 
            
            // Return suite object (allows inspection or chaining)
            return suite; 
        }, 
        
        // ========================================
        // METHOD 2: ADD TEST TO SUITE
        // ========================================
        // Adds individual test to a specific suite
        // Validates test before adding (fail-fast)
        // Generates unique ID for each test
        // Parameters:
        //   suiteName (string) - which suite to add test to
        //   testName (string) - descriptive name for the test
        //   testFn (function) - test implementation to execute
        
        test: (suiteName, testName, testFn) => { 
            // Lookup suite from private Map
            // Map.get() returns value for key, or undefined if not found
            const suite = testSuites.get(suiteName); 
            
            // Validate suite exists (fail-fast with descriptive error)
            if (!suite) throw new Error(`Suite "${suiteName}" not found`); 
            
            // Create test configuration object
            const testConfig = { 
                id: generateId(),       // Unique identifier for this test
                name: testName,         // Human-readable test name
                fn: testFn              // Test function to execute
            }; 
            
            // Validate test has required properties
            // This prevents runtime errors during execution
            validateTest(testConfig); 
            
            // Add validated test to suite's test array
            suite.tests.push(testConfig); 
            
            // User feedback: confirm test addition
            console.log(`📝 Added test: "${testName}"`); 
        }, 
        
        // ========================================
        // METHOD 3: RUN TEST SUITE
        // ========================================
        // Executes all tests in a specific suite
        // Handles test failures gracefully with try-catch
        // Updates global statistics (totalTests, passedTests, failedTests)
        // Provides formatted console output for test results
        // Parameters: suiteName (string) - which suite to execute
        
        runSuite: (suiteName) => { 
            // Retrieve suite from private Map
            const suite = testSuites.get(suiteName); 
            
            // Validate suite exists before attempting execution
            if (!suite) throw new Error(`Suite "${suiteName}" not found`); 
            
            // ===== SUITE HEADER =====
            // Print formatted header to separate test output visually
            // .repeat(60) creates string of 60 equal signs for visual separator
            console.log(`\n${'='.repeat(60)}`); 
            console.log(`🚀 RUNNING: ${suiteName}`); 
            console.log(`${'='.repeat(60)}\n`); 
            
            // ===== BEFORE ALL HOOK =====
            // Execute setup function if defined (for suite-level setup)
            // Examples: database connection, browser launch, login
            if (suite.beforeAll) suite.beforeAll(); 
            
            // ===== EXECUTE EACH TEST =====
            // Iterate through all tests in suite
            // forEach provides index and test object
            suite.tests.forEach(test => { 
                // Increment global test counter (closure accessing private variable)
                totalTests++; 
                
                // Print test header with name
                console.log(`\n🧪 Test: ${test.name}`); 
                
                // TRY-CATCH for graceful failure handling
                // If test throws error → caught and marked as failed
                // If test completes without error → marked as passed
                try { 
                    // Execute the test function
                    // If it throws, catch block handles it
                    // If it completes normally, test passes
                    test.fn(); 
                    
                    // SUCCESS PATH: test completed without throwing
                    passedTests++;                  // Increment pass counter
                    console.log(`   ✅ PASS`);       // Visual feedback
                    
                } catch (error) { 
                    // FAILURE PATH: test threw an error
                    failedTests++;                           // Increment fail counter
                    console.log(`   ❌ FAIL: ${error.message}`); // Show error message
                } 
            }); 
            
            // ===== AFTER ALL HOOK =====
            // Execute cleanup function if defined (for suite-level teardown)
            // Examples: close browser, disconnect database, logout
            if (suite.afterAll) suite.afterAll(); 
            
            // ===== SUITE FOOTER =====
            // Print completion message with visual separator
            console.log(`\n${'='.repeat(60)}`); 
            console.log(`🏁 SUITE COMPLETE`); 
            console.log(`${'='.repeat(60)}\n`); 
        }, 
        
        // ========================================
        // METHOD 4: GENERATE FINAL REPORT
        // ========================================
        // Displays summary statistics for all executed tests
        // Calculates pass rate percentage
        // Formats output with visual separators for readability
        // This demonstrates closure: accessing private counters from outer scope
        
        report: () => { 
            // CALCULATE PASS RATE
            // Ternary operator: condition ? true-value : false-value
            // Prevents division by zero if no tests run
            // toFixed(2) rounds to 2 decimal places (e.g., 66.67%)
            const passRate = totalTests > 0  
                ? ((passedTests / totalTests) * 100).toFixed(2)  // Calculate percentage
                : 0;                                             // Default to 0 if no tests
            
            // DISPLAY FORMATTED REPORT
            // Using template literals for formatted output
            // ⭐ emoji repeated for visual header/footer
            console.log(`\n${'⭐'.repeat(60)}`); 
            console.log("📊 FINAL REPORT"); 
            console.log(`${'⭐'.repeat(60)}`); 
            
            // STATISTICS LINE
            // Pipe-separated format for easy reading
            console.log(`Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`); 
            
            // PASS RATE
            // Key metric for test suite health
            console.log(`Pass Rate: ${passRate}%`); 
            
            console.log(`${'⭐'.repeat(60)}\n`); 
        } 
    }; 
    // ===== END OF RETURN OBJECT =====
    // Everything above is the public API
    // Private variables/functions remain hidden
    
})(); // <-- IIFE: () immediately invokes the function
// The returned object becomes the value of TestFramework
// Private scope is created and sealed - nobody can access internals

// ==========================================
// USAGE EXAMPLE - REAL-WORLD DEMONSTRATION
// ==========================================
// This section shows how to use the framework in practice
// Demonstrates the public API and test writing patterns

console.log("🧪 PROFESSIONAL FRAMEWORK DEMO\n"); 

// ========================================
// STEP 1: CREATE TEST SUITE
// ========================================
// Initialize a new test suite container
// All related tests will be grouped under "Login Tests"
TestFramework.createSuite("Login Tests"); 

// ========================================
// STEP 2: ADD TESTS TO SUITE
// ========================================
// Add individual test cases using arrow functions
// Tests can pass (complete normally) or fail (throw errors)

// TEST 1: PASSING TEST
// Demonstrates successful test execution
// No throw = implicit pass
TestFramework.test("Login Tests", "Valid credentials", () => { 
    // Log test steps for visibility (like console.log in real tests)
    console.log("   → Entering credentials"); 
    console.log("   → Clicking login"); 
    console.log("   → Verifying dashboard"); 
    
    // No assertions that throw = test passes
    // In real framework, you'd use assertions: assert(condition, message)
}); 

// TEST 2: FAILING TEST
// Demonstrates test failure handling
// throw = explicit fail with error message
TestFramework.test("Login Tests", "Invalid credentials", () => { 
    console.log("   → Entering invalid credentials"); 
    console.log("   → Clicking login"); 
    
    // Throwing error marks test as failed
    // Error message explains why test failed
    throw new Error("Login should fail"); 
    
    // Note: In real tests, you'd throw if assertion fails
    // Example: if (!errorDisplayed) throw new Error("Expected error not shown");
}); 

// TEST 3: ANOTHER PASSING TEST
// Demonstrates multiple tests in same suite
TestFramework.test("Login Tests", "Empty fields", () => { 
    console.log("   → Leaving fields empty"); 
    console.log("   → Verifying error message"); 
    
    // No throw = passes
    // Real test would verify error message appears
}); 

// ========================================
// STEP 3: EXECUTE TEST SUITE
// ========================================
// Run all tests in the "Login Tests" suite
// Framework handles execution, error catching, and result reporting
TestFramework.runSuite("Login Tests"); 

// ========================================
// STEP 4: GENERATE SUMMARY REPORT
// ========================================
// Display final statistics across all executed tests
// Shows total, passed, failed counts and pass rate percentage
TestFramework.report(); 

// ==========================================
// KEY CONCEPTS DEMONSTRATED
// ==========================================
// ✅ MODULE PATTERN: Private state + public API using IIFE
// ✅ CLOSURES: Public methods access private variables (totalTests, etc.)
// ✅ ARROW FUNCTIONS: Modern syntax throughout (concise, lexical this)
// ✅ ENCAPSULATION: Internal state protected from external modification
// ✅ DATA STRUCTURES: Map for efficient suite storage and lookup
// ✅ ERROR HANDLING: Try-catch for graceful test failure handling
// ✅ FACTORY PATTERN: createSuite generates isolated suite objects
// ✅ VALIDATION: Fail-fast with descriptive errors (validateTest)
// ✅ SCOPE MANAGEMENT: No global pollution, everything properly scoped
// ✅ BEST PRACTICES: Declare before use, consistent formatting

// ==========================================
// POTENTIAL ENHANCEMENTS
// ==========================================
// 1. Add beforeEach/afterEach hooks (per-test setup/teardown)
// 2. Implement async test support (return Promises)
// 3. Add test filtering (run only specific tests)
// 4. Include timing statistics (test duration)
// 5. Support nested test suites (describe blocks)
// 6. Add assertion library (expect/assert functions)
// 7. Generate HTML/JSON reports
// 8. Implement test retries for flaky tests
// 9. Add tagging system (@smoke, @regression)
// 10. Support parallel test execution