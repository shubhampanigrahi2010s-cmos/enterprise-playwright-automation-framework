// ========================================== 
// 1. SELECTOR GENERATION 
// ========================================== 

// Display section header for selector generation
console.log("=== SELECTOR GENERATION ===\n"); 

// Object containing methods to build CSS/XPath selectors dynamically
const SelectorBuilder = { 
    // Generate attribute selector for data-test attribute
    // Parameter: value - the data-test value to target
    // Returns: CSS selector string like [data-test="submit-btn"]
    byDataTest: (value) => `[data-test="${value}"]`, 
    
    // Generate attribute selector for data-id attribute
    // Parameter: value - the data-id value
    // Returns: CSS selector string like [data-id="user-123"]
    byDataId: (value) => `[data-id="${value}"]`, 
    
    // Generate selector for ARIA role attribute
    // Parameter: value - role name (button, navigation, etc.)
    // Returns: CSS selector string like [role="button"]
    byRole: (value) => `[role="${value}"]`, 
    
    // Generate selector for ARIA label attribute (for accessibility)
    // Parameter: value - the aria-label text
    // Returns: CSS selector string like [aria-label="Close dialog"]
    byAriaLabel: (value) => `[aria-label="${value}"]`, 
    
    // Generate text-based selector (Playwright/Puppeteer style)
    // Parameter: text - exact text content to match
    // Returns: String like text="Submit" for text-based selection
    byText: (text) => `text="${text}"`, 
    
    // Compound selectors section - combining element type with attributes
    
    // Generate selector specifically for button elements
    // Parameter: identifier - data-test value for the button
    // Combines 'button' tag with data-test attribute selector
    button: (identifier) => `button${SelectorBuilder.byDataTest(identifier)}`, 
    
    // Generate selector for input elements by name attribute
    // Parameter: name - value of the name attribute
    // Returns: CSS selector like input[name="email"]
    input: (name) => `input[name="${name}"]`, 
    
    // Page Object Model pattern - group selectors by page
    // Nested object containing login page specific selectors
    loginPage: { 
        // Return selector for username input field
        // No parameters - uses predefined name 'username'
        username: () => SelectorBuilder.input('username'), 
        
        // Return selector for password input field
        // No parameters - uses predefined name 'password'
        password: () => SelectorBuilder.input('password'), 
        
        // Return selector for login submit button
        // Uses button method with specific data-test identifier
        submit: () => SelectorBuilder.button('login-submit'), 
        
        // Return selector for login error message element
        // Uses data-test attribute for error display
        error: () => SelectorBuilder.byDataTest('login-error') 
    } 
}; 

// Display examples of generated selectors
console.log("Generated Selectors:"); 
// Generate and display button selector with data-test="save-changes"
console.log("  Button:", SelectorBuilder.button('save-changes')); 
// Generate and display input selector for email field
console.log("  Input:", SelectorBuilder.input('email')); 
// Generate and display login page username field selector
console.log("  Login username:", SelectorBuilder.loginPage.username()); 

// Function to construct complete URLs with query parameters
// Parameters: base - base URL, path - endpoint path, params - query params object
const buildUrl = (base, path, params = {}) => { 
    // Create new URL object by combining base URL and path
    // URL constructor handles proper joining of base and path
    const url = new URL(path, base); 
    
    // Object.entries converts params object to array of [key, value] pairs
    // forEach loops through each parameter
    Object.entries(params).forEach(([key, value]) =>  
        // searchParams.append adds each key-value pair as query parameter
        // Automatically handles URL encoding
        url.searchParams.append(key, value) 
    ); 
    
    // Convert URL object back to string representation
    return url.toString(); 
}; 

// Display URL construction section header
console.log("\nURL Construction:"); 
// Build API URL with base, path, and query parameters
// Results in: https://api.example.com/v1/users?page=2&limit=10
const apiUrl = buildUrl('https://api.example.com', '/v1/users', {  
    page: '2',      // Page number for pagination
    limit: '10'     // Number of items per page
}); 
// Display the constructed URL
console.log("  API URL:", apiUrl); 

// ========================================== 
// 2. TEST DATA GENERATION 
// ========================================== 

// Display section header
console.log("\n=== TEST DATA GENERATION ===\n"); 

