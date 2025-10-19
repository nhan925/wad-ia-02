# 🧰 Functional Specifications

## Purpose and Scope

This calculator application replicates the Windows 11 Calculator in Basic Mode, providing a familiar and intuitive user experience for performing standard arithmetic operations. The calculator is designed as a web-based application built with React and styled with TailwindCSS, offering both desktop and mobile accessibility.

### Scope
- **In Scope**: Basic arithmetic operations, memory functions, history tracking, and theme customization
- **Out of Scope**: Scientific calculations, programmer mode, graphing functions, and unit conversions

## Supported Features

### Core Arithmetic Operations
1. **Addition (+)** - Add two or more numbers
2. **Subtraction (−)** - Subtract numbers
3. **Multiplication (×)** - Multiply numbers
4. **Division (÷)** - Divide numbers with error handling for division by zero

### Advanced Operations
5. **Percentage (%)** - Calculate percentage of current value
6. **Square Root (√)** - Calculate square root of a number
7. **Square (x²)** - Calculate square of a number
8. **Reciprocal (1/x)** - Calculate reciprocal of a number
9. **Toggle Sign (±)** - Change sign of current number

### Input Controls
10. **Number Input (0-9)** - Numeric input buttons
11. **Decimal Point (.)** - Support for decimal numbers
12. **Clear Entry (CE)** - Clear current input only
13. **Clear All (C)** - Reset calculator to initial state
14. **Backspace (⌫)** - Delete last character from current input

### Memory Functions
15. **Memory Clear (MC)** - Clear stored memory value
16. **Memory Recall (MR)** - Retrieve value from memory
17. **Memory Add (M+)** - Add current value to memory
18. **Memory Subtract (M−)** - Subtract current value from memory
19. **Memory Store (MS)** - Store current value in memory

### Additional Features
20. **History Tracking** - View and reuse previous calculations
21. **Theme Toggle** - Switch between dark and light modes
22. **Keyboard Support** - Full keyboard input support
23. **Responsive Design** - Adaptive layout for mobile and desktop

## User Input Handling

### Number Input
- **Direct Input**: Users can click number buttons (0-9) or use keyboard
- **Decimal Numbers**: Support for floating-point numbers with single decimal point
- **Input Validation**: Prevents multiple decimal points in a single number
- **Maximum Length**: Display accommodates up to 16 digits
- **Leading Zeros**: Automatically handled (e.g., 0.5 displays correctly)

### Operator Input
- **Sequential Operations**: Supports chaining operations (e.g., 2 + 3 + 4)
- **Operator Replacement**: Pressing a new operator replaces the previous one
- **Implicit Calculation**: Pressing an operator completes the previous operation
- **Equals Behavior**: Pressing '=' completes the current operation
- **Repeat Last Operation**: Pressing '=' multiple times repeats the last operation

### Display Updates
- **Primary Display**: Shows current input or result (up to 16 digits)
- **Expression Display**: Shows the ongoing calculation expression
- **Format**: Numbers formatted with proper thousands separators for readability
- **Overflow Handling**: Scientific notation for very large numbers
- **Error Messages**: Display "Cannot divide by zero" for invalid operations

## Calculation Logic

### Operator Precedence
The calculator follows a **left-to-right evaluation** model similar to Windows 11 Calculator Basic Mode:
- No mathematical operator precedence (2 + 3 × 4 = 20, not 14)
- Operations are evaluated as they are entered
- Parentheses are not supported in Basic Mode

### Special Operation Behaviors

#### Percentage (%)
- When used after a number: converts to percentage (50% = 0.5)
- When used in operation: calculates percentage of operand
- Example: 200 + 10% = 220 (adds 10% of 200)

#### Square Root (√)
- Calculates immediately on current value
- Negative numbers result in "Invalid input" error
- Result becomes the new current value

#### Square (x²)
- Calculates immediately on current value
- Result becomes the new current value
- Can be chained multiple times

#### Reciprocal (1/x)
- Calculates immediately on current value
- Division by zero shows error message
- Result becomes the new current value

### Memory Operations
- **Memory Storage**: Stores a single value persistently
- **Memory Indicator**: Visual indicator shows when memory contains a value
- **Memory Persistence**: Memory value persists until explicitly cleared or page reload
- **Memory Operations**: All memory operations work with the current display value

## Assumptions and Constraints

### Rounding and Precision
- **Decimal Precision**: Calculations maintain up to 15 decimal places
- **Display Rounding**: Display shows up to 16 significant digits
- **Floating Point**: Uses JavaScript's number type (IEEE 754 double precision)
- **Rounding Method**: Uses Decimal.js library for precise decimal arithmetic

### Input Constraints
- **Maximum Input Length**: 16 digits (excluding decimal point)
- **Number Range**: ±1.7976931348623157e+308 (JavaScript MAX_VALUE)
- **Minimum Positive**: 5e-324 (JavaScript MIN_VALUE)
- **Scientific Notation**: Automatically applied for numbers outside display range

### Error Handling
- **Division by Zero**: Displays error message and prevents calculation
- **Invalid Operations**: Square root of negative numbers shows error
- **Overflow**: Very large results shown in scientific notation
- **Underflow**: Very small results rounded to 0

### Operator Order
- **No Precedence**: Operators evaluated left-to-right as entered
- **Sequential Evaluation**: Each operator immediately evaluates the previous operation
- **State Management**: Calculator maintains current value, pending operation, and operand

## User Experience Features

### Visual Feedback
- **Button Hover**: Visual feedback on button hover
- **Button Press**: Scale animation on button click
- **Active States**: Clear indication of button interaction
- **Error Display**: Red text for error messages

### Keyboard Support
- **Numbers**: 0-9 keys for numeric input
- **Operators**: +, -, *, / keys for operations
- **Special Keys**:
  - Enter or = for equals
  - Backspace for delete
  - Escape for Clear All
  - Delete for Clear Entry
  - % for percentage

### History and Memory
- **History Panel**: Slide-out panel showing calculation history
- **History Interaction**: Click history item to reuse value
- **Memory Panel**: Tab-based view for memory operations
- **Clear History**: Button to clear all calculation history

### Responsive Design
- **Mobile View**: Optimized layout for touch screens
- **Desktop View**: Side-by-side calculator and history
- **Modal History**: Full-screen modal for history on mobile
- **Adaptive Text**: Responsive text sizing for different screen sizes

## Accessibility Considerations

- **Keyboard Navigation**: Full keyboard support for all operations
- **Visual Contrast**: High contrast between text and backgrounds
- **Touch Targets**: Minimum 44x44px touch targets for mobile
- **Screen Reader Support**: Semantic HTML with proper ARIA labels
- **Focus Indicators**: Clear focus states for keyboard navigation
