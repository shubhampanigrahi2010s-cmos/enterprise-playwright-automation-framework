# Day 8 - Asynchronous JavaScript, Promises, Async/Await & API Testing

## Overview
Asynchronous JavaScript is the foundation of modern test automation. Every operation in testing - waiting for pages to load, finding elements, making API calls, handling timeouts - is asynchronous. This day covers the complete async programming paradigm from callbacks to modern async/await syntax.

---

## Part 1: Understanding Asynchronous Programming

### Synchronous vs Asynchronous Execution

#### Synchronous Code
Code that executes line by line, waiting for each operation to complete before moving to the next. Predictable but can cause blocking when operations take time.

**Characteristics:**
- Executes in order, top to bottom
- Each line waits for previous line to complete
- Blocks execution during long operations
- Predictable output order

#### Asynchronous Code
Code that doesn't wait for operations to complete. Continues executing while operations run in the background. Essential for non-blocking operations.

**Characteristics:**
- Doesn't block execution
- Operations run in background
- Callbacks/promises notify when complete
- Unpredictable output order without proper handling

#### Why Asynchronous Matters in Testing
- Page loading takes time (network requests)
- Elements may not be immediately available
- API calls have network latency
- Database queries need time to execute
- File operations are I/O bound
- Tests need to wait without blocking

---

## Part 2: Callbacks - The Old Way

### What are Callbacks?
A callback is a function passed as an argument to another function, to be executed when an asynchronous operation completes.

### How Callbacks Work
When an async operation starts, you provide a callback function. When the operation finishes, the callback is "called back" with the results.

### The Callback Hell Problem
When multiple async operations depend on each other, callbacks become deeply nested. This creates a pyramid-shaped code structure that's hard to read, debug, and maintain.

**Problems with Callback Hell:**
- Code moves right instead of down
- Difficult to read and understand flow
- Error handling becomes complex
- Hard to debug nested callbacks
- Maintenance nightmare

### When Callbacks Were Useful
Before Promises, callbacks were the only way to handle async operations. Still used in some older libraries and APIs.

---

## Part 3: Promises - The Modern Solution

### What is a Promise?
A Promise is an object representing the eventual completion or failure of an asynchronous operation. It's a container for a future value.

### Promise States
A Promise exists in one of three states:

#### Pending
Initial state, operation has not completed yet. Neither fulfilled nor rejected.

#### Fulfilled (Resolved)
Operation completed successfully. Promise now has a resulting value.

#### Rejected
Operation failed. Promise has a reason for failure (error).

**Important:** Once a Promise settles (fulfilled or rejected), its state cannot change.

### Creating Promises
Promises are created using the Promise constructor, which takes a function with two parameters: resolve and reject.

**Resolve:** Call when operation succeeds, passing the success value.

**Reject:** Call when operation fails, passing the error.

### Using Promises

#### .then() Method
Handles successful Promise resolution. Takes a function that receives the resolved value. Returns a new Promise, enabling chaining.

#### .catch() Method
Handles Promise rejection (errors). Takes a function that receives the error. Catches any error in the Promise chain.

#### .finally() Method
Executes regardless of success or failure. Perfect for cleanup operations like closing connections or browsers. Does not receive any value.

### Promise Chaining
Multiple .then() calls can be chained together. Each .then() returns a new Promise, allowing sequential async operations without nesting.

**Benefits of Chaining:**
- Flat code structure (reads top to bottom)
- Easy to add steps in sequence
- Single .catch() handles all errors
- Much more readable than callbacks

### Error Propagation in Chains
When any Promise in a chain rejects, execution jumps to the next .catch(). All .then() between error and .catch() are skipped.

---

## Part 4: Promise Utility Methods

### Promise.all()
Runs multiple Promises in parallel and waits for ALL to complete.

**Behavior:**
- Takes array of Promises
- Starts all Promises simultaneously
- Waits for slowest to complete
- Returns array of all results in order
- If ANY Promise rejects, entire Promise.all() rejects

