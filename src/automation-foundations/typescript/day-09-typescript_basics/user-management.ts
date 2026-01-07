// ==========================================
// EXAMPLE 1: user-management.ts
// USER MANAGEMENT SYSTEM FOR TEST AUTOMATION
// ==========================================
// This example demonstrates TypeScript basics: types, interfaces, 
// functions, and working with user data in a test automation context

// TYPE ALIAS: Custom type for user roles
// Union type using | allows only specific string values
// This prevents typos and invalid roles (compile-time safety)
type UserRole = "admin" | "tester" | "viewer";

// TYPE ALIAS: Status type for user account states
// Restricts status to only these four valid values
// Useful for tracking user account lifecycle in tests
type AccountStatus = "active" | "inactive" | "suspended" | "pending";

// TYPE ALIAS: Complete user object structure
// Defines the shape of user data throughout the application
// All properties are required unless marked with ?
type User = {
    // Unique identifier for the user (must be a number)
    id: number;
    
    // User's full name (must be a string)
    name: string;
    
    // User's email address (must be a string)
    email: string;
    
    // User's role - restricted to UserRole type values only
    role: UserRole;
    
    // Account status - restricted to AccountStatus type values only
    status: AccountStatus;
    
    // Optional property: registration date (may or may not exist)
    // The ? makes this property optional - can be undefined
    registeredDate?: Date;
};

// TYPE ALIAS: Login credentials structure
// Separated from User type for security and single responsibility
// Used specifically for authentication operations
type Credentials = {
    // Username or email for login (must be a string)
    username: string;
    
    // Password for authentication (must be a string)
    password: string;
};

// TYPE ALIAS: Result of login operation
// Provides structured response with success status and optional message
type LoginResult = {
    // Boolean indicating if login was successful
    success: boolean;
    
    // Optional message providing details (error or success message)
    message?: string;
    
    // Optional user object returned only on successful login
    user?: User;
};

// ==========================================
// FUNCTION 1: CREATE USER
// ==========================================
// Creates a new user object with provided details
// Parameters: All required user information
// Return type: User object (fully typed)
// This function demonstrates type annotations for parameters and return type
function createUser(
    id: number,              // User ID - must be numeric
    name: string,            // Full name - must be string
    email: string,           // Email address - must be string
    role: UserRole,          // Role - must be one of the UserRole values
    status: AccountStatus    // Status - must be one of the AccountStatus values
): User {
    // Return object matching User type structure
    // TypeScript ensures all required properties are present
    return {
        id: id,                          // Assign provided ID
        name: name,                      // Assign provided name
        email: email,                    // Assign provided email
        role: role,                      // Assign provided role
        status: status,                  // Assign provided status
        registeredDate: new Date()       // Auto-set current date as registration date
    };
}

// ==========================================
// FUNCTION 2: VALIDATE USER EMAIL
// ==========================================
// Validates if email format is correct using regex
// Parameters: email string to validate
// Return type: boolean (true if valid, false if invalid)
// void could be used if we only logged, but we return a value here
function validateEmail(email: string): boolean {
    // Regular expression pattern for basic email validation
    // Checks for: text@text.text format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Test the email against regex pattern
    // .test() returns true if pattern matches, false otherwise
    const isValid = emailRegex.test(email);
    
    // Log validation result to console for debugging
    console.log(`Email validation for "${email}": ${isValid ? "VALID" : "INVALID"}`);
    
    // Return boolean result
    return isValid;
}

// ==========================================
// FUNCTION 3: LOGIN USER
// ==========================================
// Simulates user authentication process
// Parameters: Credentials object containing username and password
// Return type: LoginResult object with success status and details
// Demonstrates working with custom type parameters and return types
function loginUser(credentials: Credentials): LoginResult {
    // Log the login attempt for debugging/audit trail
    console.log(`Login attempt for user: ${credentials.username}`);
    
    // Validate email format before proceeding with authentication
    // Call validateEmail function and store result
    const emailIsValid = validateEmail(credentials.username);
    
    // Check if email format is invalid
    if (!emailIsValid) {
        // Return failure result with error message
        // TypeScript ensures we return object matching LoginResult type
        return {
            success: false,                      // Login failed
            message: "Invalid email format"      // Reason for failure
            // user property omitted (optional when success is false)
        };
    }
    
    // Check if password meets minimum length requirement
    if (credentials.password.length < 6) {
        // Return failure result with password error
        return {
            success: false,                      // Login failed
            message: "Password too short"        // Reason for failure
        };
    }
    
    // SIMULATION: In real scenario, verify against database
    // For this example, we'll create a mock user object
    const mockUser: User = {
        id: 1,                                   // Mock user ID
        name: "Test User",                       // Mock user name
        email: credentials.username,             // Use provided username as email
        role: "tester",                          // Assign tester role
        status: "active",                        // Set status as active
        registeredDate: new Date()               // Set current date
    };
    
    // Return success result with user object
    return {
        success: true,                           // Login succeeded
        message: "Login successful",             // Success message
        user: mockUser                           // Include user object in response
    };
}

