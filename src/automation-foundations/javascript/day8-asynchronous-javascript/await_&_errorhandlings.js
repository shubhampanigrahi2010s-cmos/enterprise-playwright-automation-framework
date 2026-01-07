// ========================================== 
// DAY 8 - ASYNCHRONOUS JAVASCRIPT
// Part 2: Async/Await & Error Handling
// ========================================== 

// ========================================== 
// 1. ASYNC/AWAIT - Modern Syntax
// ========================================== 

console.log("=== ASYNC/AWAIT BASICS ===\n");

// async/await is syntactic sugar over Promises
// Makes async code look and behave like synchronous code

// ANY function can be marked as 'async'
// 'async' keyword before function makes it return a Promise automatically
async function simpleAsyncFunction() {
    return "Hello!";  // Automatically wrapped in Promise.resolve()
}

// Even though it looks like normal function, it returns a Promise
simpleAsyncFunction().then(result => {
    console.log("Result:", result);  // "Hello!"
});

// 'await' keyword can ONLY be used inside 'async' functions
// 'await' pauses execution until Promise resolves
async function waitExample() {
    console.log("Before await");
    
    // This Promise resolves after 1 second
    const result = await new Promise(resolve => {
        setTimeout(() => resolve("Done!"), 1000);
    });
    
    console.log("After await");  // Only logs after Promise resolves
    console.log("Result:", result);
}

waitExample();

// ========================================== 
// 2. CONVERTING PROMISES TO ASYNC/AWAIT
// ========================================== 

console.log("\n=== PROMISE vs ASYNC/AWAIT ===\n");

// Helper function that returns Promise
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// OLD WAY: Using .then() chains
function loginWithPromises() {
    console.log("Login with Promises:");
    
    return delay(500)
        .then(() => {
            console.log("  Step 1: Opening browser");
            return delay(500);
        })
        .then(() => {
            console.log("  Step 2: Navigating to login");
            return delay(500);
        })
        .then(() => {
            console.log("  Step 3: Entering credentials");
            return delay(500);
        })
        .then(() => {
            console.log("  Step 4: Clicking login");
            return "Login successful!";
        });
}

// NEW WAY: Using async/await (MUCH MORE READABLE)
async function loginWithAsync() {
    console.log("Login with Async/Await:");
    
    // Each await pauses until operation completes
    // Code reads top-to-bottom like synchronous code
    await delay(500);
    console.log("  Step 1: Opening browser");
    
    await delay(500);
    console.log("  Step 2: Navigating to login");
    
    await delay(500);
    console.log("  Step 3: Entering credentials");
    
    await delay(500);
    console.log("  Step 4: Clicking login");
    
    return "Login successful!";  // Still returns a Promise!
}

// Both return Promises, so we use .then() to get result
loginWithPromises().then(result => console.log("Result:", result));
loginWithAsync().then(result => console.log("Result:", result));

// ========================================== 
// 3. ERROR HANDLING WITH TRY/CATCH
// ========================================== 

console.log("\n=== ERROR HANDLING ===\n");

// Function that might fail
function riskyOperation(shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                // Reject with Error object containing message
                reject(new Error("Operation failed!"));
            } else {
                resolve("Operation succeeded!");
            }
        }, 500);
    });
}

// OLD WAY: Error handling with .catch()
function handleWithCatch() {
    riskyOperation(true)
        .then(result => {
            console.log("Success:", result);
        })
        .catch(error => {
            console.log("Error caught:", error.message);
        });
}

// NEW WAY: Error handling with try/catch (cleaner!)
async function handleWithTryCatch() {
    try {
        // try block: code that might throw error
        const result = await riskyOperation(true);
        console.log("Success:", result);  // Won't execute if error thrown
    } catch (error) {
        // catch block: handles any error from try block
        console.log("Error caught:", error.message);
    }
}

handleWithCatch();
handleWithTryCatch();

// ========================================== 
// 4. TRY/CATCH/FINALLY
// ========================================== 

console.log("\n=== TRY/CATCH/FINALLY ===\n");

