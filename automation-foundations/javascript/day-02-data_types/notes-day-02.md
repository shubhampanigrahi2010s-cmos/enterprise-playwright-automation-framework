# Day 02 – JavaScript Fundamentals for Automation Testing

## Overview
This document covers core JavaScript concepts that are used daily in
automation testing. The focus is on understanding how data is stored,
logged, and presented clearly during test execution and debugging.

Scope of this day is intentionally limited to fundamentals only:
- No functions
- No conditions
- No loops
- No frameworks

---

## 1. JavaScript Data Types

### String
Strings are primarily used for:
- Test names
- Error messages
- UI selectors
- Log messages

Common examples include:
- `"Login Test"`
- `"#username-field"`
- `"Invalid credentials"`

Template literals (`` ` ` ``) are preferred for:
- Dynamic messages
- Readable logs
- Clean output formatting

---

### Number
Numbers are used for:
- Timeouts (milliseconds)
- Retry counts
- Execution duration
- Percentage calculations

Typical examples:
- `5000` → timeout
- `3` → retry attempts
- `45.5` → execution duration (seconds)

Numeric values are frequently involved in **metrics and reporting logic**.

---

### Boolean
Booleans represent true/false conditions and flags.

Common automation use cases:
- Headless mode enablement
- Test pass/fail state
- Element visibility

Boolean values drive execution decisions in later automation layers.

---

### Undefined
Indicates that a variable is declared but not yet assigned a value.

Commonly encountered when:
- An element is not initialized
- A value is expected but not yet available

Useful for identifying missing or uninitialized data.

---

### Null
Represents an intentionally empty value.

Typical automation use cases:
- API response placeholders
- Resetting previously assigned values
- Clearing state between test steps

---

### Object
Objects are used to group related data together.

In automation frameworks, objects commonly store:
- Test configuration
- Browser settings
- Environment information

Objects improve structure, readability, and maintainability.

---

### Array
Arrays store ordered collections of data.

Common automation examples:
- List of browsers
- Test execution results
- Step sequences

Important characteristics:
- Index starts at `0`
- `.length` returns the total number of items

---

## 2. String Operations in Automation

String operations are frequently used for:
- Validations
- Assertions
- Logging and debugging

Common operations include:
- `.length` → character count
- `.includes()` → text presence check
- `.toUpperCase()` / `.toLowerCase()` → text normalization

These operations are widely used in verification steps.

---

## 3. Logging and Debugging Basics

### Console Logging
- `console.log()` is used for general execution logs
- Helps track test flow and values during execution

---

### Logging Multiple Values
Logging multiple variables together helps inspect runtime state.
Sensitive data (such as passwords) must never be logged in real projects.

---

### Log Severity Levels
Different console methods convey different meanings:

- `console.log()` → informational messages
- `console.warn()` → non-blocking issues
- `console.error()` → critical errors or failures

This separation improves log readability, especially in CI/CD pipelines.

---

### Structured Logging with `console.table()`
`console.table()` is useful for visualizing:
- Test results
- Collections of data
- Execution summaries

This format improves clarity during debugging.

---

### Performance Timing
`console.time()` and `console.timeEnd()` are used to:
- Measure execution duration
- Identify slow steps
- Debug performance-related issues

---

## 4. Percentage Calculation and `.toFixed()`

JavaScript calculations may produce long decimal values that are not
suitable for reports.

`.toFixed()` is used:
- Only for display purposes
- Only for human-readable output

Example:
- `77.7777777` → `77.8`

Important note:
- `.toFixed()` returns a **string**
- It should not be used for further calculations

---

## 5. Test Execution Report Concept

By the end of Day 02, the following concepts are established:
- Storing test configuration data
- Capturing execution results
- Calculating pass percentages
- Printing readable execution summaries

These concepts form the foundation of automation reporting systems.

---

## Rules Followed
- No functions
- No conditions
- No loops
- No frameworks

Only:
- Variables
- Data types
- Calculations
- Logging
- Structured output

---

## Outcome
- Clear understanding of how automation data is stored
- Improved logging and debugging clarity
- Ability to produce readable execution summaries
- Strong foundation for advanced automation logic