// Object containing nested methods for generating various test data
const DataGenerator = { 
    // Email generation patterns - nested object
    email: { 
        // Generate unique email using timestamp to ensure uniqueness
        // Parameter: prefix - beginning part of email (default 'test')
        // Date.now() returns current timestamp in milliseconds
        // Result: test.1640000000000@example.com
        unique: (prefix = 'test') => `${prefix}.${Date.now()}@example.com`, 
        
        // Generate sequential email with zero-padded number
        // Parameter: index - number to include in email
        // String(index).padStart(3, '0') creates 001, 002, 003, etc.
        // Result: user001@test.com, user002@test.com
        sequential: (index) => `user${String(index).padStart(3, '0')}@test.com`, 
        
        // Generate role-based email with random component
        // Parameter: role - role name to include (admin, user, etc.)
        // Math.random().toString(36) converts to base36 (0-9, a-z)
        // .substr(2, 5) takes 5 characters starting from index 2
        // Result: admin.k8x2p@example.com
        role: (role) => `${role}.${Math.random().toString(36).substr(2, 5)}@example.com` 
    }, 
    
    // Username generation patterns
    username: { 
        // Generate random username with specified length
        // Parameter: length - number of random characters (default 8)
        // Creates usernames like: user_k8x2p9a1
        random: (length = 8) => `user_${Math.random().toString(36).substr(2, length)}`, 
        
        // Generate sequential username with zero-padded index
        // Parameter: index - sequential number
        // Result: testuser001, testuser002, etc.
        sequential: (index) => `testuser${String(index).padStart(3, '0')}`, 
        
        // Generate realistic username from first and last name
        // Parameters: first - first name, last - last name
        // Takes first letter of first name, combines with last name, adds random number
        // .charAt(0) gets first character
        // Math.floor(Math.random() * 100) generates 0-99
        // .toLowerCase() converts to lowercase
        // Result: jsmith42, adoe87
        realistic: (first, last) =>  
            `${first.charAt(0)}${last}${Math.floor(Math.random() * 100)}`.toLowerCase() 
    }, 
    
    // Password generation methods
    password: { 
        // Generate strong random password
        // Parameter: length - password length (default 12)
        strong: (length = 12) => { 
            // String containing all allowed characters
            // Uppercase, lowercase, numbers, and special characters
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$'; 
            
            // Array.from creates array of specified length
            // For each position, pick random character from chars
            // Math.floor(Math.random() * chars.length) gets random index
            // chars.charAt() gets character at that index
            // .join('') combines all characters into string
            return Array.from({ length }, () =>  
                chars.charAt(Math.floor(Math.random() * chars.length)) 
            ).join(''); 
        } 
    }, 
    
    // Test identifier generation methods
    id: { 
        // Generate formatted test case ID
        // Parameters: prefix - ID prefix (default 'TC'), number - test number
        // String(number).padStart(4, '0') creates 0001, 0002, etc.
        // Result: TC0001, E2E0042
        testCase: (prefix = 'TC', number = 1) => `${prefix}${String(number).padStart(4, '0')}`, 
        
        // Generate test suite ID from suite name
        // Parameter: name - human-readable suite name
        // .toLowerCase() converts to lowercase
        // .replace(/[^a-z0-9]+/g, '-') replaces non-alphanumeric chars with hyphens
        // Result: "Login Tests" becomes "login-tests"
        testSuite: (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), 
        
        // Generate unique run ID using timestamp
        // Date.now() gets current timestamp
        // .toString(36) converts to base36 for shorter string
        // .toUpperCase() converts to uppercase
        // Result: RUN_KXPQ2M4
        runId: () => `RUN_${Date.now().toString(36).toUpperCase()}` 
    } 
}; 

// Display examples of generated test data
console.log("Generated Test Data:"); 
// Generate unique email with 'automation' prefix
console.log("  Email:", DataGenerator.email.unique('automation')); 
// Generate random username
console.log("  Username:", DataGenerator.username.random()); 
// Generate strong password with length 10
console.log("  Password:", DataGenerator.password.strong(10)); 
// Generate test case ID with E2E prefix and number 42
console.log("  Test ID:", DataGenerator.id.testCase('E2E', 42)); 
// Generate unique run ID
console.log("  Run ID:", DataGenerator.id.runId()); 

// ========================================== 
// 3. VALIDATION & SANITIZATION 
// ========================================== 

// Display section header
console.log("\n=== VALIDATION ===\n"); 

