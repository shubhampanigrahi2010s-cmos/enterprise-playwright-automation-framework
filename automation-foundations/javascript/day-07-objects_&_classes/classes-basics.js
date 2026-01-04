// ========================================== 
// 1. BASIC CLASS SYNTAX 
// ========================================== 

// Print section header to console
console.log("=== BASIC CLASSES ===\n"); 

// Define a class named TestCase (like a blueprint for creating objects)
class TestCase { 
    // Constructor - special method that runs automatically when creating new instance
    // It initializes the object's properties
    constructor(name, description) { 
        this.name = name;                // Assign name parameter to instance property
        this.description = description;  // Assign description parameter to instance property
        this.status = 'pending';         // Set default status to 'pending'
        this.duration = 0;               // Initialize duration to 0
    } 
    
    // Method - function that belongs to the class
    // Can be called on any instance of TestCase
    run() { 
        console.log(`Running test: ${this.name}`);  // Log which test is running
        this.status = 'running';                     // Update status to 'running'
        
        // Simulate test execution timing
        const startTime = Date.now();  // Capture current timestamp in milliseconds
        
        // Test logic would go here (actual test code)
        
        // Calculate how long test took by subtracting start from current time
        this.duration = Date.now() - startTime; 
        this.status = 'passed';  // Mark test as passed
        
        // Log test completion with duration
        console.log(`Test ${this.name}: ${this.status} (${this.duration}ms)`); 
    } 
    
    // Method to skip a test instead of running it
    skip() { 
        this.status = 'skipped';  // Change status to 'skipped'
        console.log(`Test ${this.name}: skipped`);  // Log that test was skipped
    } 
    
    // Method that returns formatted information about the test
    getInfo() { 
        return `${this.name} - ${this.status}`;  // Return string with name and status
    } 
} 

// Creating instances (actual objects) from the TestCase class
// 'new' keyword creates new object and calls constructor
const loginTest = new TestCase('Login Test', 'Verify user can login'); 
const searchTest = new TestCase('Search Test', 'Verify search functionality'); 

// Call methods on the instances
loginTest.run();    // Execute run method on loginTest instance
searchTest.skip();  // Execute skip method on searchTest instance

// Display information about both test instances
console.log("\nTest Info:"); 
console.log("Login:", loginTest.getInfo());   // Get info for loginTest
console.log("Search:", searchTest.getInfo()); // Get info for searchTest

// ========================================== 
// 2. CLASS WITH GETTERS AND SETTERS 
// ========================================== 

// Print section header
console.log("\n=== GETTERS & SETTERS ===\n"); 

// Class demonstrating getters and setters for controlled property access
class TestConfig { 
    constructor() { 
        // Underscore prefix indicates "private" property by convention
        // Not truly private, just a signal to developers
        this._timeout = 30000;  // Default timeout: 30 seconds (30000ms)
        this._retries = 3;      // Default retries: 3 attempts
    } 
    
    // Getter - allows you to access _timeout like a property (config.timeout)
    // Gets called when you read the property
    get timeout() { 
        return this._timeout;  // Return the private _timeout value
    } 
    
    // Setter - allows you to set timeout with validation
    // Gets called when you assign to the property (config.timeout = value)
    set timeout(value) { 
        // Validation: check if value is negative
        if (value < 0) { 
            throw new Error('Timeout cannot be negative');  // Throw error to stop execution
        } 
        // Validation: check if value is too high
        if (value > 300000) { 
            // Warn user but still set to maximum allowed value
            console.warn('Timeout very high, setting to max 300000ms'); 
            this._timeout = 300000;  // Set to maximum (300 seconds)
        } else { 
            this._timeout = value;  // Value is valid, set it
        } 
    } 
    
    // Getter for retries property
    get retries() { 
        return this._retries;  // Return private _retries value
    } 
    
    // Setter for retries with validation
    set retries(value) { 
        // Check if value is outside allowed range (0-10)
        if (value < 0 || value > 10) { 
            throw new Error('Retries must be between 0 and 10');  // Reject invalid values
        } 
        this._retries = value;  // Value is valid, set it
    } 
} 

