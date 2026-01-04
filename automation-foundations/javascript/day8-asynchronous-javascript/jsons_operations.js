// ========================================== 
// DAY 8 - ASYNCHRONOUS JAVASCRIPT
// Part 3: JSON, Error Handling & API Testing
// ========================================== 

// ========================================== 
// 1. JSON BASICS - JavaScript Object Notation
// ========================================== 

console.log("=== JSON BASICS ===\n");

// JSON is a TEXT FORMAT for storing and exchanging data
// Used extensively in APIs, config files, test data

// JavaScript Object (in memory)
const userObject = {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    isActive: true,
    roles: ["admin", "user"],
    metadata: {
        lastLogin: "2025-01-04T10:00:00Z",
        loginCount: 42
    }
};

console.log("JavaScript Object:", userObject);
console.log("Type:", typeof userObject);  // "object"

// JSON.stringify() - Convert JavaScript object to JSON string
// Used when sending data to API or saving to file
const jsonString = JSON.stringify(userObject);
console.log("\nJSON String:", jsonString);
console.log("Type:", typeof jsonString);  // "string"

// JSON.parse() - Convert JSON string back to JavaScript object
// Used when receiving data from API or reading from file
const parsedObject = JSON.parse(jsonString);
console.log("\nParsed Object:", parsedObject);
console.log("Type:", typeof parsedObject);  // "object"

// ========================================== 
// 2. JSON.stringify() OPTIONS
// ========================================== 

console.log("\n=== JSON.stringify OPTIONS ===\n");

const testData = {
    testName: "Login Test",
    status: "passed",
    duration: 2500,
    steps: [
        { action: "navigate", url: "https://example.com" },
        { action: "click", selector: "#login" },
        { action: "type", selector: "#username", value: "test@example.com" }
    ]
};

// Basic stringify - everything on one line
console.log("Basic stringify:");
console.log(JSON.stringify(testData));

// Pretty print with indentation (very useful for debugging)
// JSON.stringify(object, replacer, spaces)
// - object: what to stringify
// - replacer: null (include all properties) or array of properties to include
// - spaces: number of spaces for indentation (or string like "\t")
console.log("\nPretty print (2 spaces):");
console.log(JSON.stringify(testData, null, 2));

// Pretty print with 4 spaces
console.log("\nPretty print (4 spaces):");
console.log(JSON.stringify(testData, null, 4));

// Selective properties using replacer
// Only include specific properties
console.log("\nSelective properties:");
console.log(JSON.stringify(testData, ["testName", "status"], 2));

// Custom replacer function
// Modify values during stringification
const customStringify = JSON.stringify(testData, (key, value) => {
    // Hide sensitive data
    if (key === "value") {
        return "***HIDDEN***";  // Replace actual value
    }
    return value;  // Keep other values as-is
}, 2);

console.log("\nWith custom replacer (hiding values):");
console.log(customStringify);

// ========================================== 
// 3. JSON.parse() WITH ERROR HANDLING
// ========================================== 

console.log("\n=== JSON.parse ERROR HANDLING ===\n");

// Valid JSON string
const validJson = '{"name":"Test","status":"passed"}';

// Invalid JSON strings (common mistakes)
const invalidJson1 = '{name:"Test"}';           // Missing quotes around key
const invalidJson2 = "{'name':'Test'}";         // Single quotes instead of double
const invalidJson3 = '{"name":"Test",}';        // Trailing comma
const invalidJson4 = '{"name":"Test"';          // Missing closing brace

// Always wrap JSON.parse in try-catch
// Invalid JSON will throw SyntaxError
function safeJsonParse(jsonString) {
    try {
        // Attempt to parse JSON string
        const result = JSON.parse(jsonString);
        console.log("✓ Successfully parsed:", result);
        return result;
    } catch (error) {
        // Catch parsing errors
        console.log("✗ Parse failed:", error.message);
        return null;  // Return null or default value
    }
}

console.log("Parsing valid JSON:");
safeJsonParse(validJson);

console.log("\nParsing invalid JSON (missing quotes):");
safeJsonParse(invalidJson1);

console.log("\nParsing invalid JSON (single quotes):");
safeJsonParse(invalidJson2);

// ========================================== 
// 4. WORKING WITH API RESPONSES
// ========================================== 

console.log("\n=== API RESPONSE HANDLING ===\n");

// Simulating API response (this is what APIs return)
const apiResponse = `{
    "success": true,
    "data": {
        "user": {
            "id": 123,
            "username": "testuser",
            "email": "test@example.com"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        "expiresIn": 3600
    },
    "message": "Login successful"
}`;