// Object containing validation methods using regular expressions
const Validator = { 
    // Validate email format using regex pattern
    // Parameter: email - email string to validate
    // /^[^\s@]+@[^\s@]+\.[^\s@]+$/ - regex pattern for basic email
    // ^[^\s@]+ - one or more chars that aren't space or @
    // @ - literal @ symbol
    // [^\s@]+ - one or more chars that aren't space or @
    // \. - literal dot (escaped)
    // [^\s@]+$ - one or more chars that aren't space or @, end of string
    // ?. is optional chaining - safely call trim() even if email is null/undefined
    // .test() returns true/false if pattern matches
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim()), 
    
    // Comprehensive password validation with multiple checks
    // Parameters: password - password to validate, minLength - minimum length (default 8)
    password: (password, minLength = 8) => { 
        // First check: password exists and meets minimum length
        if (!password || password.length < minLength) return false; 
        
        // Return object with detailed validation results
        return { 
            // Check if password has at least one uppercase letter
            // /[A-Z]/ matches any uppercase letter A-Z
            hasUpper: /[A-Z]/.test(password), 
            
            // Check if password has at least one lowercase letter
            // /[a-z]/ matches any lowercase letter a-z
            hasLower: /[a-z]/.test(password), 
            
            // Check if password has at least one digit
            // /\d/ matches any digit 0-9
            hasNumber: /\d/.test(password), 
            
            // Check if password has at least one special character
            // /[!@#$%^&*]/ matches any of these special chars
            hasSpecial: /[!@#$%^&*]/.test(password), 
            
            // Overall validation: must have lowercase, uppercase, and digit
            // (?=.*[a-z]) - positive lookahead for lowercase
            // (?=.*[A-Z]) - positive lookahead for uppercase
            // (?=.*\d) - positive lookahead for digit
            isValid: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password) 
        }; 
    }, 
    
    // Validate username format
    // Parameter: username - username string to validate
    username: (username) => { 
        // Check if username exists and has at least 3 characters
        if (!username || username.length < 3) return false; 
        
        // Check if username contains only allowed characters
        // ^[a-zA-Z0-9_.-]+$ - start to end, only letters, numbers, underscore, dot, hyphen
        // ^ - start of string
        // [a-zA-Z0-9_.-] - character class of allowed chars
        // + - one or more occurrences
        // $ - end of string
        return /^[a-zA-Z0-9_.-]+$/.test(username); 
    } 
}; 

