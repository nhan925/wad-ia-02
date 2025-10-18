/**
 * Calculator utility functions
 */


/**
 * Get maximum number length based on first digit
 */
export const getMaxLength = (value) => {
  const firstDigit = value[0] === '-' ? value[1] : value[0];
  return firstDigit === '0' ? 17 : 16;
};

/**
 * Format display value with rounding (16 for all, 17 if decimal and starts with 0)
 */
export const formatDisplayValue = (value) => {
  // If it's an error message, return as is
  if (typeof value === 'string' && (value.includes('Cannot') || value.includes('Invalid'))) {
    return value;
  }

  const num = parseFloat(value);
  if (isNaN(num)) return value;

  return new Intl.NumberFormat(navigator.language, {
    maximumSignificantDigits: getMaxLength(value),
    useGrouping: true,
  }).format(num);
};

/**
 * Normalizes input to enforce maximum length constraints
 */
export const normalizeInput = (value) => {
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
 * Performs the calculation based on the operator
 */
export const performOperation = (operator, prev, current) => {
  const prevNum = parseFloat(prev);
  const currNum = parseFloat(current);

  if (isNaN(prevNum) || isNaN(currNum)) return current;

  let result;
  switch (operator) {
    case '+':
      result = prevNum + currNum;
      break;
    case '−':
      result = prevNum - currNum;
      break;
    case '×':
      result = prevNum * currNum;
      break;
    case '÷':
      if (currNum === 0) {
        return 'Cannot divide by zero';
      }
      result = prevNum / currNum;
      break;
    default:
      return current;
  }

  return result;
};
