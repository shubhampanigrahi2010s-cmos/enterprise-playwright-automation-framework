// ============================================================================
// SCENARIO 1: Mass data entry (e-commerce testing)
// ============================================================================
// This scenario simulates automated testing of an e-commerce shopping cart
// where multiple products need to be added and their totals calculated

// Array of product objects - each product has name, price, and quantity
// In real automation, this data might come from a CSV file or database
const products = [
  { name: "Laptop", price: 999, quantity: 5 },
  { name: "Mouse", price: 25, quantity: 10 },
  { name: "Keyboard", price: 75, quantity: 8 },
  { name: "Monitor", price: 300, quantity: 3 }
];

console.log("🛒 Adding products to cart:");

// Initialize a variable to track the total cost of all items
let totalCost = 0;

// Loop through each product in the array using a traditional for loop
// We use 'i' as the loop counter variable (starts at 0, increments by 1)
for (let i = 0; i < products.length; i++) {
  // Get the current product object from the array using index 'i'
  const product = products[i];
  
  // Calculate the total cost for this specific product
  // (price per unit × number of units = total for this item)
  const itemTotal = product.price * product.quantity;
  
  // Add this item's total to the running grand total
  // This accumulates the cost across all iterations
  totalCost += itemTotal;
  
  // Log the details of this product in a formatted string
  // i+1 is used because arrays are 0-indexed but we want to display 1, 2, 3...
  console.log(`${i+1}. ${product.name}: $${product.price} x ${product.quantity} = $${itemTotal}`);
  
  // In real automation testing, the following would be actual Selenium/Puppeteer commands:
  // - Locate the "Add to Cart" button element
  // - Click it programmatically
  console.log(`  → Click "Add to Cart" for ${product.name}`);
  
  // After clicking, verify that the cart UI updates correctly
  // This might involve checking the cart count badge or total price display
  console.log(`  → Verify cart updates`);
}

// After all products are processed, display the final cart total
// The '\n' creates a blank line for better readability
console.log(`\n💰 Cart Total: $${totalCost}`);


// ============================================================================
// SCENARIO 2: Multi-page navigation testing
// ============================================================================
// This scenario tests pagination functionality on websites that split
// content across multiple pages (like search results or product listings)

console.log("\n📄 Testing pagination:");

// Define how many pages we need to test
const totalPages = 5;

// Define how many items should appear on each page
// This helps verify that the correct range of items is displayed
const itemsPerPage = 10;

// Loop through each page number from 1 to totalPages (inclusive)
for (let page = 1; page <= totalPages; page++) {
  // Calculate which item numbers should appear on this page
  // Example: Page 1 shows items 1-10, Page 2 shows items 11-20, etc.
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = page * itemsPerPage;
  
  // Log which page we're testing and what items should be visible
  console.log(`Page ${page}: Items ${startItem}-${endItem}`);
  
  // Navigation logic: Only show "Previous" button if we're past the first page
  if (page > 1) {
    console.log(`  ← Click "Previous Page"`);
  }
  
  // Verify that the correct items are displayed on this page
  // This might involve checking item IDs, titles, or content
  console.log(`  ✓ Verify items displayed correctly`);
  
  // Navigation logic: Only show "Next" button if there are more pages ahead
  if (page < totalPages) {
    console.log(`  → Click "Next Page"`);
  }
}


// ============================================================================
// NESTED LOOPS: Testing across multiple dimensions
// ============================================================================
// This demonstrates testing the same features across different browsers
// This is crucial for ensuring cross-browser compatibility

console.log("\n🧪 Cross-browser testing:");

// Array of test suites, each containing a test name and list of browsers to test on
// This structure allows us to run different tests on different browser combinations
const testSuites = [
  { name: "Login Tests", browsers: ["chrome", "firefox"] },
  { name: "Checkout Tests", browsers: ["chrome", "safari"] },
  { name: "Search Tests", browsers: ["firefox", "edge"] }
];

// OUTER LOOP: Iterate through each test suite
// This loop controls WHICH test we're running
for (let suiteIndex = 0; suiteIndex < testSuites.length; suiteIndex++) {
  // Get the current test suite object
  const suite = testSuites[suiteIndex];
  
  // Log which test suite is currently running
  console.log(`\nRunning: ${suite.name}`);
  
  // INNER LOOP: For each test suite, iterate through each browser
  // This creates a nested structure: for each test, run it on multiple browsers
  for (let browserIndex = 0; browserIndex < suite.browsers.length; browserIndex++) {
    // Get the current browser name from the suite's browser array
    const browser = suite.browsers[browserIndex];
    
    // Log which browser is being used for this test run
    // toUpperCase() makes the browser name stand out in the logs
    console.log(`  → On ${browser.toUpperCase()}`);
    
    // Execute the actual test scenarios for this browser
    // In real automation, this would launch the browser and run the tests
    console.log(`    ✓ Execute test scenarios`);
    
    // Capture screenshots for documentation or failure analysis
    // This is common in automated testing for debugging and reporting
    console.log(`    ✓ Capture screenshots`);
  }
  // After the inner loop completes, we move to the next test suite
}

// ============================================================================
// KEY CONCEPTS DEMONSTRATED:
// ============================================================================
// 1. SIMPLE FOR LOOPS: Iterate through arrays with counters (i, page)
// 2. ARRAY ACCESS: Using index notation to get elements (products[i])
// 3. ACCUMULATION: Building up totals across iterations (totalCost += itemTotal)
// 4. CONDITIONAL LOGIC IN LOOPS: Different actions based on position (page > 1)
// 5. NESTED LOOPS: Loop within a loop for multi-dimensional testing
// 6. REAL-WORLD APPLICATIONS: E-commerce testing, pagination, cross-browser tests
// ============================================================================