// ==========================================
// 1. GLOBAL vs LOCAL SCOPE
// ==========================================
// SCOPE determines where variables can be accessed in your code
// Think of scope as "visibility zones" for your variables

// GLOBAL SCOPE - Variables declared outside any function
// Accessible from ANYWHERE in your code (all functions, blocks, etc.)
// ⚠️ USE SPARINGLY! Global variables can cause conflicts and bugs
// Best for: Configuration constants, app-wide settings
const GLOBAL_TIMEOUT = 30000; 

function testFunction() { 
    // LOCAL SCOPE - Variables declared inside a function
    // Only accessible WITHIN this specific function
    // Dies when function execution completes
    // Best for: Temporary calculations, function-specific data
    const localTimeout = 5000; 
    
    // ✅ Can access global variable from inside function
    console.log(`Can access global: ${GLOBAL_TIMEOUT}`); 
    // ✅ Can access local variable within its own function
    console.log(`Can access local: ${localTimeout}`); 
} 

// Execute the function to see scope in action
testFunction(); 

// ❌ This would throw ReferenceError: localTimeout is not defined
// Local variables are "trapped" inside their function
// console.log(localTimeout); // Error! Not accessible outside function 

// ==========================================
// 2. BLOCK SCOPE (let/const)
// ==========================================
// BLOCK SCOPE was introduced in ES6 with let and const
// A "block" is anything inside curly braces: {}, if statements, loops, etc.
// Variables declared with let/const are confined to their block

function demonstrateBlockScope() { 
    console.log("\n=== Block Scope Demo ==="); 
    
    // OUTER SCOPE - declared at function level
    // Accessible throughout entire function
    const outerVar = "I'm outside the block"; 
    
    // IF BLOCK creates a new scope
    if (true) { 
        // INNER SCOPE - only exists inside these curly braces
        // This variable is "born" when block starts, "dies" when block ends
        const innerVar = "I'm inside the block"; 
        
        // ✅ Inner block can access outer variables (scope chain)
        console.log(`Inside block: ${outerVar}`); // Can access outer 
        // ✅ Can access variables in own scope
        console.log(`Inside block: ${innerVar}`); // Can access inner 
    } 
    // The if block ends here - innerVar is destroyed
    
    // ✅ Outer variable still accessible after block
    console.log(`Outside block: ${outerVar}`); // Works 
    
    // ❌ This would throw ReferenceError
    // innerVar no longer exists - it was block-scoped
    // console.log(`Outside block: ${innerVar}`); // Error! Block scope 
} 

// Run the demonstration
demonstrateBlockScope(); 

// ==========================================
// 3. NAMESPACE PATTERN - Avoid Global Pollution
// ==========================================
// PROBLEM: Too many global variables cause naming conflicts
// If you have: timeout, retries, baseUrl, etc. as globals
// Other scripts might accidentally overwrite them!

// ❌ BAD PRACTICE - Multiple global variables
// const timeout = 5000; 
// const retries = 3; 
// const baseUrl = "..."; 
// Problems: Hard to manage, easy to overwrite, namespace pollution

// ✅ SOLUTION: Group related variables into ONE namespace object
// Creates a single global variable that contains everything
// Like putting all your tools in one toolbox instead of scattered around
const TestConfig = Object.freeze({ 
    // All configuration grouped under TestConfig namespace
    TIMEOUT: 5000,                              // Default timeout for operations
    MAX_RETRIES: 3,                             // How many times to retry failed tests
    BASE_URL: "https://staging.example.com",    // API endpoint
    ENVIRONMENTS: {                              // Nested object for environment configs
        DEV: "development", 
        STAGING: "staging", 
        PROD: "production" 
    } 
}); 

console.log("\n=== Test Config ==="); 
// Access using dot notation: TestConfig.PROPERTY
console.log(`Timeout: ${TestConfig.TIMEOUT}ms`); 
console.log(`Retries: ${TestConfig.MAX_RETRIES}`); 

// Object.freeze() makes the object immutable (read-only)
// Prevents accidental modifications that could break your tests
// ❌ This assignment will silently fail (or throw error in strict mode)
// TestConfig.TIMEOUT = 10000; // This won't work! Object is frozen

// ==========================================
// 4. MODULE PATTERN - Encapsulation
// ==========================================
// MODULE PATTERN creates PUBLIC and PRIVATE members
// Uses IIFE (Immediately Invoked Function Expression) to create closure
// Pattern: const Module = (() => { private stuff; return { public API }; })();