// Parse API response
try {
    const response = JSON.parse(apiResponse);
    
    // Extract data from response
    console.log("Success:", response.success);
    console.log("Message:", response.message);
    console.log("User ID:", response.data.user.id);
    console.log("Username:", response.data.user.username);
    console.log("Token:", response.data.token.substring(0, 20) + "...");
    
    // Check if response is successful
    if (response.success) {
        console.log("✓ API call succeeded");
        // Store token for future requests
        const authToken = response.data.token;
    } else {
        console.log("✗ API call failed");
    }
    
} catch (error) {
    console.log("Failed to parse API response:", error.message);
}

// ========================================== 
// 5. ERROR TYPES IN JAVASCRIPT
// ========================================== 

console.log("\n=== ERROR TYPES ===\n");

// JavaScript has several built-in error types
// Understanding them helps with debugging

// 1. SyntaxError - Invalid JavaScript syntax or JSON
try {
    JSON.parse('{invalid json}');
} catch (error) {
    console.log("1. SyntaxError:");
    console.log("   Name:", error.name);
    console.log("   Message:", error.message);
}

// 2. ReferenceError - Variable doesn't exist
try {
    console.log(nonExistentVariable);  // Variable not defined
} catch (error) {
    console.log("\n2. ReferenceError:");
    console.log("   Name:", error.name);
    console.log("   Message:", error.message);
}

// 3. TypeError - Wrong type or invalid operation
try {
    const num = 42;
    num.toUpperCase();  // Numbers don't have toUpperCase method
} catch (error) {
    console.log("\n3. TypeError:");
    console.log("   Name:", error.name);
    console.log("   Message:", error.message);
}

// 4. RangeError - Value out of valid range
try {
    const arr = new Array(-1);  // Array length can't be negative
} catch (error) {
    console.log("\n4. RangeError:");
    console.log("   Name:", error.name);
    console.log("   Message:", error.message);
}

// ========================================== 
// 6. CUSTOM ERRORS
// ========================================== 

console.log("\n=== CUSTOM ERRORS ===\n");

// Create custom error classes for specific scenarios
// Extends built-in Error class

// Custom error for element not found (common in test automation)
class ElementNotFoundError extends Error {
    constructor(selector) {
        // Call parent Error constructor with message
        super(`Element not found: ${selector}`);
        
        // Set error name to class name
        this.name = "ElementNotFoundError";
        
        // Custom properties
        this.selector = selector;
        this.timestamp = new Date().toISOString();
    }
}

// Custom error for timeout
class TimeoutError extends Error {
    constructor(operation, timeout) {
        super(`Operation "${operation}" timed out after ${timeout}ms`);
        this.name = "TimeoutError";
        this.operation = operation;
        this.timeout = timeout;
    }
}

// Custom error for API failures
class APIError extends Error {
    constructor(statusCode, message) {
        super(`API Error ${statusCode}: ${message}`);
        this.name = "APIError";
        this.statusCode = statusCode;
    }
}

// Using custom errors
function findElement(selector) {
    // Simulate element not found
    const found = false;
    
    if (!found) {
        // Throw custom error with specific information
        throw new ElementNotFoundError(selector);
    }
    
    return { element: selector };
}

// Catching and handling custom errors
try {
    findElement("#submit-button");
} catch (error) {
    // Can check error type
    if (error instanceof ElementNotFoundError) {
        console.log("Custom Error Caught:");
        console.log("  Type:", error.name);
        console.log("  Message:", error.message);
        console.log("  Selector:", error.selector);
        console.log("  Timestamp:", error.timestamp);
    } else {
        console.log("Unexpected error:", error);
    }
}

// ========================================== 
// 7. ERROR HANDLING BEST PRACTICES
// ========================================== 

console.log("\n=== ERROR HANDLING BEST PRACTICES ===\n");

// PRACTICE 1: Always provide context in error messages
function processTestData(data) {
    if (!data) {
        // BAD: Generic message
        // throw new Error("Invalid data");
        
        // GOOD: Specific message with context
        throw new Error("Test data is null or undefined. Expected object with test steps.");
    }
    
    if (!Array.isArray(data.steps)) {
        // GOOD: Tell user what was expected and what was received
        throw new Error(
            `Expected 'steps' to be an array, but received ${typeof data.steps}`
        );
    }
}

// PRACTICE 2: Create error hierarchy
class TestError extends Error {
    constructor(message) {
        super(message);
        this.name = "TestError";
    }
}

class SetupError extends TestError {
    constructor(message) {
        super(message);
        this.name = "SetupError";
    }
}