// finally block ALWAYS executes, regardless of success or failure
async function demonstrateFinally(shouldFail) {
    console.log(`\nTest run (fail=${shouldFail}):`);
    
    try {
        console.log("  Opening browser...");
        await delay(300);
        
        if (shouldFail) {
            throw new Error("Element not found!");  // Manually throw error
        }
        
        console.log("  Test passed!");
        return "SUCCESS";
        
    } catch (error) {
        console.log("  Test failed:", error.message);
        return "FAILED";
        
    } finally {
        // Cleanup code that ALWAYS runs
        console.log("  Closing browser (cleanup)");
        // Perfect for closing connections, browsers, files, etc.
    }
}

// Run with success scenario
demonstrateFinally(false).then(result => console.log("Result:", result));

// Run with failure scenario
demonstrateFinally(true).then(result => console.log("Result:", result));

// ========================================== 
// 5. MULTIPLE AWAITS - Sequential Operations
// ========================================== 

console.log("\n=== SEQUENTIAL OPERATIONS ===\n");

// Simulated API calls
function fetchUser(id) {
    console.log(`  Fetching user ${id}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id, name: `User ${id}`, email: `user${id}@example.com` });
        }, 1000);
    });
}

function fetchUserPosts(userId) {
    console.log(`  Fetching posts for user ${userId}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post 1" },
                { id: 2, title: "Post 2" }
            ]);
        }, 1000);
    });
}

// Sequential execution - each awaits waits for previous to complete
async function getUserData(userId) {
    console.log("Fetching user data sequentially:");
    
    // Step 1: Wait for user data (1 second)
    const user = await fetchUser(userId);
    console.log("  User:", user.name);
    
    // Step 2: Wait for posts data (another 1 second)
    const posts = await fetchUserPosts(user.id);
    console.log("  Posts:", posts.length);
    
    // Total time: 2 seconds (1 + 1)
    return { user, posts };
}

getUserData(1).then(data => {
    console.log("Complete data:", data);
});

// ========================================== 
// 6. PARALLEL OPERATIONS WITH PROMISE.ALL
// ========================================== 

console.log("\n=== PARALLEL OPERATIONS ===\n");

// When operations DON'T depend on each other, run in parallel
async function getUserDataParallel(userId) {
    console.log("Fetching user data in parallel:");
    
    // Start both operations at the SAME time
    // Don't await individually, start all then await all
    const userPromise = fetchUser(userId);        // Starts immediately
    const postsPromise = fetchUserPosts(userId);  // Starts immediately
    
    // Promise.all waits for BOTH to complete
    // Returns array with results in same order as input
    const [user, posts] = await Promise.all([userPromise, postsPromise]);
    
    // Total time: 1 second (max of both, not sum)
    console.log("  User:", user.name);
    console.log("  Posts:", posts.length);
    
    return { user, posts };
}

getUserDataParallel(2).then(data => {
    console.log("Complete data:", data);
});

// ========================================== 
// 7. ERROR HANDLING IN PARALLEL OPERATIONS
// ========================================== 

console.log("\n=== PARALLEL ERROR HANDLING ===\n");

function fetchData(id, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`Failed to fetch data ${id}`));
            } else {
                resolve({ id, data: `Data ${id}` });
            }
        }, 500);
    });
}

async function fetchMultipleWithErrorHandling() {
    try {
        // If ANY promise rejects, entire Promise.all rejects
        const results = await Promise.all([
            fetchData(1, false),  // Success
            fetchData(2, true),   // FAILS - causes entire Promise.all to reject
            fetchData(3, false)   // Won't matter, Promise.all already rejected
        ]);
        
        console.log("All results:", results);  // Won't execute
        
    } catch (error) {
        console.log("One of the requests failed:", error.message);
    }
}

fetchMultipleWithErrorHandling();

// ========================================== 
// 8. PROMISE.ALLSETTLED - Handle Each Result
// ========================================== 

console.log("\n=== PROMISE.ALLSETTLED ===\n");