// ==========================================
// FUNCTION 4: UPDATE USER STATUS
// ==========================================
// Updates the status of an existing user
// Parameters: User object and new status
// Return type: Updated User object
// Demonstrates immutability - returns new object instead of modifying original
function updateUserStatus(user: User, newStatus: AccountStatus): User {
    // Log the status change for audit trail
    console.log(`Updating user ${user.id} status from ${user.status} to ${newStatus}`);
    
    // Create and return new user object with updated status
    // Spread operator (...user) copies all properties from original user
    // Then we override the status property with new value
    // This maintains immutability - original user object unchanged
    return {
        ...user,                 // Copy all properties from existing user
        status: newStatus        // Override status with new value
    };
}

// ==========================================
// FUNCTION 5: GET USERS BY ROLE
// ==========================================
// Filters array of users by specific role
// Parameters: Array of User objects and role to filter by
// Return type: Array of User objects (filtered subset)
// Demonstrates working with typed arrays and array methods
function getUsersByRole(users: User[], role: UserRole): User[] {
    // Log the filter operation
    console.log(`Filtering users by role: ${role}`);
    
    // Use array filter method to get users matching the role
    // filter() creates new array with elements passing the test
    // Arrow function checks if user's role matches target role
    const filteredUsers = users.filter(user => user.role === role);
    
    // Log how many users were found
    console.log(`Found ${filteredUsers.length} user(s) with role: ${role}`);
    
    // Return filtered array
    return filteredUsers;
}

// ==========================================
// FUNCTION 6: GENERATE USER REPORT
// ==========================================
// Creates a summary report from array of users
// Parameters: Array of User objects
// Return type: void (no return value - only logs output)
// Demonstrates void return type and working with typed arrays
function generateUserReport(users: User[]): void {
    // Print report header
    console.log("\n========== USER REPORT ==========");
    
    // Display total number of users
    console.log(`Total Users: ${users.length}`);
    
    // Count users by role using reduce method
    // reduce() accumulates values - here building an object with counts
    const roleCount = users.reduce((acc, user) => {
        // If this role hasn't been counted yet, initialize to 0
        // Then increment the count for this role
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc; // Return accumulator for next iteration
    }, {} as Record<UserRole, number>); // Initial value: empty object typed as Record
    
    // Display role distribution
    console.log("\nUsers by Role:");
    console.log(`  Admins: ${roleCount.admin || 0}`);
    console.log(`  Testers: ${roleCount.tester || 0}`);
    console.log(`  Viewers: ${roleCount.viewer || 0}`);
    
    // Count users by status using reduce method
    const statusCount = users.reduce((acc, user) => {
        acc[user.status] = (acc[user.status] || 0) + 1;
        return acc;
    }, {} as Record<AccountStatus, number>);
    
    // Display status distribution
    console.log("\nUsers by Status:");
    console.log(`  Active: ${statusCount.active || 0}`);
    console.log(`  Inactive: ${statusCount.inactive || 0}`);
    console.log(`  Suspended: ${statusCount.suspended || 0}`);
    console.log(`  Pending: ${statusCount.pending || 0}`);
    
    // Print report footer
    console.log("=================================\n");
}

// ==========================================
// EXECUTION: DEMONSTRATION
// ==========================================
// This section demonstrates all the functions in action

console.log("========== USER MANAGEMENT SYSTEM DEMO ==========\n");

// STEP 1: Create multiple users using createUser function
// Each call is type-safe - TypeScript ensures correct types for all arguments
console.log("--- Creating Users ---");
const user1: User = createUser(1, "Alice Johnson", "alice@test.com", "admin", "active");
const user2: User = createUser(2, "Bob Smith", "bob@test.com", "tester", "active");
const user3: User = createUser(3, "Charlie Brown", "charlie@test.com", "viewer", "inactive");
const user4: User = createUser(4, "Diana Prince", "diana@test.com", "tester", "pending");

// STEP 2: Store all users in typed array
// TypeScript knows this is User[] and will enforce type safety
const allUsers: User[] = [user1, user2, user3, user4];

// STEP 3: Test login functionality
console.log("\n--- Testing Login ---");

// Valid login attempt
const validLogin: Credentials = {
    username: "alice@test.com",
    password: "ValidPass123"
};
const loginResult1: LoginResult = loginUser(validLogin);
console.log(`Login Result: ${loginResult1.success ? "SUCCESS" : "FAILED"}`);
if (loginResult1.message) {
    console.log(`Message: ${loginResult1.message}`);
}

// Invalid login attempt (bad email format)
const invalidLogin: Credentials = {
    username: "notanemail",        // Invalid email format
    password: "password123"
};
const loginResult2: LoginResult = loginUser(invalidLogin);
console.log(`Login Result: ${loginResult2.success ? "SUCCESS" : "FAILED"}`);
if (loginResult2.message) {
    console.log(`Message: ${loginResult2.message}`);
}

// STEP 4: Update user status
console.log("\n--- Updating User Status ---");
const updatedUser = updateUserStatus(user3, "active");
console.log(`User ${updatedUser.name} status is now: ${updatedUser.status}`);

// STEP 5: Filter users by role
console.log("\n--- Filtering Users by Role ---");
const testers: User[] = getUsersByRole(allUsers, "tester");
console.log("Tester accounts:");
// Loop through filtered testers and display their names
testers.forEach(tester => {
    console.log(`  - ${tester.name} (${tester.email})`);
});

// STEP 6: Generate comprehensive report
generateUserReport(allUsers);

console.log("========== DEMO COMPLETE ==========");