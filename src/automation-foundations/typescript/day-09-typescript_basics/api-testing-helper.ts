// ==========================================
// EXAMPLE 3: api-testing-helper.ts
// API TESTING UTILITY LIBRARY
// ==========================================
// This example demonstrates TypeScript for API test automation:
// HTTP methods, request/response handling, validation, and reporting

// TYPE ALIAS: HTTP methods supported by the API
// Union type restricts to standard HTTP verbs only
// Ensures only valid HTTP methods can be used
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// TYPE ALIAS: HTTP status code categories
// Groups status codes by their meaning for easier validation
// 2xx = success, 4xx = client error, 5xx = server error
type StatusCodeCategory = "success" | "client-error" | "server-error" | "redirect" | "unknown";

// TYPE ALIAS: Content types for request/response bodies
// Common MIME types used in API testing
type ContentType = "application/json" | "application/xml" | "text/plain" | "multipart/form-data";

// TYPE ALIAS: API endpoint configuration
// Defines structure for API endpoint details
// Used to configure and document API endpoints
type ApiEndpoint = {
    // Endpoint name for identification
    name: string;
    
    // HTTP method to use (GET, POST, etc.)
    method: HttpMethod;
    
    // URL path (e.g., "/users", "/products/123")
    path: string;
    
    // Optional: Query parameters as key-value pairs
    // Example: { page: "1", limit: "10" }
    queryParams?: Record<string, string>;
    
    // Optional: Request headers
    // Example: { "Authorization": "Bearer token" }
    headers?: Record<string, string>;
    
    // Optional: Request body (any type - JSON, XML, etc.)
    body?: any;
};

// TYPE ALIAS: API response structure
// Standardized format for all API responses
// Makes response handling consistent across tests
type ApiResponse = {
    // HTTP status code (200, 404, 500, etc.)
    statusCode: number;
    
    // Category of status code for easier validation
    statusCategory: StatusCodeCategory;
    
    // Response body (parsed from JSON usually)
    body: any;
    
    // Response headers received from server
    headers: Record<string, string>;
    
    // Time taken for request to complete (in milliseconds)
    responseTime: number;
    
    // Optional: Error message if request failed
    errorMessage?: string;
};

// TYPE ALIAS: Validation rule for response checking
// Defines a single validation check to perform on response
// Used to build comprehensive test assertions
type ValidationRule = {
    // Descriptive name for this validation
    name: string;
    
    // The actual validation function
    // Takes response and returns true (pass) or false (fail)
    validator: (response: ApiResponse) => boolean;
    
    // Error message to show if validation fails
    errorMessage: string;
};

// TYPE ALIAS: Result of API test execution
// Captures complete test outcome with all details
type ApiTestResult = {
    // Name of the endpoint tested
    endpointName: string;
    
    // HTTP method used
    method: HttpMethod;
    
    // Full URL that was called
    url: string;
    
    // Whether all validations passed
    success: boolean;
    
    // Actual API response received
    response: ApiResponse;
    
    // Results of all validation rules
    validations: {
        // Name of validation rule
        name: string;
        // Whether validation passed
        passed: boolean;
        // Error message if failed
        error?: string;
    }[];
    
    // Total time for test including validations (milliseconds)
    totalExecutionTime: number;
};

// ==========================================
// FUNCTION 1: BUILD URL
// ==========================================
// Constructs complete URL from base URL, path, and query parameters
// Parameters: Base URL, path, and optional query parameters
// Return type: Complete URL string
// Handles query string construction with proper encoding
function buildUrl(
    baseUrl: string,                           // API base URL (e.g., "https://api.example.com")
    path: string,                              // Endpoint path (e.g., "/users")
    queryParams?: Record<string, string>       // Optional query parameters
): string {
    // Start with base URL and path
    // Ensure no double slashes by removing trailing slash from baseUrl
    let url = baseUrl.replace(/\/$/, "") + path;
    
    // Add query parameters if provided
    if (queryParams && Object.keys(queryParams).length > 0) {
        // Convert query params object to URL query string
        // Example: { page: "1", limit: "10" } → "?page=1&limit=10"
        
        // Get array of parameter entries
        const params = Object.entries(queryParams)
            // Map each entry to "key=value" format
            .map(([key, value]) => {
                // URL encode both key and value to handle special characters
                return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
            })
            // Join all parameters with & separator
            .join("&");
        
        // Append query string to URL with ? prefix
        url = `${url}?${params}`;
    }
    
    // Log the constructed URL for debugging
    console.log(`Constructed URL: ${url}`);
    
    // Return complete URL
    return url;
}