class AssertionError extends TestError {
    constructor(expected, actual) {
        super(`Assertion failed: Expected ${expected}, but got ${actual}`);
        this.name = "AssertionError";
        this.expected = expected;
        this.actual = actual;
    }
}

// PRACTICE 3: Log errors with full context
function logError(error, context = {}) {
    console.log("\n❌ ERROR OCCURRED:");
    console.log("  Type:", error.name);
    console.log("  Message:", error.message);
    
    // Include context information
    if (context.testName) {
        console.log("  Test:", context.testName);
    }
    if (context.step) {
        console.log("  Step:", context.step);
    }
    
    // Include stack trace for debugging
    if (error.stack) {
        console.log("  Stack trace:");
        console.log(error.stack.split('\n').slice(0, 3).join('\n'));
    }
}

// Example usage
try {
    throw new AssertionError("Login Success", "Login Failed");
} catch (error) {
    logError(error, { testName: "Login Test", step: "Verify login" });
}

// ========================================== 
// 8. FETCH API - Making HTTP Requests
// ========================================== 

console.log("\n=== FETCH API ===\n");

// fetch() is the modern way to make HTTP requests
// Returns a Promise that resolves to Response object

// GET Request - Retrieve data
async function getUser(userId) {
    try {
        console.log(`Fetching user ${userId}...`);
        
        // fetch returns Promise
        // First .then gets Response object
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        // Check if request was successful
        if (!response.ok) {
            // response.ok is false for status codes outside 200-299
            throw new APIError(response.status, response.statusText);
        }
        
        // Parse JSON from response body
        // response.json() also returns Promise
        const data = await response.json();
        
        console.log("User data:", data);
        return data;
        
    } catch (error) {
        if (error instanceof APIError) {
            console.log("API Error:", error.message);
        } else {
            console.log("Network Error:", error.message);
        }
        throw error;  // Re-throw to caller
    }
}

// POST Request - Send data
async function createUser(userData) {
    try {
        console.log("Creating user...");
        
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',  // HTTP method
            headers: {
                'Content-Type': 'application/json',  // Tell server we're sending JSON
            },
            body: JSON.stringify(userData)  // Convert object to JSON string
        });
        
        if (!response.ok) {
            throw new APIError(response.status, response.statusText);
        }
        
        const data = await response.json();
        console.log("User created:", data);
        return data;
        
    } catch (error) {
        console.log("Failed to create user:", error.message);
        throw error;
    }
}

// Using the functions
getUser(1).then(user => {
    console.log("Retrieved user:", user.name);
});

createUser({
    name: "Test User",
    email: "test@example.com",
    username: "testuser"
}).then(user => {
    console.log("Created user with ID:", user.id);
});

// ========================================== 
// 9. API TESTING WITH ERROR HANDLING
// ========================================== 

console.log("\n=== API TESTING ===\n");

// Complete API testing class
class APITester {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;  // Base URL for all requests
        this.headers = {
            'Content-Type': 'application/json'
        };
    }
    
    // Set authentication token
    setAuthToken(token) {
        this.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Generic request method with error handling
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        try {
            console.log(`${options.method || 'GET'} ${url}`);
            
            // Merge default headers with request-specific headers
            const response = await fetch(url, {
                ...options,
                headers: { ...this.headers, ...options.headers }
            });
            
            // Parse response body (even for errors)
            let data;
            try {
                data = await response.json();
            } catch (e) {
                // Response might not be JSON
                data = await response.text();
            }
            
            // Check response status
            if (!response.ok) {
                throw new APIError(
                    response.status,
                    data.message || data || response.statusText
                );
            }
            
            console.log(`✓ Response status: ${response.status}`);
            return { status: response.status, data };
            
        } catch (error) {
            if (error instanceof APIError) {
                console.log(`✗ API Error: ${error.statusCode} - ${error.message}`);
            } else {
                console.log(`✗ Network Error: ${error.message}`);
            }
            throw error;
        }
    }
    
    // Convenience methods for different HTTP verbs
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }
    
    async put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
    
    // Test helper to verify response
    verifyResponse(response, expected) {
        console.log("\n🔍 Verifying response...");
        
        // Check status code
        if (response.status !== expected.status) {
            throw new AssertionError(
                `Status ${expected.status}`,
                `Status ${response.status}`
            );
        }
        console.log("  ✓ Status code matches");
        
        // Check response has required fields
        if (expected.fields) {
            for (const field of expected.fields) {
                if (!(field in response.data)) {
                    throw new AssertionError(
                        `Field "${field}" in response`,
                        `Field "${field}" missing`
                    );
                }
            }
            console.log("  ✓ All required fields present");
        }
        
        console.log("✅ Response verification passed");
    }
}