const TestReporter = (() => { 
    // PRIVATE SECTION - These variables are hidden from outside
    // Only accessible within this IIFE's scope
    // Like private class members in other languages
    let totalTests = 0;           // Total test count (private)
    let passedTests = 0;          // Passed test count (private)
    let failedTests = 0;          // Failed test count (private)
    const executionTimes = [];    // Array storing test durations (private)
    
    // PUBLIC API - Return object with methods that CAN be accessed
    // These methods have "closure" over the private variables
    // They can read/modify private variables, but outside code cannot
    return { 
        // METHOD 1: Record when a test starts
        // Returns timestamp to calculate duration later
        recordStart: (testName) => { 
            console.log(`🚀 Starting: ${testName}`); 
            totalTests++;                    // Increment private counter
            return Date.now();               // Return start timestamp
        }, 
        
        // METHOD 2: Record when a test ends
        // Calculates duration and updates pass/fail counters
        recordEnd: (startTime, passed) => { 
            // Calculate how long test took
            const duration = Date.now() - startTime; 
            executionTimes.push(duration);    // Store for average calculation
            
            // Update appropriate counter based on result
            if (passed) { 
                passedTests++;                // Increment pass counter
                console.log(`✅ Passed (${duration}ms)`); 
            } else { 
                failedTests++;                // Increment fail counter
                console.log(`❌ Failed (${duration}ms)`); 
            } 
        }, 
        
        // METHOD 3: Generate summary report
        // Performs calculations on private data and displays results
        generateReport: () => { 
            // Calculate average execution time from all stored times
            const avgTime = executionTimes.reduce((a, b) => a + b, 0) / executionTimes.length; 
            // Calculate pass percentage
            const passRate = (passedTests / totalTests * 100).toFixed(2); 
            
            // Display formatted report
            console.log("\n" + "=".repeat(50)); 
            console.log("📊 TEST EXECUTION REPORT"); 
            console.log("=".repeat(50)); 
            console.log(`Total Tests: ${totalTests}`); 
            console.log(`Passed: ${passedTests}`); 
            console.log(`Failed: ${failedTests}`); 
            console.log(`Pass Rate: ${passRate}%`); 
            console.log(`Avg Duration: ${avgTime.toFixed(2)}ms`); 
            console.log("=".repeat(50)); 
        } 
    }; 
})(); // () at end immediately invokes the function

// USAGE DEMONSTRATION
// Users can only call public methods - cannot access private variables
console.log("\n=== Using Test Reporter ==="); 

// ❌ Cannot do: TestReporter.totalTests (private variable not accessible)
// ✅ Can do: TestReporter.recordStart() (public method)

// Simulate first test
const start1 = TestReporter.recordStart("Login Test"); 
// Simulate test execution with setTimeout (100ms delay)
setTimeout(() => TestReporter.recordEnd(start1, true), 100); 

// Simulate second test
const start2 = TestReporter.recordStart("Search Test"); 
setTimeout(() => { 
    TestReporter.recordEnd(start2, false);    // Record as failed
    TestReporter.generateReport();            // Display final report
}, 200); 

// ==========================================
// 5. FACTORY PATTERN - Create Isolated Scopes
// ==========================================
// FACTORY PATTERN creates multiple instances with independent state
// Each call to factory function returns a NEW object with its OWN scope
// Like a blueprint/template for creating similar objects

// Factory function - creates test suite objects
// Each suite gets completely isolated variables (no shared state)
const createTestSuite = (suiteName) => { 
    // PRIVATE VARIABLES for this specific suite instance
    // Each suite created will have its own separate copies
    let suiteTests = [];        // Array to store test functions
    let suiteStartTime;         // Timestamp when suite starts
    
    // Return PUBLIC API for this suite
    // Each returned object is independent with its own closure
    return { 
        // Initialize suite - record start time
        startSuite: () => { 
            suiteStartTime = Date.now(); 
            console.log(`\n🧪 SUITE: ${suiteName}`); 
            console.log("-".repeat(40)); 
        }, 
        
        // Add a test to this suite's test array
        // testFn is a function that returns true (pass) or false (fail)
        addTest: (testName, testFn) => { 
            suiteTests.push({ name: testName, fn: testFn }); 
        }, 
        
        // Execute all tests in this suite
        runSuite: () => { 
            let passed = 0;     // Local counter for this run
            let failed = 0;     // Local counter for this run
            
            // Iterate through each test and execute it
            suiteTests.forEach((test, index) => { 
                console.log(`\nTest ${index + 1}: ${test.name}`); 
                
                // Try-catch to handle test errors gracefully
                try { 
                    const result = test.fn();     // Execute test function
                    
                    // Check result and update counters
                    if (result) { 
                        console.log("  ✅ PASS"); 
                        passed++; 
                    } else { 
                        console.log("  ❌ FAIL"); 
                        failed++; 
                    } 
                } catch (error) { 
                    // Test threw an exception - count as failure
                    console.log(`  💥 ERROR: ${error.message}`); 
                    failed++; 
                } 
            }); 
            
            // Calculate total suite duration
            const duration = Date.now() - suiteStartTime; 
            
            // Display suite summary
            console.log("\n" + "-".repeat(40)); 
            console.log(`RESULTS: ${passed} passed, ${failed} failed`); 
            console.log(`DURATION: ${duration}ms`); 
            console.log("-".repeat(40)); 
        } 
    }; 
}; 

