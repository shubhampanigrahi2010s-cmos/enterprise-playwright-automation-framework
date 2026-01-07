// ==========================================
// 1. FUNCTION DECLARATION HOISTING
// ==========================================
// HOISTING: JavaScript moves declarations to the top of their scope during compilation
// Think of it as JavaScript "reading ahead" and registering all declarations first
// Function DECLARATIONS (not expressions) are FULLY hoisted with their entire body

console.log("=== Function Declaration Hoisting ===\n"); 

// ✅ THIS WORKS! Even though greet() is defined AFTER this line
// JavaScript hoists (moves) the entire function declaration to the top
// During compilation: JavaScript sees greet() definition first, then executes calls
console.log(greet("World")); // Output: "Hello, World!" 

// Function declaration - gets hoisted with complete implementation
function greet(name) { 
    return `Hello, ${name}!`; 
} 

// PRACTICAL EXAMPLE: Test execution order
// You can organize code in logical reading order, not declaration order
// This makes code more readable - main logic at top, helpers below
runTest(); // Call main test function first

// Main test function - calls helper functions defined below
// Works because ALL function declarations are hoisted together
function runTest() { 
    console.log("Test is running"); 
    setupTest();      // Can call functions defined below
    executeTest();    // JavaScript hoists them all first
} 

// Helper function 1 - hoisted before runTest() executes
function setupTest() { 
    console.log("Setting up..."); 
} 

// Helper function 2 - also hoisted
function executeTest() { 
    console.log("Executing..."); 
} 

// WHY THIS MATTERS:
// - Lets you structure code logically (main function first, helpers below)
// - All function declarations are available throughout their entire scope
// - Makes code more readable and maintainable

// ==========================================
// 2. VAR HOISTING (Why we avoid var)
// ==========================================
// VAR HOISTING PROBLEM: Declaration is hoisted, but initialization is NOT
// Variable exists (hoisted) but has value 'undefined' until assignment line
// This creates confusing bugs - variable exists but doesn't have expected value

console.log("\n=== VAR Hoisting ===\n"); 

function demonstrateVarHoisting() { 
    // ⚠️ CONFUSING BEHAVIOR: x exists here but equals undefined
    // JavaScript hoisted: "var x;" to top, but "x = 10" stays at line 46
    // No error thrown, but x isn't what you'd expect
    console.log("Before declaration:", x); // undefined (not ReferenceError!)
    
    // What JavaScript actually does during compilation:
    // Step 1 (hoisting phase): var x; (initialized to undefined)
    // Step 2 (execution phase): reaches this line and assigns 10
    var x = 10; 
    
    // Now x has the assigned value
    console.log("After declaration:", x); // 10 
} 

demonstrateVarHoisting(); 

// WHY VAR IS PROBLEMATIC:
// 1. Silent bugs - undefined instead of clear errors
// 2. Function-scoped (not block-scoped) - leaks out of if/for blocks
// 3. Can be redeclared without error - easy to accidentally overwrite
// 4. Confusing hoisting behavior makes code hard to reason about
// SOLUTION: Always use let/const instead!

// ==========================================
// 3. LET/CONST - TEMPORAL DEAD ZONE
// ==========================================
// TEMPORAL DEAD ZONE (TDZ): The period between scope start and declaration
// let/const ARE hoisted, but you can't access them before declaration
// Accessing them in TDZ throws ReferenceError - this is GOOD (catches bugs early!)

console.log("\n=== Let/Const Temporal Dead Zone ===\n"); 

function demonstrateTDZ() { 
    console.log("Entering function"); 
    
    // ⚠️ TEMPORAL DEAD ZONE STARTS HERE
    // Variable 'value' technically exists (hoisted) but is in "uninitialized" state
    // Any access before declaration line throws ReferenceError
    
    // ❌ THIS WOULD THROW ERROR (uncomment to see):
    // console.log(value); // ReferenceError: Cannot access 'value' before initialization
    
    // The TDZ exists from function start to this declaration line
    // This protects you from using uninitialized variables
    const value = 42; 
    // ✅ TDZ ENDS HERE - value is now initialized and safe to use
    
    // Now we can safely access value
    console.log("Value:", value); 
} 

demonstrateTDZ(); 

