// ========================================== 
// DAY 8 - ASYNCHRONOUS JAVASCRIPT
// Part 1: Callbacks & Promises
// ========================================== 

// ========================================== 
// 1. UNDERSTANDING SYNCHRONOUS vs ASYNCHRONOUS
// ========================================== 

console.log("=== SYNCHRONOUS vs ASYNCHRONOUS ===\n");

// SYNCHRONOUS CODE - Executes line by line, waits for each to complete
console.log("1. First - Synchronous");   // Executes first
console.log("2. Second - Synchronous");  // Executes second
console.log("3. Third - Synchronous");   // Executes third
// Output order: 1, 2, 3 (predictable)

console.log("\n--- Now with Asynchronous ---\n");

// ASYNCHRONOUS CODE - Doesn't wait, continues to next line
console.log("1. First - Synchronous");   // Executes immediately

// setTimeout is asynchronous - schedules function to run after delay
// Takes 2 parameters: function to execute, delay in milliseconds
setTimeout(() => {
    console.log("2. Second - Asynchronous (after 2s)");  // Executes LAST (after 2 seconds)
}, 2000);  // 2000ms = 2 seconds delay

console.log("3. Third - Synchronous");   // Executes SECOND (doesn't wait for setTimeout)
// Output order: 1, 3, 2 (3 comes before 2!)

// Why? JavaScript is non-blocking - it doesn't wait for async operations

// ========================================== 
// 2. CALLBACKS - The Old Way
// ========================================== 

console.log("\n=== CALLBACKS ===\n");

// Callback = Function passed as argument to another function
// Called back when async operation completes

// Simulating loading a web page (async operation)
// Parameters: pageName (string), callback function to execute when done
function loadPage(pageName, callback) {
    console.log(`Loading ${pageName}...`);  // Log start of loading
    
    // Simulate network delay with setTimeout
    setTimeout(() => {
        console.log(`${pageName} loaded!`);  // Log completion
        callback();  // Execute the callback function passed in
    }, 1000);  // Simulate 1 second load time
}

// Using the callback function
// Second parameter is anonymous function (callback) that runs after page loads
loadPage("Login Page", function() {
    console.log("Now I can interact with the page!");  // Runs after page loads
});

// ========================================== 
// 3. CALLBACK HELL - The Problem
// ========================================== 

console.log("\n=== CALLBACK HELL ===\n");

// Problem: Nested callbacks become unreadable (called "callback hell" or "pyramid of doom")
// Each operation must wait for previous one to complete

// Simulating sequential test steps
function openBrowser(callback) {
    console.log("Opening browser...");
    setTimeout(() => {
        console.log("Browser opened");
        callback();  // Move to next step
    }, 500);
}

function navigateToUrl(url, callback) {
    console.log(`Navigating to ${url}...`);
    setTimeout(() => {
        console.log(`Navigated to ${url}`);
        callback();  // Move to next step
    }, 500);
}

function login(username, callback) {
    console.log(`Logging in as ${username}...`);
    setTimeout(() => {
        console.log("Logged in successfully");
        callback();  // Move to next step
    }, 500);
}

function closeBrowser(callback) {
    console.log("Closing browser...");
    setTimeout(() => {
        console.log("Browser closed");
        callback();  // Done
    }, 500);
}

// THE PROBLEM: Deep nesting (callback hell)
// Each step depends on previous step completing
// Code moves right instead of down - hard to read and maintain
openBrowser(() => {                           // Level 1 nesting
    navigateToUrl("https://example.com", () => {    // Level 2 nesting
        login("testuser", () => {                     // Level 3 nesting
            closeBrowser(() => {                       // Level 4 nesting
                console.log("Test completed!");         // Finally done!
            });
        });
    });
});
// This is hard to read, hard to debug, and hard to handle errors

// ========================================== 
// 4. PROMISES - The Solution
// ========================================== 

console.log("\n=== PROMISES ===\n");

// Promise = Object representing eventual completion (or failure) of async operation
// Promise has 3 states:
// 1. Pending - initial state, operation not completed
// 2. Fulfilled - operation completed successfully
// 3. Rejected - operation failed

// Creating a Promise
// Promise takes function with 2 parameters: resolve (success), reject (failure)
const myPromise = new Promise((resolve, reject) => {
    // Simulate async operation
    setTimeout(() => {
        const success = true;  // Simulate success/failure
        
        if (success) {
            resolve("Operation successful!");  // Call resolve with success data
        } else {
            reject("Operation failed!");       // Call reject with error
        }
    }, 1000);
});

