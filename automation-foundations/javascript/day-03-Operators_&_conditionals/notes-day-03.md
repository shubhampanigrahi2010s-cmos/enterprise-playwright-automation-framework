# Day 3 – JavaScript Operators & Conditionals (Automation Focus)

## Objective
Understand and apply JavaScript operators and conditional logic as used in **real-world test automation**, reporting, and decision-making.

---

## 1. Arithmetic Operators

Arithmetic operators are used for **calculations** such as time, scores, retries, and metrics.

### Operators
- **Addition (+)** – Adds values
- **Subtraction (-)** – Finds remaining values
- **Multiplication (*)** – Converts or scales values
- **Division (/)** – Calculates averages or ratios
- **Modulus (%)** – Finds remainder (pattern detection)

### Automation Use Cases
- Counting total, passed, and failed tests
- Converting time units (ms ↔ sec ↔ min)
- Calculating retry delays and total timeout
- Computing averages (response time, duration)
- Detecting even/odd runs or batch boundaries

---

## 2. Assignment Operators

Assignment operators update variable values efficiently.

### Operators
- **=** Assign value
- **+=** Add and assign
- **-=** Subtract and assign
- **\*=** Multiply and assign
- **/=** Divide and assign

### Automation Use Cases
- Updating retry counters
- Adjusting dynamic timeouts
- Accumulating scores and totals
- Implementing exponential backoff

---

## 3. Comparison Operators

Comparison operators return **true / false** and are critical for validations.

### Operators
- **===** Strict equality (value + type)
- **!==** Strict inequality
- **> , >=** Greater than checks
- **< , <=** Less than checks
- **==** Loose equality (**avoid**)

### Rules
- Always prefer **===** over **==**
- Prevents silent bugs caused by type coercion
- Commonly used in assertions and API validations

---

## 4. Logical Operators

Logical operators combine multiple conditions.

### Operators
- **AND (&&)** – All conditions must be true
- **OR (||)** – At least one condition must be true
- **NOT (!)** – Inverts boolean value

### Automation Use Cases
- Element readiness checks (visible && enabled && stable)
- Permission validation (admin OR owner)
- Environment safety checks (!production)
- Default value selection
- Feature flag handling

---

## 5. Increment & Decrement Operators

Used to increase or decrease values by 1.

### Operators
- **++** Increment
- **--** Decrement
- **x++** Post-increment (use value, then increment)
- **++x** Pre-increment (increment, then use value)

### Automation Use Cases
- Retry counters
- Attempt tracking
- Sequential execution steps

---

## 6. Ternary Operator

Shorthand alternative to simple if/else.

### Syntax
**condition ? valueIfTrue : valueIfFalse**

### Automation Use Cases
- Inline pass/fail decisions
- Timeout selection based on performance
- Status message selection

⚠️ Use ternary only for **simple logic**.  
Complex conditions should use if/else.

---

## 7. Type Operators

Used for type checking and debugging.

### Operators
- **typeof** – Returns primitive type as string
- **instanceof** – Checks object inheritance

### Automation Use Cases
- Preventing undefined/null errors
- Validating API response formats
- Defensive programming in frameworks

---

## 8. Conditional Statements

### IF
- Executes block only if condition is true

### IF / ELSE
- Chooses between two execution paths

### IF / ELSE IF / ELSE
- Handles multiple exclusive conditions
- Evaluated top to bottom
- First true condition executes, rest are skipped

### Nested IF
- IF inside another IF
- Used for layered validation
- Can become complex → refactor later with guard clauses

### Switch
- Cleaner alternative to long if/else chains
- Compares one value against multiple cases
- Must include **break** to prevent fall-through
- Has **default** fallback for unmatched values

---

## 9. Common Automation Calculations

### Pass Rate
**(passCount / totalTests) × 100**

### Average
**totalValue / count**

### Time Conversions
- ms → sec: divide by 1000
- sec → ms: multiply by 1000
- min → sec: × 60
- hr → ms: × 60 × 60 × 1000

### Retry Timeout
**totalTimeout = baseTimeout × (retries + 1)**

### Percentiles (p95)
- Sort values ascending
- Index = length × 0.95
- Use Math.floor for index
- Get value at that index

### Error Rate
**(errorCount / totalRequests) × 100**

### Throughput
**(totalData / time) / (1024 × 1024)** for MB/s

### Batch Count
**Math.ceil(totalItems / batchSize)**

---

## 10. Rounding Methods