// WHY TDZ IS GOOD:
// - Forces you to declare before use (clearer code)
// - Throws clear errors instead of silent undefined bugs
// - Catches typos and logic errors at runtime
// - Encourages better code organization

// COMPARISON:
// var: hoisted and initialized to undefined (confusing)
// let/const: hoisted but remain uninitialized until declaration (safe)

// ==========================================
// 4. FUNCTION EXPRESSIONS DON'T HOIST
// ==========================================
// FUNCTION EXPRESSIONS: Functions assigned to variables
// Only the VARIABLE is hoisted (like let/const), not the function itself
// Arrow functions and function expressions have same hoisting behavior

console.log("\n=== Function Expression Hoisting ===\n"); 

// Function DECLARATION - fully hoisted (function + body)
// ✅ Can check type before definition
console.log("Function declaration type:", typeof myFunc); // "function" 

// Function EXPRESSION (arrow function) - NOT hoisted
// Variable 'myArrow' is in TDZ, accessing it throws ReferenceError
// ❌ THIS WOULD ERROR (uncomment to see):
// console.log("Arrow function type:", typeof myArrow); // ReferenceError! 

// Traditional function declaration - hoisted completely
function myFunc() { 
    return "I'm hoisted!"; 
} 

// Arrow function expression - only variable name hoisted (in TDZ)
// Function body NOT available until this line executes
const myArrow = () => "I'm not hoisted!"; 

// After both definitions, both work normally
console.log("After declarations:", typeof myFunc, typeof myArrow); // both "function" 

// PRACTICAL IMPLICATIONS:
// Declaration:   function name() {}     - Can call before definition
// Expression:    const name = () => {}  - Must declare before calling
// Choose based on: Need hoisting? Use declaration. Want modern style? Use expression.

// ==========================================
// 5. BEST PRACTICE: DECLARE BEFORE USE
// ==========================================
// PROFESSIONAL CODE ORGANIZATION: Declare everything at the top
// Don't rely on hoisting - make code predictable and easy to read
// Follow consistent ordering pattern

function professionalFunction() { 
    // SECTION 1: CONSTANTS FIRST
    // Declare all configuration values at the very top
    // Makes it easy to find and modify settings
    // Use UPPER_SNAKE_CASE for true constants
    const MAX_RETRIES = 3; 
    const TIMEOUT = 5000; 
    
    // SECTION 2: VARIABLES NEXT
    // Declare all mutable state variables
    // Initialize with appropriate default values
    let retryCount = 0; 
    let testResults = []; 
    
    // SECTION 3: HELPER FUNCTIONS
    // Define all helper functions before using them
    // Modern style: use const with arrow functions
    // This prevents accidental reassignment and is more explicit
    
    // Input validation helper - returns boolean
    const validateInput = (input) => { 
        return input !== null && input !== ""; 
    }; 
    
    // Result processing helper - side effect function
    const processResult = (result) => { 
        testResults.push(result); 
    }; 
    
    // SECTION 4: MAIN LOGIC LAST
    // Now use everything declared above
    // Code reads top-to-bottom, no surprises
    console.log("Starting with config..."); 
    
    // Main execution loop
    while (retryCount < MAX_RETRIES) { 
        retryCount++; 
        console.log(`Attempt ${retryCount}`); 
        
        // Use helper functions defined above
        if (validateInput("test")) { 
            processResult({ passed: true }); 
            break; // Exit on success
        } 
    } 
    
    // Return accumulated results
    return testResults; 
} 

console.log("\n=== Professional Function Pattern ==="); 
professionalFunction(); 

// BENEFITS OF THIS PATTERN:
// 1. Predictable - everything declared before use
// 2. Organized - easy to find constants, variables, helpers
// 3. Maintainable - clear structure for adding new code
// 4. No hoisting surprises - works same way every time

// ==========================================
// 6. COMMON HOISTING PATTERNS
// ==========================================
// Comparing traditional hoisting pattern vs modern explicit pattern

// PATTERN 1: Traditional Function Declarations (relies on hoisting)
// Main function at top, helpers below - reads naturally
// All function declarations are hoisted, so order doesn't matter
function testSuite() { 
    beforeAll();    // Call helper defined below (hoisting makes this work)
    runTests();     // Call helper defined below
    afterAll();     // Call helper defined below
} 