**Use Cases:**
- Loading multiple resources simultaneously
- Running independent API calls in parallel
- Fetching user data and permissions together
- Faster test execution (parallel operations)

### Promise.race()
Returns when the FIRST Promise settles (resolves or rejects).

**Behavior:**
- Takes array of Promises
- Returns result of fastest Promise
- Ignores slower Promises
- Winner can be success or failure

**Use Cases:**
- Implementing timeouts
- Getting fastest response from multiple sources
- Canceling slow operations

### Promise.allSettled()
Waits for ALL Promises to settle, regardless of success or failure.

**Behavior:**
- Takes array of Promises
- Waits for all to complete
- Returns array with status of each
- Never rejects (always resolves)
- Each result has status ('fulfilled' or 'rejected') and value/reason

**Use Cases:**
- Running multiple tests where some might fail
- Batch operations where all results matter
- Collecting all outcomes regardless of success

### Promise.any()
Returns when the FIRST Promise fulfills successfully.

**Behavior:**
- Ignores rejected Promises
- Returns first successful result
- Only rejects if ALL Promises reject

**Use Cases:**
- Getting data from multiple redundant sources
- Fallback strategies

---

## Part 5: Async/Await - Modern Syntax

### What is Async/Await?
Syntactic sugar over Promises that makes asynchronous code look and behave like synchronous code. Introduced in ES2017.

### The async Keyword
Placed before a function declaration. Makes the function automatically return a Promise. Allows use of await inside the function.

**Key Points:**
- Any function can be marked async
- Return value automatically wrapped in Promise
- Can use await keyword inside
- Arrow functions can be async too

### The await Keyword
Pauses execution of async function until Promise resolves. Can ONLY be used inside async functions.

**Key Points:**
- Waits for Promise to settle
- Returns resolved value
- If Promise rejects, throws error
- Makes code read like synchronous code
- Much cleaner than .then() chains

### Converting Promises to Async/Await
Any Promise-based code can be rewritten with async/await. The async/await version is typically more readable and easier to maintain.

**Benefits:**
- Reads top to bottom like sync code
- Easier to understand flow
- Better error handling with try/catch
- Cleaner code structure
- Easier debugging

---

## Part 6: Error Handling with Try/Catch

### Try/Catch/Finally Blocks

#### Try Block
Contains code that might throw an error. Execution stops at first error and jumps to catch block.

#### Catch Block
Executes when error occurs in try block. Receives error object with details. Can handle error or re-throw it.

#### Finally Block
Always executes, whether try succeeds or fails. Perfect for cleanup operations. Executes even if try or catch has return statement.

### Error Handling Best Practices

**Always Use Try/Catch with Async/Await:**
Without try/catch, unhandled Promise rejections can crash applications or cause silent failures in tests.

**Provide Context in Errors:**
Include relevant information like test name, step number, expected vs actual values.

**Use Finally for Cleanup:**
Close browsers, database connections, file handles in finally block to ensure cleanup happens.

**Log Errors Properly:**
Include error type, message, stack trace, and context for debugging.

---

## Part 7: Sequential vs Parallel Operations

### Sequential Operations
Operations that must run one after another. Each waits for previous to complete.

**When to Use:**
- Operations depend on each other
- Need result from one for the next
- Order matters
- Example: Login before navigating to dashboard

**Implementation:**
Use multiple await statements in sequence. Each await pauses until Promise resolves.

**Performance:**
Slower but necessary when operations are dependent. Total time is sum of all operations.

### Parallel Operations
Operations that can run simultaneously. Don't depend on each other.

**When to Use:**
- Independent operations
- Order doesn't matter
- Want faster execution
- Example: Fetching user data and settings simultaneously

**Implementation:**
Start all Promises without awaiting, then await Promise.all() on array of Promises.

**Performance:**
Much faster for independent operations. Total time is duration of slowest operation, not sum.

---

## Part 8: Async/Await in Loops

### For...of Loop with Await
The for...of loop works perfectly with await. Operations execute sequentially, one at a time.

**Use Case:**
- Need to process items in order
- Each operation depends on previous
- Sequential processing required