| Method | Behavior | Automation Use |
|--------|----------|----------------|
| toFixed(n) | Rounds to n decimals (returns string) | Reporting, display |
| Math.round() | Nearest integer | General metrics |
| Math.floor() | Always rounds down | Array indices, pagination |
| Math.ceil() | Always rounds up | Batch counts, capacity |

---

## 11. Pattern Detection with Modulo (%)

### Use Cases
- Every Nth execution
- Even / odd alternation
- Batch remainder calculation
- Rotating through options

### Examples
- **run % 5 === 0** → every 5th run
- **index % 2 === 0** → even/odd check
- **index % 3** → rotate through 3 options (0, 1, 2)

---

## 12. Complex Decision Making

### AND Conditions (&&)
- All must pass
- Used for validation chains
- Short-circuits at first false value

### OR Conditions (||)
- Any one can pass
- Used for flexible permissions
- Short-circuits at first true value

### Guard Clauses
- Validate failure cases first
- Exit early on invalid conditions
- Improves readability and reduces nesting
- Best practice for function validation

### Nested Ternary
- Technically allowed but discouraged
- Can become unreadable quickly
- Prefer clarity over brevity
- Use if/else for complex logic

---

## 13. Real-World Automation Scenarios

### API Validation
- Status code check (=== 200)
- Response time check (< threshold)
- Data existence check
- All conditions must pass

### Retry Decision Logic
- Check retry count < max retries
- Verify error is retryable
- Calculate exponential backoff delay
- Only retry for network errors

### Permission Checks
- Admin OR owner OR specific permission
- At least one grants access
- Multiple authorization paths

### Form Validation
- All required fields filled
- Format validation (email contains @)
- Constraint validation (age >= 18)
- Terms acceptance check

### Environment-Based Execution
- Different URLs per environment
- Different safety checks per environment
- Production blocks certain tests
- Use strict equality for environment names

### Performance & SLA Checks
- Measure response times
- Compare against targets
- Calculate percentiles
- Flag slow requests

---

## 14. Best Practices

### Operators
- Use **===** always (never ==)
- Use parentheses for clarity in complex expressions
- Put simple checks first (short-circuit optimization)

### Conditionals
- Prefer readable logic over compact logic
- Comment complex conditions to explain intent
- Keep ternaries simple (one level only)
- Use guard clauses to reduce nesting
- Break complex conditions into named boolean variables

### Data Handling
- Validate data before using it
- Check for undefined/null before accessing properties
- Handle edge cases early
- Provide default values with || or ?? operators

### Code Quality
- Avoid premature optimization
- Use meaningful variable names
- Test boundary conditions
- Document formulas with comments

---

## 15. Project – Test Score Calculator (No Loops)

### Purpose
Simulate test result evaluation using **only Day 3 concepts** (no loops, no arrays).

### Features
- Individual test checks with if/else
- Score and percentage calculation
- Performance warnings for slow tests
- Multi-condition status decision
- Actionable recommendations based on failures

### Logic Flow
1. Define test data objects
2. Check each test individually
3. Award points if passed
4. Flag performance issues (time > threshold)
5. Store problems in separate variables
6. Calculate final percentage
7. Display problems found
8. Determine status with complex conditionals
9. Provide specific fix recommendations

### Status Rules
- **Perfect** → ≥ 80% AND no issues
- **Passed with Warnings** → ≥ 80% WITH issues
- **Failed** → < 80%

### Key Learning Points
- This approach is intentionally verbose
- Shows pain points that loops/arrays solve
- Demonstrates pure conditional logic
- Builds foundation for Day 4 (loops)

---

## 16. Short-Circuit Evaluation

### Concept
Logical operators stop evaluating once result is known.

### Behavior
- **AND (&&)**: Stops at first false (no need to check rest)
- **OR (||)**: Stops at first true (no need to check rest)

### Benefits
- Performance optimization
- Prevents errors (check if object exists before accessing properties)
- Conditional execution pattern

### Practical Uses
- Avoid null/undefined errors: **user && user.name**
- Skip expensive checks: **cheapCheck() && expensiveCheck()**
- Conditional execution: **isLoggedIn && performAction()**

---

## Summary

Day 3 focused on **decision-making logic**, which is the backbone of automation testing.

These concepts are used daily in:
- Test assertions and validations
- Metrics calculation and reporting
- Retry strategies and timeout logic
- Safety checks and guards
- Test flow control and branching
- Performance monitoring
- Error rate tracking

**Mastering operators and conditionals is essential before moving to loops, functions, and frameworks.**

---
