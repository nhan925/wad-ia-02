/**
 * Calculator utility functions
 */

/**
 * Rounds a number to a maximum of 15 decimal places
 * Removes trailing zeros and unnecessary decimal point
 */
export const roundNumber = (num) => {
  if (typeof num === 'string') return num;
  
  // Handle very large or very small numbers with scientific notation
  const absNum = Math.abs(num);
  if (absNum > 1e15 || (absNum < 1e-15 && absNum !== 0)) {
    return num.toExponential(14);
  }
  
  // Round to 15 decimal places
  const rounded = Math.round(num * 1e15) / 1e15;
  
  // Convert to string and remove trailing zeros
  let str = rounded.toString();
  if (str.includes('.')) {
    str = str.replace(/\.?0+$/, '');
  }
  
  return str;
};

/**
 * Format display value with rounding (15 decimal places max)
 */
export const formatDisplayValue = (value) => {
  // If it's an error message, return as is
  if (typeof value === 'string' && (value.includes('Cannot') || value.includes('Invalid'))) {
    return value;
  }
  
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  
  return roundNumber(num);
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