**Timing:**
If each operation takes 500ms and you have 5 items, total time is 2500ms (sequential).

### Map with Await (Parallel)
Use map() to create array of Promises, then await Promise.all() to run them in parallel.

**Use Case:**
- Operations are independent
- Order doesn't matter
- Want maximum speed
- Processing multiple test data sets

**Timing:**
If each operation takes 500ms and you have 5 items, total time is 500ms (parallel).

### Choosing Sequential vs Parallel in Loops
Consider dependencies, order requirements, and desired performance when choosing approach.

---

## Part 9: JSON (JavaScript Object Notation)

### What is JSON?
Text-based format for storing and exchanging data. Language-independent but uses JavaScript object syntax. Standard format for APIs and configuration files.

### JSON Syntax Rules
- Data is in key-value pairs
- Keys must be strings in double quotes
- Values can be: string, number, object, array, boolean, null
- No trailing commas
- No comments allowed
- More strict than JavaScript objects

### JSON.stringify()
Converts JavaScript object to JSON string.

**Purpose:**
- Sending data to APIs
- Saving data to files
- Storing data in local storage
- Logging objects in readable format

**Parameters:**
1. Object to convert
2. Replacer (null or array of properties to include)
3. Space (number for indentation or string)

**Use Cases in Testing:**
- Preparing API request bodies
- Saving test results to files
- Creating test data files
- Logging complex objects

### JSON.parse()
Converts JSON string back to JavaScript object.

**Purpose:**
- Reading API responses
- Loading data from files
- Parsing stored data
- Converting configuration strings

**Error Handling:**
Always wrap in try/catch because invalid JSON throws SyntaxError.

**Common JSON Errors:**
- Missing quotes around keys
- Single quotes instead of double
- Trailing commas
- Comments in JSON
- Undefined or functions (not valid in JSON)

---

## Part 10: Error Types in JavaScript

### Built-in Error Types

#### SyntaxError
Thrown when code has invalid syntax or JSON is malformed.

**Common Causes:**
- Invalid JSON format
- Missing brackets or quotes
- Typos in code

#### ReferenceError
Thrown when trying to access variable that doesn't exist.

**Common Causes:**
- Using undeclared variable
- Typo in variable name
- Variable out of scope

#### TypeError
Thrown when value is not of expected type or operation is invalid.

**Common Causes:**
- Calling method on wrong type
- Accessing property of null/undefined
- Using non-function as function

#### RangeError
Thrown when value is outside valid range.

**Common Causes:**
- Invalid array length
- Number out of valid range
- Invalid date values

### Custom Error Classes
Create custom errors by extending Error class. Allows specific error types for different scenarios.

**Benefits:**
- Specific error types for different failures
- Additional properties for context
- Better error categorization
- Cleaner error handling with instanceof

**Common Custom Errors in Testing:**
- ElementNotFoundError
- TimeoutError
- AssertionError
- SetupError
- APIError

### Error Properties

#### name
Type of error (SyntaxError, TypeError, etc.)

#### message
Human-readable description of error

#### stack
Stack trace showing where error occurred

### Creating Informative Errors
Good error messages include:
- What went wrong
- Where it happened
- Expected vs actual values
- Context (test name, step, etc.)
- Timestamp
- Suggestions for fixing

---

## Part 11: Fetch API - HTTP Requests

### What is Fetch?
Modern JavaScript API for making HTTP requests. Returns Promises, works with async/await. Replaces older XMLHttpRequest.

### Fetch Basics
Call fetch() with URL, returns Promise that resolves to Response object. Response object contains status, headers, and body.

### HTTP Methods

#### GET Request
Retrieve data from server. No body needed. Most common request type.

#### POST Request
Send data to create new resource. Includes body with data.

#### PUT Request
Update existing resource completely. Includes body with updated data.

#### PATCH Request
Partially update existing resource. Includes body with changed fields only.

#### DELETE Request
Remove resource from server. Usually no body needed.

### Request Options

#### method
HTTP method to use (GET, POST, PUT, DELETE, etc.)