// Create instance of TestConfig
const config = new TestConfig(); 
// Access getter (looks like property access but calls get timeout() method)
console.log("Default timeout:", config.timeout); 

// Use setter to change timeout (looks like assignment but calls set timeout() method)
config.timeout = 60000;  // Set to 60 seconds
console.log("Updated timeout:", config.timeout);  // Read new value via getter

// Try-catch block to handle errors gracefully
try { 
    config.timeout = -100;  // This will trigger error in setter
} catch (error) { 
    console.log("Error:", error.message);  // Log error message
} 

// ========================================== 
// 3. CLASS INHERITANCE 
// ========================================== 

// Print section header
console.log("\n=== CLASS INHERITANCE ===\n"); 

// Base class (parent class) - contains common functionality
class BasePage { 
    constructor(pageName) { 
        this.pageName = pageName;  // Store page name
        this.selectors = {};       // Initialize empty object for CSS selectors
    } 
    
    // Method to navigate to a URL
    navigate(url) { 
        console.log(`Navigating to: ${url}`);  // Log navigation action
    } 
    
    // Method to click an element
    click(selector) { 
        console.log(`Clicking: ${selector}`);  // Log click action
    } 
    
    // Method to fill input field
    fill(selector, value) { 
        console.log(`Filling ${selector} with: ${value}`);  // Log fill action
    } 
    
    // Method to get text from element
    getText(selector) { 
        console.log(`Getting text from: ${selector}`);  // Log getText action
        return `Text from ${selector}`;  // Return simulated text
    } 
} 

// Child class (derived class) - inherits from BasePage
// 'extends' keyword creates inheritance relationship
class LoginPage extends BasePage { 
    constructor() { 
        // super() calls parent class constructor
        // MUST be called before using 'this' in child constructor
        super('Login Page');  // Pass 'Login Page' to BasePage constructor
        
        // Define page-specific selectors for this page
        this.selectors = { 
            username: '#username',      // CSS selector for username field
            password: '#password',      // CSS selector for password field
            loginButton: '#login-btn'   // CSS selector for login button
        }; 
    } 
    
    // Child-specific method (not in parent class)
    login(username, password) { 
        console.log(`\nLogging in as: ${username}`);  // Log login attempt
        // Call inherited fill method with this page's selectors
        this.fill(this.selectors.username, username); 
        this.fill(this.selectors.password, password); 
        // Call inherited click method
        this.click(this.selectors.loginButton); 
    } 
    
    // Override parent method (replace parent's implementation)
    navigate() { 
        // super.navigate() calls the parent's version of navigate
        super.navigate('/login');  // Call parent with specific URL
        console.log(`${this.pageName} loaded`);  // Add additional behavior
    } 
} 

// Another child class inheriting from BasePage
class DashboardPage extends BasePage { 
    constructor() { 
        super('Dashboard Page');  // Call parent constructor with page name
        
        // Define dashboard-specific selectors
        this.selectors = { 
            welcomeMessage: '.welcome',  // CSS selector for welcome message
            logoutButton: '#logout'      // CSS selector for logout button
        }; 
    } 
    
    // Dashboard-specific method
    getWelcomeMessage() { 
        // Call inherited getText method
        return this.getText(this.selectors.welcomeMessage); 
    } 
    
    // Dashboard-specific method
    logout() { 
        this.click(this.selectors.logoutButton);  // Click logout button
        console.log('Logged out successfully');    // Log success message
    } 
} 

// Using inherited classes - demonstrating polymorphism
const loginPage = new LoginPage();  // Create LoginPage instance
loginPage.navigate();  // Calls overridden navigate method
loginPage.login('testuser@example.com', 'password123');  // Calls login method

const dashboardPage = new DashboardPage();  // Create DashboardPage instance
const welcomeMsg = dashboardPage.getWelcomeMessage();  // Get welcome message
console.log(`Welcome message: ${welcomeMsg}`); 
dashboardPage.logout();  // Call logout method

// ========================================== 
// 4. STATIC METHODS AND PROPERTIES 
// ========================================== 