// ==========================================
// FUNCTION 2: CATEGORIZE STATUS CODE
// ==========================================
// Determines category of HTTP status code
// Parameters: HTTP status code number
// Return type: StatusCodeCategory
// Helps with grouped validation (e.g., "any 2xx is success")
function categorizeStatusCode(statusCode: number): StatusCodeCategory {
    // Check status code range and return appropriate category
    
    // 2xx codes indicate success
    if (statusCode >= 200 && statusCode < 300) {
        return "success";
    }
    // 3xx codes indicate redirect
    else if (statusCode >= 300 && statusCode < 400) {
        return "redirect";
    }
    // 4xx codes indicate client error (bad request, unauthorized, etc.)
    else if (statusCode >= 400 && statusCode < 500) {
        return "client-error";
    }
    // 5xx codes indicate server error
    else if (statusCode >= 500 && statusCode < 600) {
        return "server-error";
    }
    // Anything else is unknown/invalid
    else {
        return "unknown";
    }
}

// ==========================================
// FUNCTION 3: SIMULATE API CALL
// ==========================================
// Simulates making an HTTP request to an API endpoint
// Parameters: API endpoint configuration and base URL
// Return type: ApiResponse with simulated response data
// In real scenario, this would use fetch() or axios to make actual HTTP call
function simulateApiCall(endpoint: ApiEndpoint, baseUrl: string): ApiResponse {
    // Log request details
    console.log(`\n🌐 Making ${endpoint.method} request to ${endpoint.name}`);
    
    // Record start time for response time calculation
    const startTime = Date.now();
    
    // Build complete URL with query parameters
    const fullUrl = buildUrl(baseUrl, endpoint.path, endpoint.queryParams);
    
    // Log request headers if present
    if (endpoint.headers) {
        console.log(`Headers:`, endpoint.headers);
    }
    
    // Log request body if present
    if (endpoint.body) {
        console.log(`Body:`, JSON.stringify(endpoint.body, null, 2));
    }
    
    // SIMULATION: Generate mock response based on endpoint
    // In real scenario: const response = await fetch(fullUrl, options)
    
    // Simulate random response time between 100-500ms
    const simulatedDelay = Math.random() * 400 + 100;
    
    // Simulate different status codes based on method and randomness
    let statusCode: number;
    let responseBody: any;
    
    // GET requests simulation
    if (endpoint.method === "GET") {
        // 90% success rate for GET requests
        if (Math.random() > 0.1) {
            statusCode = 200;  // OK
            responseBody = {
                success: true,
                data: {
                    id: 123,
                    name: "Test User",
                    email: "test@example.com"
                },
                timestamp: new Date().toISOString()
            };
        } else {
            statusCode = 404;  // Not Found
            responseBody = {
                success: false,
                error: "Resource not found"
            };
        }
    }
    // POST requests simulation
    else if (endpoint.method === "POST") {
        // 85% success rate for POST requests
        if (Math.random() > 0.15) {
            statusCode = 201;  // Created
            responseBody = {
                success: true,
                data: {
                    id: Math.floor(Math.random() * 1000),
                    ...endpoint.body,  // Echo back the posted data
                    createdAt: new Date().toISOString()
                },
                message: "Resource created successfully"
            };
        } else {
            statusCode = 400;  // Bad Request
            responseBody = {
                success: false,
                error: "Invalid request data",
                details: ["Field 'name' is required"]
            };
        }
    }
    // PUT/PATCH requests simulation
    else if (endpoint.method === "PUT" || endpoint.method === "PATCH") {
        // 88% success rate for update requests
        if (Math.random() > 0.12) {
            statusCode = 200;  // OK
            responseBody = {
                success: true,
                data: {
                    ...endpoint.body,  // Echo back updated data
                    updatedAt: new Date().toISOString()
                },
                message: "Resource updated successfully"
            };
        } else {
            statusCode = 404;  // Not Found
            responseBody = {
                success: false,
                error: "Resource not found for update"
            };
        }
    }
    // DELETE requests simulation
    else {
        // 92% success rate for DELETE requests
        if (Math.random() > 0.08) {
            statusCode = 204;  // No Content (successful deletion)
            responseBody = null;  // DELETE typically returns no body
        } else {
            statusCode = 404;  // Not Found
            responseBody = {
                success: false,
                error: "Resource not found for deletion"
            };
        }
    }
    
    // Calculate response time
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    // Categorize the status code
    const category = categorizeStatusCode(statusCode);
    
    // Create mock response headers
    const responseHeaders: Record<string, string> = {
        "content-type": "application/json",
        "x-request-id": `req_${Date.now()}`,
        "x-response-time": `${responseTime}ms`
    };
    
    // Construct API response object
    const response: ApiResponse = {
        statusCode: statusCode,                    // HTTP status code
        statusCategory: category,                  // Status category
        body: responseBody,                        // Response body
        headers: responseHeaders,                  // Response headers
        responseTime: responseTime,                // Time taken
        // Add error message if not successful
        errorMessage: category !== "success" 
            ? `Request failed with status ${statusCode}` 
            : undefined
    };
    
    // Log response details
    console.log(`Response: ${statusCode} (${category}) - ${responseTime}ms`);
    if (responseBody) {
        console.log(`Body:`, JSON.stringify(responseBody, null, 2));
    }
    
    // Return simulated response
    return response;
}