#### headers
Object with request headers like Content-Type, Authorization, etc.

#### body
Data to send with request. Must be string (use JSON.stringify for objects).

### Response Object

#### response.ok
Boolean indicating if request was successful (status 200-299).

#### response.status
HTTP status code (200, 404, 500, etc.)

#### response.statusText
HTTP status message ('OK', 'Not Found', etc.)

#### response.json()
Parses response body as JSON. Returns Promise.

#### response.text()
Gets response body as plain text. Returns Promise.

### Error Handling with Fetch
Fetch only rejects on network errors, not HTTP errors. Must check response.ok for HTTP errors.

**Two Types of Errors:**
1. Network errors (no internet, DNS failure) - Promise rejects
2. HTTP errors (404, 500) - Promise resolves but response.ok is false

---

## Part 12: API Testing

### Why API Testing Matters
- Faster than UI testing
- More stable (no UI changes)
- Better for testing business logic
- Can test before UI exists
- Essential for microservices

### API Testing Workflow

#### 1. Make Request
Send HTTP request with appropriate method, headers, and body.

#### 2. Verify Status Code
Check if response has expected status (200, 201, 404, etc.).

#### 3. Parse Response
Convert JSON response to JavaScript object.

#### 4. Verify Response Structure
Check if response has expected fields and types.

#### 5. Verify Response Data
Validate actual values match expectations.

#### 6. Handle Errors
Catch and log any failures with full context.

### Authentication in API Testing

#### Bearer Token
Most common authentication method. Include token in Authorization header with 'Bearer' prefix.

#### API Keys
Pass key in header or query parameter.

#### Basic Auth
Username and password encoded in Authorization header.

### Building API Testing Framework

#### Base Class
Create reusable class with common request logic, error handling, and utilities.

#### Request Method
Generic method that handles all HTTP methods, headers, error handling, and response parsing.

#### Convenience Methods
Specific methods for GET, POST, PUT, DELETE that call base request method.

#### Verification Methods
Methods to verify response status, structure, and data.

#### Logging
Log all requests, responses, and errors with full context.

---

## Part 13: Practical Patterns

### Retry Logic
Automatically retry failed operations. Useful for flaky tests or network issues.

**Implementation:**
- Try operation
- If fails, wait and retry
- Limit maximum retries
- Increase wait time with each retry (exponential backoff)
- Throw error if all retries fail

**Use Cases:**
- Finding elements that take time to appear
- Network requests that might fail temporarily
- Database operations with locks

### Timeout Pattern
Prevent operations from hanging forever.

**Implementation:**
- Create timeout Promise that rejects after specified time
- Race original operation against timeout
- Return result if operation wins
- Throw timeout error if timeout wins

**Use Cases:**
- Page loading
- Element waiting
- API requests
- Long-running operations

### Polling Pattern
Keep checking condition until it becomes true.

**Implementation:**
- Start check loop
- Check condition
- If true, return success
- If false, wait and check again
- Continue until timeout
- Throw error if timeout reached

**Use Cases:**
- Waiting for element to be visible
- Waiting for API status to change
- Waiting for file to exist

---

## Part 14: Test Automation Patterns

### Page Object Model with Async
All page object methods should be async since all interactions are async operations.

### Test Setup and Teardown
Use try/catch/finally pattern. Setup in try, test in try, cleanup in finally.

### Parallel Test Execution
Run independent tests in parallel using Promise.all() to reduce total execution time.

### Sequential Test Steps
Use sequential awaits for dependent operations within a single test.

### Error Screenshots
In catch block, take screenshot before closing browser for debugging failures.

### Test Data from JSON
Load test data from JSON files using fetch or file system APIs, parse with JSON.parse().

### Test Results to JSON
Save test results as JSON using JSON.stringify() for reports and analysis.

---

## Best Practices Summary

### Async/Await
1. Always use async/await instead of .then() chains (cleaner)
2. Wrap await calls in try/catch for error handling
3. Use Promise.all() for parallel operations
4. Use sequential awaits only when operations depend on each other
5. Mark all test methods as async