// Using Promise with .then() and .catch()
// .then() - executes when promise resolves (success)
// .catch() - executes when promise rejects (failure)
myPromise
    .then(result => {
        console.log("Success:", result);  // Runs if resolved
    })
    .catch(error => {
        console.log("Error:", error);     // Runs if rejected
    });

// ========================================== 
// 5. PROMISE EXAMPLE - Web Page Loading
// ========================================== 

console.log("\n=== PROMISE EXAMPLE ===\n");

// Better version using Promises instead of callbacks
// Returns a Promise instead of taking callback parameter
function loadPagePromise(pageName) {
    console.log(`Loading ${pageName}...`);
    
    // Return new Promise
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const randomSuccess = Math.random() > 0.2;  // 80% success rate
            
            if (randomSuccess) {
                console.log(`${pageName} loaded successfully`);
                resolve(`${pageName} is ready`);  // Pass success data
            } else {
                console.log(`${pageName} failed to load`);
                reject(`Error loading ${pageName}`);  // Pass error message
            }
        }, 1000);
    });
}

// Using the Promise - much cleaner than callbacks
loadPagePromise("Dashboard")
    .then(message => {
        console.log("Then block:", message);  // Handles success
        return "Moving to next step";  // Can return value for next .then()
    })
    .then(message => {
        console.log("Chained then:", message);  // Receives previous return value
    })
    .catch(error => {
        console.log("Catch block:", error);  // Handles any error in chain
    })
    .finally(() => {
        console.log("Finally block: Cleanup runs regardless of success/failure");
    });

// ========================================== 
// 6. PROMISE CHAINING - Sequential Operations
// ========================================== 

console.log("\n=== PROMISE CHAINING ===\n");

// Promise chaining solves callback hell
// Each .then() returns a Promise, allowing chaining

// Better versions of our test functions using Promises
function openBrowserPromise() {
    console.log("Opening browser...");
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("✓ Browser opened");
            resolve();  // Signal completion
        }, 500);
    });
}

function navigateToUrlPromise(url) {
    console.log(`Navigating to ${url}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`✓ Navigated to ${url}`);
            resolve(url);  // Pass URL to next step
        }, 500);
    });
}

function loginPromise(username) {
    console.log(`Logging in as ${username}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`✓ Logged in as ${username}`);
            resolve(username);  // Pass username to next step
        }, 500);
    });
}

function closeBrowserPromise() {
    console.log("Closing browser...");
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("✓ Browser closed");
            resolve();
        }, 500);
    });
}

// MUCH BETTER: Flat chain instead of nested callbacks
// Reads top to bottom, easy to understand
openBrowserPromise()
    .then(() => navigateToUrlPromise("https://example.com"))  // Return next Promise
    .then(() => loginPromise("testuser"))                     // Chain continues
    .then(() => closeBrowserPromise())                        // Keep chaining
    .then(() => {
        console.log("🎉 Test completed successfully!");       // Final success
    })
    .catch(error => {
        console.log("❌ Test failed:", error);  // Any error in chain caught here
    });

// ========================================== 
// 7. PROMISE ERROR HANDLING
// ========================================== 

console.log("\n=== PROMISE ERROR HANDLING ===\n");

// Function that might fail
function riskyOperation(shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error("Something went wrong!"));  // Reject with Error object
            } else {
                resolve("Success!");  // Resolve normally
            }
        }, 500);
    });
}

// Error handling in Promise chain
riskyOperation(false)  // Try with false first (success)
    .then(result => {
        console.log("Result:", result);
        return riskyOperation(true);  // Now try with true (will fail)
    })
    .then(result => {
        console.log("This won't run");  // Skipped because previous rejected
    })
    .catch(error => {
        console.log("Caught error:", error.message);  // Catches rejection
        return "Recovered!";  // Can recover from error
    })
    .then(result => {
        console.log("After recovery:", result);  // Chain continues after catch
    });

// ========================================== 
// 8. PROMISE.ALL - Parallel Operations
// ========================================== 

console.log("\n=== PROMISE.ALL ===\n");

// Promise.all() - Run multiple promises in parallel
// Waits for ALL to complete
// If ANY fails, entire Promise.all rejects