// ==========================================
// FUNCTION 4: CREATE VALIDATION RULE
// ==========================================
// Factory function to create validation rules
// Parameters: Rule name, validator function, error message
// Return type: ValidationRule object
// Makes creating validation rules consistent and easy
function createValidationRule(
    name: string,                                  // Descriptive name
    validator: (response: ApiResponse) => boolean, // Validation function
    errorMessage: string                           // Error message if fails
): ValidationRule {
    // Return validation rule object
    return {
        name: name,                    // Assign rule name
        validator: validator,          // Assign validation function
        errorMessage: errorMessage     // Assign error message
    };
}

// ==========================================
// FUNCTION 5: VALIDATE RESPONSE
// ==========================================
// Runs all validation rules against API response
// Parameters: API response and array of validation rules
// Return type: Array of validation results
// Executes all validations and collects results
function validateResponse(
    response: ApiResponse,           // The response to validate
    rules: ValidationRule[]          // Array of validation rules to apply
): { name: string; passed: boolean; error?: string }[] {
    // Log validation start
    console.log(`\n🔍 Running ${rules.length} validation(s)...`);
    
    // Map each rule to a result object
    // This runs all validations and captures outcomes
    const results = rules.map(rule => {
        // Execute the validator function
        // Pass response to validator, get boolean result
        const passed = rule.validator(response);
        
        // Log individual validation result
        if (passed) {
            console.log(`   ✅ ${rule.name}: PASSED`);
        } else {
            console.log(`   ❌ ${rule.name}: FAILED`);
            console.log(`      Error: ${rule.errorMessage}`);
        }
        
        // Return result object
        return {
            name: rule.name,                    // Validation name
            passed: passed,                     // Whether it passed
            // Include error message only if validation failed
            error: passed ? undefined : rule.errorMessage
        };
    });
    
    // Return array of all validation results
    return results;
}