// Helper functions defined after main function
// JavaScript hoists these, so testSuite() can call them
function beforeAll() { 
    console.log("Setup"); 
} 

function runTests() { 
    console.log("Running tests"); 
} 

function afterAll() { 
    console.log("Cleanup"); 
} 

// PATTERN 2: Modern Arrow Functions (requires careful ordering)
// Helper functions MUST be declared BEFORE main function
// Arrow functions are NOT hoisted (only variable names are)
// Order matters - must declare top-to-bottom

// Helper functions first (must come before modernTestSuite)
const beforeAllModern = () => console.log("Modern setup"); 
const runTestsModern = () => console.log("Modern tests"); 
const afterAllModern = () => console.log("Modern cleanup"); 

// Main function last (after all helpers are declared)
const modernTestSuite = () => { 
    beforeAllModern();    // Can call because defined above
    runTestsModern();     // Can call because defined above
    afterAllModern();     // Can call because defined above
}; 

console.log("\n=== Function Pattern Comparison ==="); 
testSuite(); // ✅ Works because function declarations are hoisted

// ✅ Would work if called (arrow functions defined before use)
// modernTestSuite(); 

// PATTERN COMPARISON:
// Traditional (function declarations):
//   ✅ Natural reading order (main logic first)
//   ✅ No worry about declaration order
//   ❌ Old syntax
//   ❌ Encourages relying on hoisting

// Modern (arrow functions):
//   ✅ Modern ES6 syntax
//   ✅ Explicit ordering (no magic)
//   ✅ Can't accidentally rely on hoisting
//   ❌ Must declare helpers first (less natural reading order)

// ==========================================
// 7. VAR vs LET IN LOOPS (Why let is better)
// ==========================================
// Demonstrates why let is superior to var in loops
// var: function-scoped, leaks out of loop
// let: block-scoped, contained within loop

console.log("\n=== Var vs Let in Loops ===\n"); 

// USING VAR - Demonstrates the problem
console.log("Using var:"); 
for (var i = 0; i < 3; i++) { 
    // Loop body - i is accessible here
    console.log(`  Loop ${i}`); 
} 
// ⚠️ PROBLEM: i still exists after loop ends!
// var is function-scoped, not block-scoped
// i "leaks" out of the for loop block
console.log(`  After loop, i = ${i}`); // i = 3 (leaked variable!)

// WHY THIS IS BAD:
// 1. Pollutes outer scope with loop counter
// 2. Easy to accidentally reuse i in nested loops (bugs!)
// 3. Confusing - loop variable shouldn't exist after loop

// USING LET - The solution
console.log("\nUsing let:"); 
for (let j = 0; j < 3; j++) { 
    // Loop body - j is accessible here
    console.log(`  Loop ${j}`); 
} 
// ✅ GOOD: j doesn't exist outside loop block
// let is block-scoped - j dies when loop ends
// Trying to access j throws ReferenceError

// ❌ THIS WOULD ERROR (uncomment to see):
// console.log(`  After loop, j = ${j}`); // ReferenceError: j is not defined

// WHY LET IS BETTER:
// 1. Block-scoped - contained within loop
// 2. Prevents variable leakage
// 3. Each loop iteration gets fresh binding (important for closures)
// 4. Catches bugs - can't accidentally use loop variable outside loop

// CLOSURE BENEFIT (Advanced):
// With var: all closures share same i variable
// With let: each iteration gets own j variable
// This matters when creating functions inside loops

// Example showing closure difference:
const varFunctions = [];
for (var x = 0; x < 3; x++) {
    varFunctions.push(() => console.log(x));
}
console.log("\nVar closure problem:");
varFunctions.forEach(fn => fn()); // All print 3! (shared variable)

const letFunctions = [];
for (let y = 0; y < 3; y++) {
    letFunctions.push(() => console.log(y));
}
console.log("\nLet closure solution:");
letFunctions.forEach(fn => fn()); // Prints 0, 1, 2 (separate variables)

// SUMMARY:
// Always use let (or const) in loops
// Never use var - it causes confusing bugs
// Block scoping is safer and more intuitive