// DEMONSTRATION: Create two completely independent test suites
console.log("\n=== Factory Pattern Demo ==="); 

// Create first suite - gets its own scope/variables
const loginSuite = createTestSuite("Login Tests"); 
// Create second suite - gets completely separate scope/variables
const searchSuite = createTestSuite("Search Tests"); 

// Each suite maintains its own test array independently
loginSuite.addTest("Valid Login", () => true);      // Returns true = pass
loginSuite.addTest("Invalid Login", () => false);   // Returns false = fail

searchSuite.addTest("Basic Search", () => true); 
searchSuite.addTest("Empty Search", () => true); 

// Run suites - each operates independently with its own state
loginSuite.startSuite(); 
loginSuite.runSuite(); 

searchSuite.startSuite(); 
searchSuite.runSuite(); 

// ==========================================
// 6. CLOSURE PATTERN - State Preservation
// ==========================================
// CLOSURE: Inner function "remembers" variables from outer function
// Even after outer function finishes, inner functions keep access
// Powerful way to create private state that persists

// Factory that creates counter object with private state
const createCounter = () => { 
    // PRIVATE VARIABLE - only accessible to returned methods
    // This variable persists across multiple function calls
    // Each counter instance gets its own count variable
    let count = 0; // Private variable preserved by closure 
    
    // Return object with methods that "close over" the count variable
    // These methods form a closure - they keep count alive
    return { 
        // Increment: add 1 and return new value
        // Pre-increment (++count) adds before returning
        increment: () => ++count, 
        
        // Decrement: subtract 1 and return new value
        decrement: () => --count, 
        
        // Getter: return current count without modifying
        getCount: () => count, 
        
        // Reset: set count back to zero
        reset: () => count = 0 
    }; 
}; 

// DEMONSTRATION: counter object maintains its own state
console.log("\n=== Closure Pattern Demo ==="); 
const counter = createCounter(); 

// Initial state
console.log(`Count: ${counter.getCount()}`);              // 0 

// Modify state through public methods
console.log(`After increment: ${counter.increment()}`);   // 1 
console.log(`After increment: ${counter.increment()}`);   // 2 
console.log(`After decrement: ${counter.decrement()}`);   // 1 

// Reset state
counter.reset(); 
console.log(`After reset: ${counter.getCount()}`);        // 0 

// ❌ Cannot do: counter.count (private variable not accessible)
// The closure protects the count variable from direct access

// ==========================================
// 7. BLOCK SCOPE IN LOOPS
// ==========================================
// LOOP SCOPE is crucial for avoiding common bugs
// let and const create NEW binding for each iteration

console.log("\n=== Loop Scope Demo ==="); 

// Test data: array of browser names
const browsers = ["chrome", "firefox", "safari"]; 

// TRADITIONAL FOR LOOP with let
// let i creates a NEW variable for each iteration (block-scoped)
// This prevents closure problems in async code
for (let i = 0; i < browsers.length; i++) { 
    // const browser is also block-scoped - new binding each iteration
    // Only exists within this iteration's block
    const browser = browsers[i]; 
    console.log(`Testing on ${browser}`); 
} 
// ❌ i is not accessible here - it was block-scoped to the loop
// This is GOOD - prevents accidental reuse

// FOR...OF LOOP - Modern, cleaner syntax
// const browser creates new binding for each iteration automatically
// Each iteration gets its own separate browser variable
for (const browser of browsers) { 
    // browser is block-scoped to this iteration
    // Cannot be reassigned (const), but gets new value each iteration
    console.log(`Running tests on ${browser}`); 
}

// WHY BLOCK SCOPE MATTERS IN LOOPS:
// Old var keyword had function scope, causing bugs with closures
// let/const with block scope fix these issues
// Each iteration gets fresh variables - crucial for callbacks/promises