### Error Handling
1. Always wrap JSON.parse() in try/catch
2. Create custom error classes for specific scenarios
3. Provide detailed error messages with context
4. Log errors with test name, step, and stack trace
5. Use finally block for cleanup operations

### API Testing
1. Check response.ok, don't just check status code
2. Parse response even for errors (might contain error details)
3. Create reusable API testing class
4. Verify response structure and data
5. Handle both network and HTTP errors
6. Include authentication in base class

### JSON
1. Use null, 2 for pretty printing during development
2. Always wrap JSON.parse in try/catch
3. Validate JSON structure before parsing when possible
4. Use JSON for test data, configuration, and results

### Performance
1. Run independent operations in parallel
2. Use appropriate timeout values
3. Implement retry logic for flaky operations
4. Monitor test execution time
5. Optimize by reducing unnecessary waits

---

## Common Mistakes to Avoid

### Forgetting await
Forgetting await means you get a Promise instead of the actual value. Always await async operations.

### Not Handling Errors
Unhandled Promise rejections can crash tests or cause silent failures. Always use try/catch.

### Sequential When Parallel Possible
Running independent operations sequentially wastes time. Use Promise.all() for parallel operations.

### Parallel When Sequential Required
Running dependent operations in parallel causes race conditions and failures.

### Not Using Finally for Cleanup
If cleanup code is in try or catch, it might not run on errors. Use finally for cleanup.

### Assuming Fetch Rejects on HTTP Errors
Fetch only rejects on network errors. Always check response.ok for HTTP errors.

### Invalid JSON
Not validating JSON before parsing leads to SyntaxErrors. Use try/catch around JSON.parse().

### Generic Error Messages
Errors without context are hard to debug. Include relevant information in error messages.

---

## Testing Scenarios

### UI Automation with Async
- Opening browser (async)
- Navigating to URL (async)
- Finding elements (async)
- Clicking buttons (async)
- Typing text (async)
- Waiting for elements (async)
- Taking screenshots (async)

### API Automation with Async
- Making HTTP requests (async)
- Parsing responses (async)
- Chaining API calls (async)
- Parallel API requests (async)
- Verifying responses (async)

### File Operations with Async
- Reading test data (async)
- Writing test results (async)
- Loading configuration (async)
- Saving screenshots (async)

---

## Key Takeaways

1. **Asynchronous is Essential**: Every operation in test automation is asynchronous

2. **Promises Over Callbacks**: Promises provide cleaner, more maintainable code than callbacks

3. **Async/Await is King**: Use async/await for all new code, much more readable than .then() chains

4. **Error Handling is Critical**: Always use try/catch with async/await, errors will happen

5. **Parallel for Speed**: Use Promise.all() for independent operations to speed up tests

6. **Sequential for Dependencies**: Use sequential awaits when operations depend on each other

7. **JSON is Everywhere**: APIs, configuration, test data - all use JSON

8. **Custom Errors Help**: Create specific error types for different failure scenarios

9. **Fetch for APIs**: Modern way to make HTTP requests, works perfectly with async/await

10. **Test Patterns**: Retry logic, timeouts, and polling are essential patterns in testing

---

## Real-World Application in Test Automation

Every modern test automation framework (Playwright, Selenium, Cypress) uses async/await extensively:

- **Playwright**: All actions return Promises, use async/await
- **Selenium**: WebDriver commands are async
- **API Testing**: All HTTP requests are async
- **Database**: All queries are async
- **File Operations**: All I/O is async

Understanding async JavaScript is not optional - it's the foundation of all modern test automation work.

---

## Next Steps

With complete understanding of asynchronous JavaScript, you're now ready to:

1. Learn TypeScript (builds on this JavaScript foundation)
2. Start with Playwright (uses async/await extensively)
3. Build API test frameworks
4. Create custom test utilities
5. Handle complex test scenarios
6. Build robust, production-ready test automation

Asynchronous programming is the most important concept in modern test automation. Master this, and everything else becomes easier.