// Print section header
console.log("\n=== STATIC METHODS ===\n"); 

// Class with static methods (utility class pattern)
class TestUtils { 
    // Static property - belongs to class itself, not instances
    static readonly = true; 
    
    // Static method - called on class, NOT on instances
    // Use 'static' keyword before method name
    static generateTestId() { 
        // Generate unique test ID using timestamp and random number
        return `TEST_${Date.now()}_${Math.floor(Math.random() * 1000)}`; 
    } 
    
    // Static method to validate email format
    static validateEmail(email) { 
        // Regular expression to check email format
        // Returns true if email matches pattern, false otherwise
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); 
    } 
    
    // Static method that returns a Promise (for async operations)
    static delay(ms) { 
        // Create Promise that resolves after specified milliseconds
        return new Promise(resolve => setTimeout(resolve, ms)); 
    } 
    
    // Static method to format duration in readable way
    static formatDuration(ms) { 
        if (ms < 1000) return `${ms}ms`;  // If less than 1 second, show milliseconds
        const seconds = (ms / 1000).toFixed(2);  // Convert to seconds with 2 decimals
        return `${seconds}s`;  // Return formatted string
    } 
} 

// Call static methods directly on the class (not on instances)
console.log("Generated ID:", TestUtils.generateTestId()); 
console.log("Email valid:", TestUtils.validateEmail('test@example.com')); 
console.log("Email invalid:", TestUtils.validateEmail('not-an-email')); 
console.log("Formatted duration:", TestUtils.formatDuration(2500)); 

// CANNOT call static methods on instances:
// const utils = new TestUtils();  // Create instance
// utils.generateTestId();  // ERROR! Static methods not available on instances

// ========================================== 
// 5. PRIVATE FIELDS (Modern JavaScript) 
// ========================================== 

// Print section header
console.log("\n=== PRIVATE FIELDS ===\n"); 

// Class demonstrating truly private fields (ES2022 feature)
class TestRunner { 
    // Private fields - start with # symbol
    // Cannot be accessed from outside the class
    #results = [];        // Private array to store test results
    #isRunning = false;   // Private flag to track if tests are running
    
    // Public field - can be accessed from outside
    name = 'Test Runner'; 
    
    // Public method to add result to private array
    addResult(result) { 
        this.#results.push(result);  // Access private field using # prefix
        console.log(`Added result: ${result.name}`); 
    } 
    
    // Public method to get results (returns copy to prevent external modification)
    getResults() { 
        // Spread operator creates new array (copy) to protect internal data
        return [...this.#results]; 
    } 
    
    // Public method to calculate statistics from private results
    getStats() { 
        const total = this.#results.length;  // Total number of results
        // Filter to count passed tests
        const passed = this.#results.filter(r => r.status === 'passed').length; 
        // Return object with statistics
        return { total, passed, failed: total - passed }; 
    } 
    
    // Private method - can only be called from inside the class
    #validate() { 
        // Check if tests are already running
        if (this.#isRunning) { 
            throw new Error('Already running');  // Prevent concurrent runs
        } 
    } 
    
    // Public method that uses private method and fields
    run() { 
        this.#validate();           // Call private validation method
        this.#isRunning = true;     // Set private flag to true
        console.log('Running tests...'); 
        // Test execution logic would go here
        this.#isRunning = false;    // Reset private flag
    } 
} 

// Create instance and use public methods
const runner = new TestRunner(); 
runner.addResult({ name: 'Test 1', status: 'passed' }); 
runner.addResult({ name: 'Test 2', status: 'failed' }); 
runner.addResult({ name: 'Test 3', status: 'passed' }); 

console.log("Stats:", runner.getStats());  // Call public method

// CANNOT access private fields or methods from outside:
// console.log(runner.#results);  // ERROR! Private field not accessible
// runner.#validate();            // ERROR! Private method not accessible

// ========================================== 
// 6. PRACTICAL TEST FRAMEWORK EXAMPLE 
// ========================================== 

// Print section header
console.log("\n=== PRACTICAL FRAMEWORK ===\n"); 

