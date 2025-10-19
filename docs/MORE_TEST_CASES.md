# Calculator Test Scenarios

## Issue 1: Unary Operator → New Number → Equals

### Test Case 1.1: Square Root → New Number → Equals
**Steps**:
1. Press `9`
2. Press `√` (square root)
3. Press `5`
4. Press `=`

**Expected Result**:
- After step 2: Display shows `3`, expression shows `√(9)`
- After step 3: Display shows `5`, expression should be cleared (empty)
- After step 4: Display shows `5`, expression shows `5 =`

**Previous Bug**: Expression showed `√(9) = 5` (WRONG)

---

### Test Case 1.2: Multiple Unary Operations → New Number → Equals
**Steps**:
1. Press `16`
2. Press `√` (square root)
3. Press `√` (square root again)
4. Press `7`
5. Press `=`

**Expected Result**:
- After step 2: Display shows `4`, expression shows `√(16)`
- After step 3: Display shows `2`, expression shows `√(√(16))`
- After step 4: Display shows `7`, expression should be cleared (empty)
- After step 5: Display shows `7`, expression shows `7 =`

---

### Test Case 1.3: Square → New Number → Equals
**Steps**:
1. Press `3`
2. Press `x²` (square)
3. Press `8`
4. Press `=`

**Expected Result**:
- After step 2: Display shows `9`, expression shows `sqr(3)`
- After step 3: Display shows `8`, expression should be cleared (empty)
- After step 4: Display shows `8`, expression shows `8 =`

---

### Test Case 1.4: Reciprocal → New Number → Equals
**Steps**:
1. Press `4`
2. Press `¹⁄ₓ` (reciprocal)
3. Press `10`
4. Press `=`

**Expected Result**:
- After step 2: Display shows `0.25`, expression shows `1/(4)`
- After step 3: Display shows `10`, expression should be cleared (empty)
- After step 4: Display shows `10`, expression shows `10 =`

---

### Test Case 1.5: Unary → Decimal Input → Equals
**Steps**:
1. Press `9`
2. Press `√` (square root)
3. Press `.` (decimal)
4. Press `5`
5. Press `=`

**Expected Result**:
- After step 2: Display shows `3`, expression shows `√(9)`
- After step 3: Display shows `0.5`, expression should be cleared (empty)
- After step 4: Display shows `0.5`
- After step 5: Display shows `0.5`, expression shows `0.5 =`

---

## Issue 2: Error State - Decimal Button Should Be Disabled

### Test Case 2.1: Division by Zero - Decimal Disabled
**Steps**:
1. Press `1`
2. Press `÷`
3. Press `0`
4. Press `=`
5. Try to press `.` (decimal)

**Expected Result**:
- After step 4: Display shows `Cannot divide by zero`
- After step 5: Decimal button should be disabled and not respond

---

### Test Case 2.2: Invalid Input - Decimal Disabled
**Steps**:
1. Press `-5`
2. Press `√` (square root)
3. Try to press `.` (decimal)

**Expected Result**:
- After step 2: Display shows `Invalid input`
- After step 3: Decimal button should be disabled and not respond

---

### Test Case 2.3: Error State - All Disabled Buttons
**Steps**:
1. Press `1`
2. Press `÷`
3. Press `0`
4. Press `=`
5. Try pressing each operator and function button

**Expected Result**:
- After step 4: Display shows `Cannot divide by zero`
- The following buttons should be DISABLED (no response):
  - `.` (decimal)
  - `+`, `−`, `×`, `÷` (operators)
  - `%` (percentage)
  - `¹⁄ₓ` (reciprocal)
  - `x²` (square)
  - `√` (square root)
  - `±` (sign toggle)
  
- The following buttons should be ENABLED (work normally):
  - `0-9` (numbers)
  - `CE` (clear entry)
  - `C` (clear all)
  - `⌫` (backspace)
  - `=` (equals)

---

## Issue 3: Error Reset Behavior

### Test Case 3.1: Equals Button Resets on Error
**Steps**:
1. Press `1`
2. Press `÷`
3. Press `0`
4. Press `=`
5. Press `=` again

**Expected Result**:
- After step 4: Display shows `Cannot divide by zero`
- After step 5: Display shows `0`, calculator is fully reset, all buttons enabled

**Previous Bug**: Equals button did not reset display to "0"

---

### Test Case 3.2: Number Input Resets on Error
**Steps**:
1. Press `1`
2. Press `÷`
3. Press `0`
4. Press `=`
5. Press `5`

**Expected Result**:
- After step 4: Display shows `Cannot divide by zero`
- After step 5: Display shows `5`, calculator is fully reset, all buttons enabled

---

### Test Case 3.3: CE Button Clears Error
**Steps**:
1. Press `1`
2. Press `÷`
3. Press `0`
4. Press `=`
5. Press `CE`

**Expected Result**:
- After step 4: Display shows `Cannot divide by zero`
- After step 5: Display shows `0`, error cleared, all buttons enabled

---

### Test Case 3.4: C Button Clears Error
**Steps**:
1. Press `1`
2. Press `÷`
3. Press `0`
4. Press `=`
5. Press `C`

**Expected Result**:
- After step 4: Display shows `Cannot divide by zero`
- After step 5: Display shows `0`, calculator fully reset, all buttons enabled

---

### Test Case 3.5: Backspace Clears Error
**Steps**:
1. Press `1`
2. Press `÷`
3. Press `0`
4. Press `=`
5. Press `⌫` (backspace)

**Expected Result**:
- After step 4: Display shows `Cannot divide by zero`
- After step 5: Display shows `0`, calculator fully reset, all buttons enabled

---

## Additional Integration Tests

### Test Case 4.1: Unary in Binary Operation
**Steps**:
1. Press `10`
2. Press `+`
3. Press `9`
4. Press `√` (square root)
5. Press `=`

**Expected Result**:
- After step 2: Expression shows `10 +`
- After step 4: Display shows `3`, expression shows `10 + √(9)`
- After step 5: Display shows `13`, expression shows `10 + √(9) =`

---

### Test Case 4.2: Unary in Binary → New Number → Equals
**Steps**:
1. Press `10`
2. Press `+`
3. Press `9`
4. Press `√` (square root)
5. Press `5`
6. Press `=`

**Expected Result**:
- After step 2: Expression shows `10 +`
- After step 4: Display shows `3`, expression shows `10 + √(9)`
- After step 5: Display shows `5`, expression should show `10 +` (unary part cleared)
- After step 6: Display shows `15`, expression shows `10 + 5 =`

---

### Test Case 4.3: Multiple Unary Operations
**Steps**:
1. Press `16`
2. Press `√` (square root)
3. Press `√` (square root again)
4. Press `=`

**Expected Result**:
- After step 2: Display shows `4`, expression shows `√(16)`
- After step 3: Display shows `2`, expression shows `√(√(16))`
- After step 4: Display shows `2`, expression shows `√(√(16)) =`

---

## Summary of Fixed Issues

✅ **Issue 1**: Unary operator followed by new number input now correctly clears the unary expression
✅ **Issue 2**: Decimal button (.) is now disabled when error is displayed
✅ **Issue 3**: Equals button (=) now resets calculator to "0" when error is displayed

All tests should pass with the current implementation.
