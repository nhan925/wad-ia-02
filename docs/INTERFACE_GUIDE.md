# Calculator Interface Guide

## Visual Layout

```
┌─────────────────────────────────────────┐
│  🖩 Calculator                          │  ← Header
├─────────────────────────────────────────┤
│                                         │
│                        5 + 3 -          │  ← History Display
│                                     8   │  ← Main Display
│                                         │
├─────────────────────────────────────────┤
│  MC    MR    M+    M−    MS            │  ← Memory (disabled)
├─────────────────────────────────────────┤
│                                         │
│   %      CE      C      ⌫              │  ← Row 1: Special
│                                         │
│  ¹⁄ₓ     x²      √      ÷              │  ← Row 2: Functions
│                                         │
│   7      8       9      ×              │  ← Row 3: Numbers
│                                         │
│   4      5       6      −              │  ← Row 4: Numbers
│                                         │
│   1      2       3      +              │  ← Row 5: Numbers
│                                         │
│   ±      0       .      =              │  ← Row 6: Numbers
│                                         │
└─────────────────────────────────────────┘
```

## Button Functions

### Row 1: Special Functions
- **%** - Percentage (context-aware)
- **CE** - Clear Entry (current number only)
- **C** - Clear All (reset calculator)
- **⌫** - Backspace (delete last digit)

### Row 2: Mathematical Functions
- **¹⁄ₓ** - Reciprocal (1/x)
- **x²** - Square
- **√** - Square Root
- **÷** - Division

### Rows 3-5: Number Grid + Operators
- **7, 8, 9** + **×** Multiplication
- **4, 5, 6** + **−** Subtraction
- **1, 2, 3** + **+** Addition

### Row 6: Bottom Row
- **±** - Toggle Sign
- **0** - Zero
- **.** - Decimal Point
- **=** - Equals (evaluate)

## Color Coding

### Dark Theme (Default)
- **Background**: Dark gray (rgba(32, 32, 32, 0.95))
- **Number Buttons**: Medium gray (rgba(60, 60, 60, 0.8))
- **Function Buttons**: Dark gray (rgba(50, 50, 50, 0.8))
- **Operator Buttons**: Light gray (rgba(70, 70, 70, 0.8))
- **Equals Button**: Blue gradient (#0078d4 to #0063b1)
- **Text**: White (#ffffff)

### Light Theme (System Preference)
- **Background**: Light gray (rgba(243, 243, 243, 0.95))
- **Buttons**: White/Light variations
- **Text**: Dark (#1a1a1a)

## Display Behavior

### History Display (Top)
- Shows operation sequence: `5 + 3 -`
- Updates as operations are entered
- Shows final equation on equals: `5 + 3 =`
- Gray text, smaller font

### Main Display (Bottom)
- Shows current number or result
- Large white text (48px)
- Scrollable for long numbers
- Updates immediately on input

## Interaction States

### Hover
- Button brightens slightly
- Smooth transition (0.15s)
- Desktop only

### Active (Click/Press)
- Button scales down (0.95)
- Darker shade
- Instant feedback

### Focus (Keyboard)
- Outline for accessibility
- Keyboard navigation support

## Responsive Breakpoints

### Mobile (320px - 480px)
- Smaller buttons (20px padding)
- Reduced font sizes
- Full width layout

### Tablet (481px - 768px)
- Medium buttons (24px padding)
- Comfortable spacing

### Desktop (769px+)
- Large buttons (28px padding)
- Hover effects enabled
- Maximum width: 420px
- Centered on screen

## Keyboard Shortcuts Reference

| Key | Function | Visual Button |
|-----|----------|--------------|
| `0-9` | Numbers | Number buttons |
| `.` or `,` | Decimal | `.` button |
| `+` | Addition | `+` button |
| `-` | Subtraction | `−` button |
| `*` | Multiplication | `×` button |
| `/` | Division | `÷` button |
| `=` or `Enter` | Equals | `=` button |
| `%` | Percentage | `%` button |
| `Backspace` | Delete digit | `⌫` button |
| `Delete` | Clear Entry | `CE` button |
| `Escape` | Clear All | `C` button |

## Example Operations

### Simple Addition
```
Input:  [2] [+] [3] [=]
History: 2 +
Display: 2 → 3 → 5
```

### Sequential Operations
```
Input:  [1][0] [÷] [2] [×] [3] [=]
History: 10 ÷ → 10 ÷ 2 × → 5 × 3 =
Display: 10 → 2 → 3 → 15
```

### Percentage
```
Input:  [2][0][0] [-] [1][0] [%] [=]
History: 200 −
Display: 200 → 10 → 20 → 180
```

### Square Root
```
Input:  [1][6] [√]
History: √(16)
Display: 16 → 4
```

### Clear Entry vs Clear
```
CE:  [5] [+] [9] [CE] [4] [=]
     Result: 9 (current entry cleared, operation kept)

C:   [5] [+] [9] [C] [4] [=]
     Result: 4 (everything reset)
```

## Accessibility Features

### Keyboard Navigation
- ✅ All functions accessible via keyboard
- ✅ Tab navigation (if implemented)
- ✅ Clear focus indicators

### Screen Readers
- ✅ Semantic HTML structure
- ✅ Meaningful button labels
- ✅ ARIA labels (if needed)

### Visual Accessibility
- ✅ High contrast mode support
- ✅ Large touch targets (44×44px minimum)
- ✅ Clear visual feedback

### Motion Preferences
- ✅ Respects `prefers-reduced-motion`
- ✅ Can disable animations

## Error Messages

### Division by Zero
```
Display: "Cannot divide by zero"
Recovery: Press any number to reset
```

### Invalid Input
```
Display: "Invalid input"
Example: Square root of negative number
Recovery: Press any number to reset
```

## Tips for Best Experience

1. **Desktop**: Use keyboard shortcuts for faster input
2. **Mobile**: Buttons are optimized for touch
3. **Long Numbers**: Display scrolls horizontally
4. **Chained Operations**: Results calculated left-to-right
5. **Repeated Equals**: Press = multiple times to repeat last operation

---

**Enjoy your calculator!** 🎉