// ========================================== 
// 10. COMPLETE API TEST EXAMPLE
// ========================================== 

console.log("\n=== COMPLETE API TEST ===\n");

async function runAPITest() {
    // Create API tester instance
    const api = new APITester('https://jsonplaceholder.typicode.com');
    
    console.log("🧪 Starting API Test Suite\n");
    
    try {
        // TEST 1: GET user
        console.log("TEST 1: Get User");
        const getUserResponse = await api.get('/users/1');
        api.verifyResponse(getUserResponse, {
            status: 200,
            fields: ['id', 'name', 'email']
        });
        
        // TEST 2: POST create user
        console.log("\nTEST 2: Create User");
        const newUser = {
            name: "Test User",
            email: "test@example.com",
            username: "testuser123"
        };
        const createResponse = await api.post('/users', newUser);
        api.verifyResponse(createResponse, {
            status: 201,
            fields: ['id']
        });
        
        // TEST 3: PUT update user
        console.log("\nTEST 3: Update User");
        const updateData = { name: "Updated Name" };
        const updateResponse = await api.put('/users/1', updateData);
        api.verifyResponse(updateResponse, {
            status: 200,
            fields: ['id', 'name']
        });
        
        // TEST 4: DELETE user
        console.log("\nTEST 4: Delete User");
        const deleteResponse = await api.delete('/users/1');
        console.log(`✓ Delete status: ${deleteResponse.status}`);
        
        console.log("\n✅ ALL API TESTS PASSED!");
        
    } catch (error) {
        console.log("\n❌ API TEST FAILED");
        logError(error, { testName: "API Test Suite" });
    }
}

// Run the complete test
runAPITest();

// ========================================== 
// 11. SAVING TEST DATA TO JSON FILE
// ========================================== 

console.log("\n=== WORKING WITH JSON FILES ===\n");

// In test automation, you often need to save/load test data

// Creating test results object
const testResults = {
    testSuite: "Login Tests",
    timestamp: new Date().toISOString(),
    environment: "staging",
    results: [
        {
            testName: "Valid Login",
            status: "passed",
            duration: 2500,
            steps: [
                { action: "navigate", status: "passed" },
                { action: "login", status: "passed" }
            ]
        },
        {
            testName: "Invalid Login",
            status: "failed",
            duration: 1200,
            error: "Invalid credentials",
            screenshot: "invalid-login.png"
        }
    ],
    summary: {
        total: 2,
        passed: 1,
        failed: 1,
        passRate: 50
    }
};

// Convert to pretty JSON for saving to file
const jsonOutput = JSON.stringify(testResults, null, 2);
console.log("Test results as JSON:");
console.log(jsonOutput);

// In Node.js, you would save like this:
// const fs = require('fs').promises;
// await fs.writeFile('test-results.json', jsonOutput);

// And load like this:
// const jsonData = await fs.readFile('test-results.json', 'utf8');
// const results = JSON.parse(jsonData);

// ========================================== 
// KEY TAKEAWAYS
// ========================================== 

/*
JSON:
1. JSON.stringify() - Convert object to JSON string (sending data)
2. JSON.parse() - Convert JSON string to object (receiving data)
3. Always wrap JSON.parse() in try-catch (can throw SyntaxError)
4. Use null, 2 parameters for pretty printing
5. JSON used for: API requests/responses, config files, test data

ERROR HANDLING:
1. Built-in errors: SyntaxError, ReferenceError, TypeError, RangeError
2. Create custom errors by extending Error class
3. Always provide context in error messages
4. Use try-catch for error handling
5. Log errors with full context for debugging

API TESTING:
1. fetch() - Modern way to make HTTP requests
2. Returns Promise, use async/await
3. Check response.ok for success (status 200-299)
4. Use response.json() to parse JSON response
5. Handle network errors and API errors separately
6. Create API testing class for reusable code
7. Verify response status and structure

BEST PRACTICES:
- Always handle JSON parsing errors
- Create custom error types for different scenarios
- Provide detailed error messages with context
- Log errors with test name, step, and stack trace
- Use async/await with fetch for cleaner code
- Extract common API logic into reusable class
- Save test results to JSON files for reports
- Verify API responses match expected structure

TEST AUTOMATION USAGE:
- API testing (GET, POST, PUT, DELETE)
- Reading test data from JSON files
- Saving test results to JSON files
- Handling API errors in tests
- Creating custom errors for test failures
- Logging test execution with context
*/