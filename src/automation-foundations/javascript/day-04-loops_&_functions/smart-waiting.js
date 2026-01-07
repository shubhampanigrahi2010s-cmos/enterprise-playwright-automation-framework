// ============================================================================
// SCENARIO 1: Waiting for dynamic content (AJAX loading)
// ============================================================================
// Modern websites load content asynchronously (AJAX/fetch), so automation
// needs to wait for elements to appear before interacting with them
// This scenario simulates polling/checking until content is ready

console.log("⏳ Waiting for dynamic content to load...");

// Flag variable to track whether our target content has loaded
// Starts as false, will be set to true when content appears
let contentLoaded = false;

// Counter to track how long we've been waiting (in seconds)
let waitTime = 0;

// Maximum time we're willing to wait before giving up (timeout threshold)
// After 10 seconds, we'll stop waiting and handle the failure
const maxWaitTime = 10; // seconds

// WHILE LOOP: Continues as long as BOTH conditions are true:
// 1. Content hasn't loaded yet (!contentLoaded)
// 2. We haven't exceeded our timeout (waitTime < maxWaitTime)
// The '&&' means BOTH must be true for the loop to continue
while (!contentLoaded && waitTime < maxWaitTime) {
  // Log the current wait time so we can track progress
  console.log(`Checking at ${waitTime}s...`);
  
  // Simulate checking for different elements on the page
  // In real automation, this would be: await page.$('#element-id')
  
  // After 3 seconds, simulate that the main content has appeared
  if (waitTime >= 3) {
    console.log("  ✓ Main content loaded");
    contentLoaded = true; // This will cause the while loop to exit
  } 
  // At exactly 2 seconds, a sidebar element appears
  else if (waitTime === 2) {
    console.log("  ✓ Sidebar loaded");
    // Note: contentLoaded stays false, so loop continues
  } 
  // Before 2 seconds, nothing has loaded yet
  else {
    console.log("  ...still loading");
  }
  
  // Increment the wait time counter
  // This ensures the loop eventually terminates (prevents infinite loop)
  waitTime++;
  
  // In real automation, you'd add: await page.waitForTimeout(1000)
  // to actually pause execution for 1 second between checks
}

// After the loop exits, check WHY it exited
// If contentLoaded is still false, we timed out
if (!contentLoaded) {
  console.log("⚠️ Timeout - taking fallback action");
  
  // Common fallback strategies when elements don't load:
  console.log("  → Reloading page"); // Refresh and try again
  console.log("  → Logging error");  // Record the failure for debugging
}


// ============================================================================
// SCENARIO 2: Progressive timeout (exponential backoff)
// ============================================================================
// Instead of checking at regular intervals, we increase wait times between
// attempts. This is more efficient and reduces server load.
// Common pattern: 1s, 2s, 4s, 8s... (doubling each time)

console.log("\n🔄 Progressive element waiting:");

// Flag to track if we've successfully found our target element
let elementFound = false;

// Counter for how many search attempts we've made
let attempts = 0;

// Array defining how long to wait after each attempt (in milliseconds)
// This creates a progressive backoff: wait longer each time
// Pattern here: 1s → 2s → 3s → 5s (not quite exponential, but progressive)
const waitPattern = [1000, 2000, 3000, 5000]; // Wait times in ms

// WHILE LOOP with TWO exit conditions (connected by &&):
// 1. Element hasn't been found yet (!elementFound)
// 2. We haven't exhausted all our wait patterns (attempts < waitPattern.length)
while (!elementFound && attempts < waitPattern.length) {
  // Get the wait time for this specific attempt from our pattern array
  const currentWait = waitPattern[attempts];
  
  // Log which attempt this is and how long we're waiting
  // attempts + 1 because humans count from 1, not 0
  console.log(`Attempt ${attempts + 1}: Waiting ${currentWait}ms`);
  
  // In real automation, you would actually pause here:
  // await page.waitForTimeout(currentWait)
  // Then check if the element exists:
  // const element = await page.$('#my-element')
  
  // Simulate finding the element on the 3rd attempt (attempts = 2, since 0-indexed)
  if (attempts >= 2) {
    elementFound = true; // Set flag to exit the loop
    console.log("✓ Element found!");
  }
  
  // Move to the next attempt
  // This increments the counter and will use the next wait time in the pattern
  attempts++;
}