function fetchUser(userId) {
    console.log(`Fetching user ${userId}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: userId, name: `User ${userId}` });
        }, 1000);
    });
}

function fetchPosts(userId) {
    console.log(`Fetching posts for user ${userId}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([`Post 1`, `Post 2`, `Post 3`]);
        }, 1500);
    });
}

function fetchComments(postId) {
    console.log(`Fetching comments for post ${postId}...`);
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([`Comment 1`, `Comment 2`]);
        }, 800);
    });
}

// Run all three operations in parallel
// All start at same time, wait for slowest to finish
Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
])
    .then(results => {
        // results is array with all resolved values in order
        const [user, posts, comments] = results;  // Destructure array
        console.log("User:", user);
        console.log("Posts:", posts);
        console.log("Comments:", comments);
        console.log("All data loaded in parallel!");
    })
    .catch(error => {
        console.log("One of the operations failed:", error);
    });

// ========================================== 
// 9. PROMISE.RACE - First to Finish Wins
// ========================================== 

console.log("\n=== PROMISE.RACE ===\n");

// Promise.race() - Returns when FIRST promise settles (resolves or rejects)
// Useful for timeouts

function slowOperation() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Slow operation done"), 3000);  // 3 seconds
    });
}

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(new Error("Timeout!")), ms);  // Reject after timeout
    });
}

// Race between operation and timeout
// Whichever finishes first wins
Promise.race([
    slowOperation(),
    timeout(2000)  // 2 second timeout
])
    .then(result => {
        console.log("Completed:", result);  // Only if operation finishes first
    })
    .catch(error => {
        console.log("Failed:", error.message);  // Timeout will win and reject
    });

// ========================================== 
// 10. PRACTICAL TEST AUTOMATION EXAMPLE
// ========================================== 

console.log("\n=== PRACTICAL EXAMPLE ===\n");

// Real-world test scenario using Promises
class TestAutomation {
    // Initialize browser (returns Promise)
    initBrowser() {
        console.log("🌐 Initializing browser...");
        return new Promise(resolve => {
            setTimeout(() => {
                console.log("✓ Browser initialized");
                resolve();
            }, 500);
        });
    }
    
    // Navigate to URL (returns Promise)
    navigate(url) {
        console.log(`🔗 Navigating to ${url}...`);
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`✓ Loaded ${url}`);
                resolve();
            }, 1000);
        });
    }
    
    // Find element (returns Promise)
    findElement(selector) {
        console.log(`🔍 Finding element: ${selector}...`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const found = Math.random() > 0.1;  // 90% success rate
                if (found) {
                    console.log(`✓ Element found: ${selector}`);
                    resolve(selector);
                } else {
                    reject(new Error(`Element not found: ${selector}`));
                }
            }, 500);
        });
    }
    
    // Click element (returns Promise)
    click(selector) {
        console.log(`👆 Clicking ${selector}...`);
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`✓ Clicked ${selector}`);
                resolve();
            }, 300);
        });
    }
    
    // Type text (returns Promise)
    type(selector, text) {
        console.log(`⌨️  Typing into ${selector}...`);
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(`✓ Typed "${text}" into ${selector}`);
                resolve();
            }, 500);
        });
    }
    
    // Run complete login test
    runLoginTest() {
        console.log("\n🧪 Starting Login Test...\n");
        
        // Chain all operations sequentially
        return this.initBrowser()
            .then(() => this.navigate("https://example.com/login"))
            .then(() => this.findElement("#username"))
            .then(() => this.type("#username", "testuser@example.com"))
            .then(() => this.findElement("#password"))
            .then(() => this.type("#password", "password123"))
            .then(() => this.findElement("#login-button"))
            .then(() => this.click("#login-button"))
            .then(() => this.findElement("#dashboard"))
            .then(() => {
                console.log("\n✅ Login test PASSED!");
            })
            .catch(error => {
                console.log("\n❌ Login test FAILED:", error.message);
            });
    }
}

// Execute the test
const test = new TestAutomation();
test.runLoginTest();

// ========================================== 
// KEY TAKEAWAYS
// ========================================== 

/*
1. CALLBACKS: Old way, leads to callback hell
2. PROMISES: Modern solution, cleaner code
3. PROMISE STATES: pending → fulfilled/rejected
4. .then(): Handle success
5. .catch(): Handle errors
6. .finally(): Runs regardless of success/failure
7. CHAINING: Sequential operations, flat structure
8. Promise.all(): Run parallel operations
9. Promise.race(): Timeout implementation
10. TEST AUTOMATION: All interactions are async!
*/