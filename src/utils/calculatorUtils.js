/**
 * Calculator utility functions
 */
import Decimal from 'decimal.js';

// Configure Decimal.js for calculator precision
Decimal.set({ 
  precision: 50, // High precision for intermediate calculations
  rounding: Decimal.ROUND_HALF_UP
});

const MAXIMUM_VALUE = new Decimal('9999999999999999');

/**
 * Get maximum number length based on first digit
 */
export const getMaxLength = (value) => {
  const firstDigit = value[0] === '-' ? value[1] : value[0];
  return firstDigit === '0' ? 17 : 16;
};

/**
 * Format display value with rounding (16 for all, 17 if decimal and starts with 0)
 * Supports scientific notation for very large or very small numbers
 */
export const formatDisplayValue = (value, keepZeros = false) => {
  // If it's an error message, return as is
  if (typeof value === 'string' && (value.includes('Cannot') || value.includes('Invalid')) || (/^0\.0*$/.test(value) && keepZeros)) {
    return value;
  }

  try {
    const decimal = new Decimal(value);
    
    if (decimal.isZero()) {
      return '0';
    }
    
    const absValue = decimal.abs();
    
    let needsScientific = false;
    
    // Rule 1: Integer numbers greater than MAXIMUM_VALUE need scientific notation
    if (decimal.isInteger() && absValue.greaterThan(MAXIMUM_VALUE)) {
      needsScientific = true;
    }
    // Rule 2: Decimal numbers - check length first, then try formatting
    else if (!decimal.isInteger()) {
      const verySmallThreshold = new Decimal('0.0000000000000001');
      
      // Check if very small number
      if (absValue.lessThan(verySmallThreshold)) {
        needsScientific = true;
      } else {
        // Get the string representation of absValue
        const absValueStr = absValue.toString();
        const absValueDigits = absValueStr.replace('.', '');
        const absValueLength = absValueDigits.length;
        const maxAbsValueLength = getMaxLength(absValueStr);

        console.log({ absValueStr, absValueDigits, absValueLength, maxAbsValueLength });
        
        // First check: if absValue length is greater than max length
        if (absValueLength > maxAbsValueLength) {
          // Second check: try to format normally with toDecimalPlaces
          // Calculate how many decimal places we can have based on the integer part
          const integerPartLength = absValue.toFixed(0).length;
          const availableDecimalPlaces = maxAbsValueLength - integerPartLength;
          
          const formatted = absValue.toDecimalPlaces(availableDecimalPlaces, Decimal.ROUND_HALF_UP);
          const formattedStr = formatted.toString();

          console.log({ formattedStr });
          
          // Count digits in formatted result (excluding decimal point)
          const formattedDigits = formattedStr.replace('.', '');
          const formattedLength = formattedDigits.length;
          
          // Use scientific if: formatted length <= max length OR it ends with '0'
          if (formattedLength < maxAbsValueLength || formattedDigits.endsWith('0')) {
            needsScientific = true;
          }
        }
      }
    }

    if (needsScientific) {
      // Use scientific notation and remove trailing zeros
      let scientific = decimal.toExponential();
      
      const [mantissaPart, exponentPart] = scientific.split('e');

      // Count significant digits in mantissa (excluding sign and decimal point)
      const mantissaDigits = mantissaPart.replace('-', '').replace('.', '');
      const mantissaLength = mantissaDigits.length;
      const maxMantissaLength = getMaxLength(mantissaPart);

      if (mantissaLength > maxMantissaLength) {
        // Round mantissa to fit max length
        const decimalPlaces = maxMantissaLength - 1; // -1 for the leading digit
        const roundedMantissa = new Decimal(mantissaPart).toDecimalPlaces(decimalPlaces, Decimal.ROUND_HALF_UP);
        scientific = roundedMantissa.toString() + 'e' + exponentPart;
      }
      
      // Remove trailing zeros after decimal point in mantissa
      scientific = scientific.replace(/(\.\d*?)0+(e[+-]\d+)$/, '$1$2');
      // Remove decimal point if no digits after it
      scientific = scientific.replace(/\.(e[+-]\d+)$/, '$1');

      // Try convert back to Decimal to check length again
      const testDecimal = new Decimal(scientific);
      const testStr = testDecimal.toString();
      const testDigits = testStr.replace('.', '').replace('-', '');
      const maxTestLength = getMaxLength(testStr);

      if (testDigits.length <= maxTestLength) {
        scientific = testStr;
      }

      return scientific;
    }
    
    // For integer, use maximumSignificantDigits, for decimal, use maximumFractionDigits
    if (decimal.isInteger()) {
      return new Intl.NumberFormat('en-US', {
        maximumSignificantDigits: getMaxLength(value),
        useGrouping: true,
      }).format(value);
    } else {
      return new Intl.NumberFormat('en-US', {
        maximumFractionDigits: getMaxLength(value) - value.indexOf('.') - (value[0] === '-' ? 1 : 0),
      }).format(decimal.toNumber());
    }
  } catch (e) {
    return value;
  }
};

/**
 * Normalizes input to enforce maximum length constraints
 */
export const normalizeInput = (value) => {
  if (/^0\.0000000000000000.$/.test(value)) {
    return value.slice(0, -1);
  }

  const maxLength = getMaxLength(value);

  const cleanedValue = value.replace('-', '').replace(/^0+/, '').replace('.', '');

  if (cleanedValue.length <= maxLength) {
    return value;
  }
  else {
    return value.slice(0, maxLength + (value[0] === '-' ? 1 : 0) + (value.includes('.') ? 1 : 0));
  }
};

/**
 * Performs the calculation based on the operator using Decimal.js
 */
export const performOperation = (operator, prev, current) => {
  try {
    const prevNum = new Decimal(prev);
    const currNum = new Decimal(current);

    let result;
    switch (operator) {
      case '+':
        result = prevNum.plus(currNum);
        break;
      case '−':
        result = prevNum.minus(currNum);
        break;
      case '×':
        result = prevNum.times(currNum);
        break;
      case '÷':
        if (currNum.isZero()) {
          return 'Cannot divide by zero';
        }
        result = prevNum.dividedBy(currNum);
        break;
      default:
        return current;
    }

    return result.toString();
  } catch (e) {
    return 'Invalid input';
  }
};