// Promise.allSettled waits for ALL promises, success or failure
// Returns array with status of each promise
async function fetchMultipleAllSettled() {
    const results = await Promise.allSettled([
        fetchData(1, false),  // Will succeed
        fetchData(2, true),   // Will fail
        fetchData(3, false)   // Will succeed
    ]);
    
    // results is array of objects with status and value/reason
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            // Success case
            console.log(`  Request ${index + 1}: SUCCESS -`, result.value.data);
        } else {
            // Failure case
            console.log(`  Request ${index + 1}: FAILED -`, result.reason.message);
        }
    });
}

fetchMultipleAllSettled();

// ========================================== 
// 9. ASYNC/AWAIT IN LOOPS
// ========================================== 

console.log("\n=== ASYNC IN LOOPS ===\n");

// Function to simulate processing
function processItem(item) {
    console.log(`  Processing ${item}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`  ✓ Processed ${item}`);
            resolve(`Result: ${item}`);
        }, 500);
    });
}

// SEQUENTIAL: Process one at a time (slow but ordered)
async function processSequential(items) {
    console.log("Sequential processing:");
    const results = [];
    
    // for...of works perfectly with await
    for (const item of items) {
        const result = await processItem(item);  // Wait for each
        results.push(result);
    }
    
    return results;
}

// PARALLEL: Process all at once (fast)
async function processParallel(items) {
    console.log("Parallel processing:");
    
    // Map creates array of Promises (all start immediately)
    const promises = items.map(item => processItem(item));
    
    // Wait for all to complete
    const results = await Promise.all(promises);
    
    return results;
}

// Compare timing
const items = ["Item1", "Item2", "Item3"];

processSequential([...items]).then(results => {
    console.log("Sequential results:", results);
    // Takes: 3 items × 500ms = 1500ms total
});

processParallel([...items]).then(results => {
    console.log("Parallel results:", results);
    // Takes: 500ms total (all at once)
});

// ========================================== 
// 10. PRACTICAL TEST AUTOMATION EXAMPLE
// ========================================== 

console.log("\n=== COMPLETE TEST EXAMPLE ===\n");

// Modern test class using async/await
class ModernTestAutomation {
    // All methods are async and use await
    
    async initBrowser() {
        console.log("🌐 Initializing browser...");
        await delay(500);
        console.log("✓ Browser ready");
    }
    
    async navigate(url) {
        console.log(`🔗 Navigating to ${url}...`);
        await delay(800);
        console.log(`✓ Loaded ${url}`);
    }
    
    async findElement(selector) {
        console.log(`🔍 Finding ${selector}...`);
        await delay(300);
        
        // Simulate element might not be found
        const found = Math.random() > 0.1;  // 90% success rate
        if (!found) {
            throw new Error(`Element not found: ${selector}`);
        }
        
        console.log(`✓ Found ${selector}`);
        return selector;
    }
    
    async click(selector) {
        console.log(`👆 Clicking ${selector}...`);
        await delay(200);
        console.log(`✓ Clicked ${selector}`);
    }
    
    async type(selector, text) {
        console.log(`⌨️  Typing into ${selector}...`);
        await delay(400);
        console.log(`✓ Typed "${text}"`);
    }
    
    async waitForElement(selector, timeout = 5000) {
        console.log(`⏳ Waiting for ${selector} (timeout: ${timeout}ms)...`);
        
        const startTime = Date.now();
        
        // Keep trying until element found or timeout
        while (Date.now() - startTime < timeout) {
            try {
                await this.findElement(selector);
                return true;  // Found!
            } catch (error) {
                // Element not found, wait and retry
                await delay(500);
            }
        }
        
        // Timeout reached
        throw new Error(`Timeout waiting for ${selector}`);
    }
    
    async screenshot(name) {
        console.log(`📸 Taking screenshot: ${name}`);
        await delay(200);
        console.log(`✓ Screenshot saved: ${name}.png`);
    }
    
    // Complete test scenario
    async runLoginTest() {
        console.log("\n🧪 Starting Modern Login Test\n");
        
        try {
            // Initialize
            await this.initBrowser();
            await this.navigate("https://example.com/login");
            
            // Login process
            await this.findElement("#username");
            await this.type("#username", "testuser@example.com");
            
            await this.findElement("#password");
            await this.type("#password", "password123");
            
            await this.screenshot("before-login");
            
            await this.findElement("#login-button");
            await this.click("#login-button");
            
            // Wait for dashboard (might take time to load)
            await this.waitForElement("#dashboard", 5000);
            
            await this.screenshot("after-login");
            
            console.log("\n✅ TEST PASSED: Login successful!");
            return { status: "PASSED", message: "Login test completed" };
            
        } catch (error) {
            // Any error in the chain caught here
            console.log("\n❌ TEST FAILED:", error.message);
            
            // Take screenshot on failure
            await this.screenshot("failure");
            
            return { status: "FAILED", message: error.message };
            
        } finally {
            // Cleanup always happens
            console.log("\n🧹 Cleanup: Closing browser");
            await delay(300);
            console.log("✓ Browser closed");
        }
    }
    
    // Run multiple tests in parallel
    async runTestSuite() {
        console.log("\n📦 Running Test Suite\n");
        
        // Create multiple test instances
        const tests = [
            this.runLoginTest(),
            // Could add more tests here
        ];
        
        // Run all tests in parallel
        const results = await Promise.allSettled(tests);
        
        // Summary
        console.log("\n📊 Test Suite Summary:");
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`  Test ${index + 1}: ${result.value.status}`);
            } else {
                console.log(`  Test ${index + 1}: ERROR -`, result.reason);
            }
        });
    }
}

// Execute the modern test
const modernTest = new ModernTestAutomation();
modernTest.runLoginTest();

// ========================================== 
// 11. COMMON PATTERNS AND BEST PRACTICES
// ========================================== 

console.log("\n=== BEST PRACTICES ===\n");

// PATTERN 1: Retry logic
async function retryOperation(operation, maxRetries = 3) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}/${maxRetries}...`);
            const result = await operation();
            console.log(`Success on attempt ${attempt}`);
            return result;  // Success, return result
        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error.message);
            lastError = error;
            
            if (attempt < maxRetries) {
                // Wait before retrying (exponential backoff)
                await delay(1000 * attempt);
            }
        }
    }
    
    // All retries failed
    throw new Error(`Failed after ${maxRetries} attempts: ${lastError.message}`);
}

