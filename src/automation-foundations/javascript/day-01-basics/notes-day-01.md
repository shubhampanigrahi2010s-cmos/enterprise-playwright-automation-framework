# Day 01 – JavaScript Variables (Automation Context)

## Overview
This document explains how JavaScript variables are used within
automation frameworks, with examples relevant to test execution,
state tracking, and configuration management.

---

## Variable Types

### 1. `const` (Constants)
Used for values that must remain unchanged throughout the test lifecycle.

**Characteristics:**
- Read-only (cannot be reassigned)
- Block scoped
- Improves test stability and prevents accidental changes
- Naming convention: `UPPERCASE_WITH_UNDERSCORES`

**Common Automation Usage:**
- Application URLs
- UI selectors
- Timeout values
- Configuration keys

---

### 2. `let` (Mutable Variables)
Used for values that change during test execution.

**Characteristics:**
- Block scoped (safer than `var`)
- Allows reassignment
- Suitable for runtime and dynamic data

**Common Automation Usage:**
- Test execution status
- Retry counters
- Dynamic values captured during tests
- Page or state tracking

---

### 3. `var` (Legacy – Avoid)
Legacy variable declaration with scope-related issues.

**Reasons to avoid:**
- Function/global scope can cause unintended overwrites
- Leads to unpredictable behavior in large test suites
- Replaced by `let` and `const` in modern JavaScript

---

## Automation-Oriented Examples
- `BASE_URL`: Constant configuration used across all tests
- `testStatus`: Runtime state updated as test progresses
- `retryCount`: Increments during retry logic
- `currentPageName`: Tracks navigation flow for debugging

---

## Security Considerations
Sensitive information such as passwords or tokens must never be logged.
In real projects, credentials should be managed using:
- Environment variables
- Configuration files
- Secure secrets vaults

---

## Key Principle
Use `const` by default for safety, `let` when mutation is required,
and avoid `var` in automation frameworks.