// ==========================================
// FUNCTION 6: RUN API TEST
// ==========================================
// Executes complete API test with validations
// Parameters: Endpoint configuration, base URL, validation rules
// Return type: ApiTestResult with complete test outcome
// Main function that orchestrates the entire API test flow
function runApiTest(
    endpoint: ApiEndpoint,           // Endpoint to test
    baseUrl: string,                 // API base URL
    validationRules: ValidationRule[] // Validations to perform
): ApiTestResult {
    // Log test start with separator
    console.log("\n" + "=".repeat(70));
    console.log(`🧪 API TEST: ${endpoint.name}`);
    console.log("=".repeat(70));
    
    // Record test start time for total execution time
    const testStartTime = Date.now();
    
    // Step 1: Make API call (simulated in this example)
    const response: ApiResponse = simulateApiCall(endpoint, baseUrl);
    
    // Step 2: Run all validations on the response
    const validationResults = validateResponse(response, validationRules);
    
    // Step 3: Determine overall test success
    // Test passes only if ALL validations pass
    const allValidationsPassed = validationResults.every(result => result.passed);
    
    // Calculate total test execution time
    const testEndTime = Date.now();
    const totalTime = testEndTime - testStartTime;
    
    // Construct complete URL for reporting
    const fullUrl = buildUrl(baseUrl, endpoint.path, endpoint.queryParams);
    
    // Create test result object
    const testResult: ApiTestResult = {
        endpointName: endpoint.name,              // Endpoint name
        method: endpoint.method,                  // HTTP method
        url: fullUrl,                             // Complete URL
        success: allValidationsPassed,            // Overall success
        response: response,                       // API response
        validations: validationResults,           // Validation results
        totalExecutionTime: totalTime             // Total time
    };
    
    // Log test completion
    console.log("\n" + "-".repeat(70));
    if (allValidationsPassed) {
        console.log("✅ TEST PASSED: All validations successful");
    } else {
        console.log("❌ TEST FAILED: One or more validations failed");
    }
    console.log(`Total execution time: ${totalTime}ms`);
    console.log("=".repeat(70));
    
    // Return complete test result
    return testResult;
}

// ==========================================
// FUNCTION 7: GENERATE TEST REPORT
// ==========================================
// Creates formatted report from multiple test results
// Parameters: Array of API test results
// Return type: void (prints report to console)
// Aggregates and displays results from multiple API tests
function generateTestReport(testResults: ApiTestResult[]): void {
    // Print report header
    console.log("\n" + "★".repeat(70));
    console.log("📊 API TEST EXECUTION REPORT");
    console.log("★".repeat(70));
    
    // Calculate overall statistics
    const totalTests = testResults.length;
    const passedTests = testResults.filter(result => result.success).length;
    const failedTests = totalTests - passedTests;
    const passRate = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
    
    // Calculate total response time across all tests
    const totalResponseTime = testResults.reduce(
        (sum, result) => sum + result.response.responseTime,
        0
    );
    const avgResponseTime = totalTests > 0 ? totalResponseTime / totalTests : 0;
    
    // Print summary statistics
    console.log(`\nTOTAL TESTS:        ${totalTests}`);
    console.log(`PASSED:             ${passedTests} ✅`);
    console.log(`FAILED:             ${failedTests} ❌`);
    console.log(`PASS RATE:          ${passRate.toFixed(2)}%`);
    console.log(`AVG RESPONSE TIME:  ${avgResponseTime.toFixed(2)}ms`);
    
    // Print detailed results for each test
    console.log("\n" + "-".repeat(70));
    console.log("DETAILED RESULTS:");
    console.log("-".repeat(70));
    
    // Iterate through each test result
    testResults.forEach((result, index) => {
        // Print test header
        console.log(`\n${index + 1}. ${result.endpointName}`);
        console.log(`   Method: ${result.method} | URL: ${result.url}`);
        console.log(`   Status: ${result.response.statusCode} (${result.response.statusCategory})`);
        console.log(`   Response Time: ${result.response.responseTime}ms`);
        console.log(`   Test Result: ${result.success ? "✅ PASSED" : "❌ FAILED"}`);
        
        // Print validation details
        console.log(`   Validations:`);
        result.validations.forEach(validation => {
            if (validation.passed) {
                console.log(`      ✅ ${validation.name}`);
            } else {
                console.log(`      ❌ ${validation.name}`);
                if (validation.error) {
                    console.log(`         → ${validation.error}`);
                }
            }
        });
    });
    
    // Print report footer
    console.log("\n" + "★".repeat(70));
    console.log("REPORT COMPLETE");
    console.log("★".repeat(70) + "\n");
}