// PATTERN 2: Timeout wrapper
async function withTimeout(promise, timeoutMs) {
    // Race between operation and timeout
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Operation timed out")), timeoutMs);
    });
    
    return Promise.race([promise, timeoutPromise]);
}

// Usage example
async function demonstratePatterns() {
    // Retry pattern
    const unstableOp = () => riskyOperation(Math.random() > 0.7);
    try {
        await retryOperation(unstableOp, 3);
    } catch (error) {
        console.log("All retries exhausted:", error.message);
    }
    
    // Timeout pattern
    try {
        const slowOp = delay(3000);
        await withTimeout(slowOp, 2000);  // 2 second timeout
    } catch (error) {
        console.log("Timeout:", error.message);
    }
}

demonstratePatterns();

// ========================================== 
// KEY TAKEAWAYS
// ========================================== 

/*
1. async/await: Modern way to handle Promises (cleaner than .then())
2. async function: Always returns a Promise
3. await: Pauses execution until Promise resolves (only in async functions)
4. try/catch: Handle errors in async code
5. finally: Cleanup code that always runs
6. Sequential: Use multiple awaits for dependent operations
7. Parallel: Use Promise.all() for independent operations
8. Promise.allSettled(): Handle each result individually
9. Loops: for...of works with await, map() for parallel
10. TEST AUTOMATION: Everything is async - navigate, click, type, wait!

REMEMBER:
- Use async/await instead of .then() chains (more readable)
- Always use try/catch for error handling
- Run independent operations in parallel (faster tests)
- Use finally for cleanup (close browser, etc.)
- Retry flaky operations
- Add timeouts to prevent hanging
*/