// Object containing sanitization methods to clean user input
const Sanitizer = { 
    // Clean up general input by trimming and normalizing spaces
    // Parameter: input - string to sanitize
    // ?. optional chaining safely handles null/undefined
    // .trim() removes leading/trailing whitespace
    // .replace(/\s+/g, ' ') replaces multiple spaces with single space
    // /\s+/ matches one or more whitespace characters
    // 'g' flag means global (all occurrences)
    input: (input) => input?.trim().replace(/\s+/g, ' '), 
    
    // Sanitize HTML by escaping special characters (prevent XSS attacks)
    // Parameter: text - string that may contain HTML
    html: (text) => text?.replace(/[<>&'"]/g, char => ({ 
        // .replace with function - for each matched character, look up replacement
        // Creates object mapping dangerous chars to HTML entities
        '<': '&lt;',      // Less than becomes &lt;
        '>': '&gt;',      // Greater than becomes &gt;
        '&': '&amp;',     // Ampersand becomes &amp;
        "'": '&#39;',     // Single quote becomes &#39;
        '"': '&quot;'     // Double quote becomes &quot;
    }[char])),            // Access replacement from object using char as key
    
    // Sanitize filename by removing invalid characters
    // Parameter: name - filename to sanitize
    // /[<>:"/\\|?*]/g - matches any of these characters: < > : " / \ | ? *
    // These are invalid in Windows filenames
    // Replaces each with underscore
    filename: (name) => name?.replace(/[<>:"/\\|?*]/g, '_'), 
    
    // Remove control characters from JSON strings
    // Parameter: text - JSON string to sanitize
    // /[\u0000-\u001F\u007F-\u009F]/g - matches control characters
    // \u0000-\u001F - Unicode control chars 0-31
    // \u007F-\u009F - Unicode control chars 127-159
    // Replaces with empty string (removes them)
    json: (text) => text?.replace(/[\u0000-\u001F\u007F-\u009F]/g, '') 
}; 

// Display validation examples
console.log("Validation Examples:"); 
// Test valid email format
console.log("  Valid email:", Validator.email('test@example.com')); 
// Test invalid email format (missing @)
console.log("  Invalid email:", Validator.email('not-an-email')); 
// Test password validation and show isValid property
console.log("  Password check:", Validator.password('StrongPass123').isValid); 

// Display sanitization section
console.log("\nSanitization:"); 
// Sanitize filename with invalid characters (: < >)
// Result: test_file_name_.txt
console.log("  Filename:", Sanitizer.filename('test:file<name>.txt')); 
// Sanitize HTML to prevent XSS
// Result: &lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;
console.log("  HTML:", Sanitizer.html('<script>alert("xss")</script>')); 

// ========================================== 
// 4. REPORT FORMATTING 
// ========================================== 

// Display section header
console.log("\n=== REPORT FORMATTING ===\n"); 

// Object containing various formatting utilities
const Formatter = { 
    // Console message formatting with emoji icons
    console: { 
        // Format success message with checkmark emoji
        // Parameter: msg - message text
        success: (msg) => `✅ ${msg}`, 
        
        // Format error message with X emoji
        error: (msg) => `❌ ${msg}`, 
        
        // Format warning message with warning emoji
        warning: (msg) => `⚠️  ${msg}`, 
        
        // Format info message with info emoji
        info: (msg) => `ℹ️  ${msg}` 
    }, 
    
    // Data formatting utilities
    data: { 
        // Convert bytes to human-readable format (B, KB, MB, GB)
        // Parameter: bytes - number of bytes
        bytes: (bytes) => { 
            // Array of unit labels
            const units = ['B', 'KB', 'MB', 'GB']; 
            // Start with raw byte count
            let size = bytes; 
            // Start with first unit (Bytes)
            let unitIndex = 0; 
            
            // Loop while size >= 1024 and haven't reached last unit
            // Divide by 1024 to convert to next larger unit
            while (size >= 1024 && unitIndex < units.length - 1) { 
                size /= 1024;      // Divide by 1024
                unitIndex++;       // Move to next unit
            } 
            
            // Return formatted string with 2 decimal places and unit
            // Result: "1.50 MB" for 1536000 bytes
            return `${size.toFixed(2)} ${units[unitIndex]}`; 
        }, 
        
        // Format duration in seconds to readable time format
        // Parameter: seconds - duration in seconds
        duration: (seconds) => { 
            // If less than a minute, show seconds only
            if (seconds < 60) return `${seconds.toFixed(2)}s`; 
            
            // Calculate full minutes
            const minutes = Math.floor(seconds / 60); 
            // Calculate remaining seconds using modulo operator
            const remaining = (seconds % 60).toFixed(2); 
            
            // Return formatted as "Xm Ys"
            // Result: "2m 5.50s" for 125.5 seconds
            return `${minutes}m ${remaining}s`; 
        }, 
        
        // Calculate and format percentage
        // Parameters: value - numerator, total - denominator
        // Check if total > 0 to avoid division by zero
        // (value / total) * 100 calculates percentage
        // .toFixed(2) formats to 2 decimal places
        // Result: "80.00%" for (8, 10)
        percentage: (value, total) =>  
            total > 0 ? `${((value / total) * 100).toFixed(2)}%` : '0.00%' 
    }, 
    
    // Report template formatting
    report: { 
        // Generate formatted test summary box with ASCII borders
        // Parameter: stats - object with test statistics
        testSummary: (stats) => ` 
╔══════════════════════════════════════╗ 
║      TEST EXECUTION SUMMARY          ║ 
╠══════════════════════════════════════╣ 
║ Total Tests: ${String(stats.total).padEnd(22)} ║ 
║ Passed:      ${String(stats.passed).padEnd(22)} ║ 
║ Failed:      ${String(stats.failed).padEnd(22)} ║ 
║ Pass Rate:   ${String(`${stats.passRate}%`).padEnd(22)} ║ 
╚══════════════════════════════════════╝ 
`.trim()  // .trim() removes leading/trailing whitespace from template
        // String(value) converts to string
        // .padEnd(22) pads with spaces to ensure alignment in box
        // Box-drawing characters (╔ ═ ╗ ║ ╠ ╣ ╚) create border
    } 
}; 

// Display formatted message examples
console.log("Formatted Messages:"); 
// Show success message with checkmark
console.log(Formatter.console.success('Test passed')); 
// Show error message with X
console.log(Formatter.console.error('Test failed')); 

// Display data formatting section
console.log("\nData Formatting:"); 
// Format 1536000 bytes as MB
console.log("  File size:", Formatter.data.bytes(1536000)); 
// Format 125.5 seconds as minutes and seconds
console.log("  Duration:", Formatter.data.duration(125.5)); 
// Calculate percentage of 8 out of 10
console.log("  Pass rate:", Formatter.data.percentage(8, 10)); 

// Display test summary section
console.log("\nTest Summary:"); 
// Create sample statistics object
const sampleStats = { total: 10, passed: 8, failed: 2, passRate: 80.0 }; 
// Generate and display formatted summary box
console.log(Formatter.report.testSummary(sampleStats));