// After loop exits:
// - If elementFound is true: success! Continue with automation
// - If elementFound is false: we exhausted all attempts, handle failure


// ============================================================================
// SCENARIO 3: Processing streaming results
// ============================================================================
// This scenario processes test results as they come in (streaming data)
// and stops when we hit a specific pattern (5 consecutive passes)
// Useful for: monitoring test suites, quality gates, performance checks

console.log("\n📊 Processing test results stream:");

// Array of test results coming in sequentially
// Could represent results from a CI/CD pipeline or test runner
const incomingResults = ["PASS", "PASS", "FAIL", "PASS", "PASS", "PASS"];

// Index to track which result we're currently processing
let resultIndex = 0;

// Counter for how many consecutive PASS results we've seen
// This resets to 0 whenever we encounter a FAIL
let consecutivePasses = 0;

// WHILE LOOP with TWO conditions (both must be true to continue):
// 1. We haven't processed all results yet (resultIndex < incomingResults.length)
// 2. We haven't hit our target of 5 consecutive passes (consecutivePasses < 5)
// This implements an "early exit" strategy - stop processing once goal is met
while (resultIndex < incomingResults.length && consecutivePasses < 5) {
  // Get the current result from our array
  const result = incomingResults[resultIndex];
  
  // Check if this result is a PASS
  if (result === "PASS") {
    // Increment our consecutive pass counter
    consecutivePasses++;
    console.log(`✓ Pass ${consecutivePasses}`);
    
    // If consecutivePasses reaches 5, the while condition becomes false
    // and the loop will exit on the next check
  } 
  // If result is a FAIL (or anything other than "PASS")
  else {
    // Reset the consecutive pass counter back to 0
    // We need 5 passes IN A ROW, so any failure restarts the count
    consecutivePasses = 0;
    console.log(`✗ Fail - resetting counter`);
  }
  
  // Move to the next result in the array
  // This ensures the loop progresses and eventually terminates
  resultIndex++;
}

// After loop exits, report how many results we processed
// This might be less than the total if we hit 5 consecutive passes early
console.log(`\nProcessed ${resultIndex} results before hitting 5 consecutive passes`);

// Note: If we processed all results without hitting 5 consecutive passes,
// resultIndex would equal incomingResults.length
// You could add additional logic here to handle that case


// ============================================================================
// KEY CONCEPTS DEMONSTRATED:
// ============================================================================
// 1. WHILE LOOPS: Run code repeatedly while a condition is true
//    - Useful when you don't know how many iterations you'll need
//    - Different from FOR loops which typically have a known iteration count
//
// 2. MULTIPLE EXIT CONDITIONS: Using && (AND) or || (OR) operators
//    - && means ALL conditions must be true to continue
//    - || means AT LEAST ONE condition must be true to continue
//
// 3. FLAG VARIABLES: Boolean variables (contentLoaded, elementFound)
//    - Used to control loop execution
//    - Set to true/false to signal state changes
//
// 4. COUNTER VARIABLES: Numeric variables (waitTime, attempts, resultIndex)
//    - Track progress through iterations
//    - Prevent infinite loops by providing a maximum bound
//
// 5. EARLY EXIT STRATEGY: Stop processing when a goal is met
//    - More efficient than processing everything
//    - Example: stop after finding what you're looking for
//
// 6. STATE TRACKING: Variables that maintain information across iterations
//    - consecutivePasses: tracks a pattern across multiple iterations
//    - Resets when conditions change (FAIL breaks the streak)
//
// 7. REAL-WORLD APPLICATIONS:
//    - Dynamic content loading (AJAX/SPA websites)
//    - Retry logic with progressive backoff
//    - Stream processing with early termination
//    - Quality gates in CI/CD pipelines
// ============================================================================

// ============================================================================
// INFINITE LOOP WARNING:
// ============================================================================
// Be careful with while loops! They can run forever if:
// - The condition never becomes false
// - Counter variables aren't incremented
// - Flag variables aren't updated
//
// Example of an INFINITE LOOP (DON'T DO THIS):
// let x = 0;
// while (x < 10) {
//   console.log(x);
//   // Forgot to increment x! Loop runs forever
// }
//
// Always ensure your while loops have a way to exit!
// ============================================================================