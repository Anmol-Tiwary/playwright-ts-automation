# CURA Login Validation Plan

## Application Overview

Login validation test plan for CURA Healthcare Service demo site. Covers positive login and essential negative validation checks for incorrect, missing, and error-message validation.

## Test Scenarios

### 1. CURA Healthcare Login Validation

**Seed:** `tests/seed.spec.ts`

#### 1.1. Positive Login with Valid Credentials

**File:** `tests/cura-login-validation-plan.md`

**Steps:**
  1. -
    - expect: Navigate to https://katalon-demo-cura.herokuapp.com/
    - expect: Homepage loads successfully with the site title visible
  2. Click the Login link or open /profile.php#login
    - expect: Login section is displayed and the Username and Password fields are present
  3. Enter valid Username "John Doe"
    - expect: Username value is accepted
  4. Enter valid Password "ThisIsNotAPassword"
    - expect: Password value is accepted
  5. Click the Login button
    - expect: User is redirected to the appointment page or authenticated area
    - expect: Page URL changes to include /#appointment or appointment interface is visible

#### 1.2. Negative Login with Invalid Credentials

**File:** `tests/cura-login-validation-plan.md`

**Steps:**
  1. -
    - expect: Navigate to the login page while logged out
    - expect: Login form is visible
  2. Enter invalid Username and invalid Password
    - expect: Fields accept input
  3. Click the Login button
    - expect: Login does not succeed
    - expect: The page remains on the login screen
    - expect: An authentication error message is displayed

#### 1.3. Negative Login with Empty Username

**File:** `tests/cura-login-validation-plan.md`

**Steps:**
  1. -
    - expect: Navigate to the login page
    - expect: Login form is visible
  2. Leave Username blank
    - expect: Username field is empty
  3. Enter valid Password "ThisIsNotAPassword"
    - expect: Password value is accepted
  4. Click the Login button
    - expect: Login is rejected
    - expect: The page remains on the login screen
    - expect: A validation message is displayed for missing username

#### 1.4. Negative Login with Empty Password

**File:** `tests/cura-login-validation-plan.md`

**Steps:**
  1. -
    - expect: Navigate to the login page
    - expect: Login form is visible
  2. Enter valid Username "John Doe"
    - expect: Username value is accepted
  3. Leave Password blank
    - expect: Password field is empty
  4. Click the Login button
    - expect: Login is rejected
    - expect: The page remains on the login screen
    - expect: A validation message is displayed for missing password