// ==========================================
// EXECUTION: DEMONSTRATION
// ==========================================
// This section demonstrates complete API testing workflow

console.log("========== API TESTING FRAMEWORK DEMO ==========\n");

// Define API base URL
const API_BASE_URL = "https://api.example.com";

// ========================================
// TEST 1: GET User by ID
// ========================================
console.log("--- Setting up Test 1: GET User ---");

// Define endpoint configuration
const getUserEndpoint: ApiEndpoint = {
    name: "Get User by ID",
    method: "GET",
    path: "/users/123",
    queryParams: {
        include: "profile,settings"
    },
    headers: {
        "Authorization": "Bearer test_token_123",
        "Accept": "application/json"
    }
};

// Define validation rules for this test
const getUserValidations: ValidationRule[] = [
    // Rule 1: Check status code is 200
    createValidationRule(
        "Status code should be 200",
        (response) => response.statusCode === 200,
        "Expected status code 200 but received " + getUserEndpoint.method
    ),
    // Rule 2: Check response category is success
    createValidationRule(
        "Response should be successful",
        (response) => response.statusCategory === "success",
        "Response status category should be 'success'"
    ),
    // Rule 3: Check response time is acceptable
    createValidationRule(
        "Response time should be under 1000ms",
        (response) => response.responseTime < 1000,
        "Response time exceeded acceptable limit"
    ),
    // Rule 4: Check response has data
    createValidationRule(
        "Response body should contain data",
        (response) => response.body && response.body.data,
        "Response body missing 'data' property"
    )
];

// Run the test
const test1Result = runApiTest(getUserEndpoint, API_BASE_URL, getUserValidations);

// ========================================
// TEST 2: POST Create New User
// ========================================
console.log("\n--- Setting up Test 2: POST Create User ---");

// Define endpoint configuration
const createUserEndpoint: ApiEndpoint = {
    name: "Create New User",
    method: "POST",
    path: "/users",
    headers: {
        "Authorization": "Bearer test_token_123",
        "Content-Type": "application/json"
    },
    body: {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "tester"
    }
};

// Define validation rules
const createUserValidations: ValidationRule[] = [
    // Rule 1: Check status code is 201 (Created)
    createValidationRule(
        "Status code should be 201",
        (response) => response.statusCode === 201,
        "Expected status code 201 for resource creation"
    ),
    // Rule 2: Check response contains success flag
    createValidationRule(
        "Response should indicate success",
        (response) => response.body && response.body.success === true,
        "Response should have success: true"
    ),
    // Rule 3: Check response contains created data with ID
    createValidationRule(
        "Response should contain created resource ID",
        (response) => response.body && response.body.data && response.body.data.id,
        "Created resource should have an ID"
    )
];

// Run the test
const test2Result = runApiTest(createUserEndpoint, API_BASE_URL, createUserValidations);

// ========================================
// TEST 3: DELETE User
// ========================================
console.log("\n--- Setting up Test 3: DELETE User ---");

// Define endpoint configuration
const deleteUserEndpoint: ApiEndpoint = {
    name: "Delete User",
    method: "DELETE",
    path: "/users/123",
    headers: {
        "Authorization": "Bearer test_token_123"
    }
};

// Define validation rules
const deleteUserValidations: ValidationRule[] = [
    // Rule 1: Check status code is 204 (No Content)
    createValidationRule(
        "Status code should be 204",
        (response) => response.statusCode === 204,
        "Expected status code 204 for successful deletion"
    ),
    // Rule 2: Check response time
    createValidationRule(
        "Response time should be under 500ms",
        (response) => response.responseTime < 500,
        "Delete operation took too long"
    )
];

// Run the test
const test3Result = runApiTest(deleteUserEndpoint, API_BASE_URL, deleteUserValidations);

// ========================================
// GENERATE FINAL REPORT
// ========================================
console.log("\n--- Generating Final Report ---");

// Collect all test results
const allResults: ApiTestResult[] = [test1Result, test2Result, test3Result];

// Generate comprehensive report
generateTestReport(allResults);

console.log("========== DEMO COMPLETE ==========");