// TestSuite class - represents a collection of tests
class TestSuite { 
    constructor(name) { 
        this.name = name;        // Suite name
        this.tests = [];         // Array to store Test objects
        this.beforeAll = null;   // Function to run before all tests
        this.afterAll = null;    // Function to run after all tests
    } 
    
    // Method to add a test to the suite
    addTest(test) { 
        this.tests.push(test);  // Add test object to tests array
    } 
    
    // Method to set function that runs before all tests
    setBeforeAll(fn) { 
        this.beforeAll = fn;  // Store setup function
    } 
    
    // Method to set function that runs after all tests
    setAfterAll(fn) { 
        this.afterAll = fn;  // Store cleanup function
    } 
    
    // Async method to run entire test suite
    // 'async' keyword allows use of 'await' inside
    async run() { 
        console.log(`\n🧪 Running Suite: ${this.name}`);  // Suite header
        console.log('='.repeat(50));  // Print 50 equal signs as separator
        
        // Run setup function if it exists
        if (this.beforeAll) { 
            console.log('Running beforeAll...'); 
            await this.beforeAll();  // Wait for beforeAll to complete
        } 
        
        // Run all tests in sequence
        for (const test of this.tests) { 
            await test.run();  // Wait for each test to complete before next
        } 
        
        // Run cleanup function if it exists
        if (this.afterAll) { 
            console.log('Running afterAll...'); 
            await this.afterAll();  // Wait for afterAll to complete
        } 
        
        // Calculate and display summary statistics
        const passed = this.tests.filter(t => t.status === 'passed').length; 
        const total = this.tests.length; 
        console.log(`\n📊 Suite Summary: ${passed}/${total} passed`); 
    } 
} 

// Test class - represents individual test
class Test { 
    constructor(name, testFn) { 
        this.name = name;           // Test name
        this.testFn = testFn;       // Function containing test logic
        this.status = 'pending';    // Initial status
        this.duration = 0;          // Duration in milliseconds
    } 
    
    // Async method to run the test
    async run() { 
        console.log(`\n  ▶ ${this.name}`);  // Print test name with arrow
        const startTime = Date.now();  // Capture start time
        
        // Try-catch to handle test failures gracefully
        try { 
            await this.testFn();  // Execute test function, wait for completion
            this.status = 'passed';  // Mark as passed if no error thrown
            this.duration = Date.now() - startTime;  // Calculate duration
            console.log(`    ✅ Passed (${this.duration}ms)`);  // Success message
        } catch (error) { 
            this.status = 'failed';  // Mark as failed if error thrown
            this.duration = Date.now() - startTime;  // Calculate duration
            console.log(`    ❌ Failed: ${error.message}`);  // Error message
        } 
    } 
} 

// Create and configure a test suite
const loginSuite = new TestSuite('Login Tests');  // Create new suite

// Set setup function to run before all tests
loginSuite.setBeforeAll(() => { 
    console.log('  Setting up browser...');  // Simulate browser setup
}); 

// Add first test to suite
loginSuite.addTest(new Test('Valid Login', async () => { 
    console.log('    Entering credentials...');  // Simulate entering credentials
    console.log('    Clicking login...');         // Simulate clicking login
    // Test passes because no error is thrown
})); 

// Add second test that will fail
loginSuite.addTest(new Test('Invalid Login', async () => { 
    console.log('    Entering invalid credentials...'); 
    throw new Error('Login should fail');  // Throwing error makes test fail
})); 

// Add third test
loginSuite.addTest(new Test('Empty Fields', async () => { 
    console.log('    Verifying validation...');  // Simulate validation check
    // Test passes because no error is thrown
})); 

// Set cleanup function to run after all tests
loginSuite.setAfterAll(() => { 
    console.log('  Closing browser...');  // Simulate browser cleanup
}); 

// Run the suite using IIFE (Immediately Invoked Function Expression)
// Needed because top-level await not available in all environments
(async () => { 
    await loginSuite.run();  // Execute entire test suite
})();  // () at end immediately invokes the async function