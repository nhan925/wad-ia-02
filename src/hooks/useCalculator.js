import { useState, useCallback } from 'react';
import { performOperation as calculate, normalizeInput as normalize, formatDisplayValue } from '../utils/calculatorUtils';
import Decimal from 'decimal.js';

/**
 * Custom hook for calculator logic
 */
export const useCalculator = () => {
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [historyExpression, setHistoryExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastOperation, setLastOperation] = useState(null);
  const [lastOperand, setLastOperand] = useState(null);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [hasError, setHasError] = useState(false);

  /**
   * Check if current value is an error message
   */
  const isErrorMessage = (value) => {
    return typeof value === 'string' && (value.includes('Cannot') || value.includes('Invalid'));
  };

  /**
   * Add calculation to history
   */
  const addToHistory = (expression, result) => {
    const newEntry = {
      id: Date.now(),
      expression,
      result,
      timestamp: new Date().toLocaleTimeString()
    };
    setCalculationHistory(prev => [newEntry, ...prev]);
  };

  /**
   * Clear all history
   */
  const clearHistory = () => {
    setCalculationHistory([]);
  };

  /**
   * Handles number input
   */
  const inputNumber = useCallback((num) => {
    // If there's an error, reset and start with the new number
    if (hasError) {
      setCurrentValue(String(num));
      setPreviousValue(null);
      setOperation(null);
      setHistoryExpression('');
      setWaitingForOperand(false);
      setLastOperation(null);
      setLastOperand(null);
      setHasError(false);
      return;
    }

    if (waitingForOperand) {
      setCurrentValue(String(num));
      setWaitingForOperand(false);
      // Clear history expression if we're starting a new number after a unary operation
      // This prevents showing "√(9)" when we've moved on to entering "5"
      if (historyExpression && !historyExpression.includes('=') && previousValue === null && operation === null) {
        setHistoryExpression('');
      }
    } else {
      setCurrentValue(normalize(currentValue === '0' ? String(num) : currentValue + num));
    }
  }, [currentValue, waitingForOperand, hasError, historyExpression, previousValue, operation]);

  /**
   * Handles decimal point input
   */
  const inputDecimal = useCallback(() => {
    // If there's an error, reset and start with 0.
    if (hasError) {
      setCurrentValue('0.');
      setPreviousValue(null);
      setOperation(null);
      setHistoryExpression('');
      setWaitingForOperand(false);
      setLastOperation(null);
      setLastOperand(null);
      setHasError(false);
      return;
    }

    if (waitingForOperand) {
      setCurrentValue('0.');
      setWaitingForOperand(false);
      // Clear history expression if we're starting a new number after a unary operation
      if (historyExpression && !historyExpression.includes('=') && previousValue === null && operation === null) {
        setHistoryExpression('');
      }
    } else if (currentValue.indexOf('.') === -1) {
      setCurrentValue(currentValue + '.');
    }
  }, [currentValue, waitingForOperand, hasError, historyExpression, previousValue, operation]);

  /**
   * Clears the current entry (CE)
   */
  const clearEntry = () => {
    setCurrentValue('0');
    if (hasError) {
      setHasError(false);
    }
  };

  /**
   * Clears all (C)
   */
  const clearAll = () => {
    setCurrentValue('0');
    setPreviousValue(null);
    setOperation(null);
    setHistoryExpression('');
    setWaitingForOperand(false);
    setLastOperation(null);
    setLastOperand(null);
    setHasError(false);
  };

  /**
   * Backspace function
   */
  const backspace = () => {
    // If there's an error, clear it
    if (hasError) {
      setCurrentValue('0');
      setPreviousValue(null);
      setOperation(null);
      setHistoryExpression('');
      setWaitingForOperand(false);
      setLastOperation(null);
      setLastOperand(null);
      setHasError(false);
      return;
    }

    // If we just completed a calculation (expression contains '='), clear the expression too
    if (historyExpression && historyExpression.includes('=')) {
      setCurrentValue('0');
      setHistoryExpression('');
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(false);
      setLastOperation(null);
      setLastOperand(null);
      return;
    }

    if (!waitingForOperand && currentValue.length > 1) {
      setCurrentValue(currentValue.slice(0, -1));
    } else {
      setCurrentValue('0');
    }
  };

  /**
   * Toggles the sign of the current value
   */
  const toggleSign = () => {
    // Cannot perform operation on error
    if (hasError) {
      return;
    }

    if (currentValue !== '0') {
      const newValue = currentValue.charAt(0) === '-' 
        ? currentValue.slice(1) 
        : '-' + currentValue;
      
      setCurrentValue(newValue);
      
      // Only update expression if there's an existing unary operation
      // Check if there's an existing expression to nest
      let expression;
      if (previousValue !== null && operation) {
        // We're in the middle of a calculation (e.g., "√(4) + " and now pressing +/- on second operand)
        // Find the operator position to preserve everything before it
        const operatorIndex = historyExpression ? historyExpression.lastIndexOf(operation) : -1;
        
        if (operatorIndex !== -1) {
          // Extract the first operand (with any unary operations) up to and including the operator
          const firstPartWithOperator = historyExpression.substring(0, operatorIndex + operation.length);
          
          // Check if there's already a unary expression for the second operand after the operator
          const afterOperator = historyExpression.substring(operatorIndex + operation.length).trim();
          if (afterOperator) {
            // Nest the existing second operand unary expression
            expression = `${firstPartWithOperator} negate(${afterOperator})`;
            setHistoryExpression(expression);
            setWaitingForOperand(true);
          }
          // If no afterOperator, it's just a plain number - don't create negate() expression
        }
      } else if (historyExpression && !historyExpression.includes('=')) {
        // There's an existing unary expression, nest it
        expression = `negate(${historyExpression.trim()})`;
        setHistoryExpression(expression);
        setWaitingForOperand(true);
      }
      // If it's just a plain number (no unary operation), just toggle the sign without updating expression
    }
  };

  /**
   * Calculates square root using Decimal.js
   */
  const squareRoot = () => {
    // Cannot perform operation on error
    if (hasError) {
      return;
    }

    try {
      const value = new Decimal(currentValue);
      if (value.isNegative()) {
        setCurrentValue('Invalid input');
        setHasError(true);
        return;
      }
      const result = value.sqrt();
      
      // Check if there's an existing expression to nest
      let expression;
      if (previousValue !== null && operation) {
        // We're in the middle of a calculation (e.g., "√(4) + " and now pressing sqrt on second operand)
        // Find the operator position to preserve everything before it
        const operatorIndex = historyExpression ? historyExpression.lastIndexOf(operation) : -1;
        
        if (operatorIndex !== -1) {
          // Extract the first operand (with any unary operations) up to and including the operator
          const firstPartWithOperator = historyExpression.substring(0, operatorIndex + operation.length);
          
          // Check if there's already a unary expression for the second operand after the operator
          const afterOperator = historyExpression.substring(operatorIndex + operation.length).trim();
          if (afterOperator) {
            // Nest the existing second operand unary expression
            expression = `${firstPartWithOperator} √(${afterOperator})`;
          } else {
            // No existing unary expression on second operand, create one
            expression = `${firstPartWithOperator} √(${formatDisplayValue(currentValue)})`;
          }
        } else {
          // Fallback: no operator found in history, build fresh
          expression = `${formatDisplayValue(previousValue)} ${operation} √(${formatDisplayValue(currentValue)})`;
        }
      } else if (historyExpression && !historyExpression.includes('=')) {
        // There's an existing unary expression, nest it
        expression = `√(${historyExpression.trim()})`;
      } else {
        expression = `√(${formatDisplayValue(currentValue)})`;
      }
      
      setCurrentValue(result.toString());
      setHistoryExpression(expression);
      setWaitingForOperand(true);
    } catch (e) {
      setCurrentValue('Invalid input');
      setHasError(true);
    }
  };

  /**
   * Handles percentage calculation using Decimal.js
   */
  const handlePercentage = () => {
    // Cannot perform operation on error
    if (hasError) {
      return;
    }

    try {
      const current = new Decimal(currentValue);
      
      if (previousValue !== null && operation) {
        let result;
        const previous = new Decimal(previousValue);
        
        switch (operation) {
          case '+':
          case '−':
            result = previous.times(current).dividedBy(100);
            break;
          case '×':
          case '÷':
            result = current.dividedBy(100);
            break;
          default:
            result = current.dividedBy(100);
        }
        
        setCurrentValue(result.toString());
        setHistoryExpression(`${formatDisplayValue(previousValue)} ${operation} ${formatDisplayValue(result.toString())}`);
      } else {
        const result = current.dividedBy(100);
        setCurrentValue(result.toString());
      }
      
      setWaitingForOperand(true);
    } catch (e) {
      setCurrentValue('Invalid input');
      setHasError(true);
    }
  };

  /**
   * Handles operator input
   */
  const handleOperator = useCallback((nextOperator) => {
    // Cannot perform operation on error
    if (hasError) {
      return;
    }

    try {
      new Decimal(currentValue); // Validate current value

      if (previousValue === null) {
        setPreviousValue(currentValue);
        // Check if there's an existing unary expression (sqrt, sqr, 1/x) to keep
        const expression = historyExpression && !historyExpression.includes('=')
          ? `${historyExpression} ${nextOperator}`
          : `${formatDisplayValue(currentValue)} ${nextOperator}`;
        setHistoryExpression(expression);
      } else if (operation && !waitingForOperand) {
        const result = calculate(operation, previousValue, currentValue);
        
        if (typeof result === 'string' && (result.includes('Cannot') || result.includes('Invalid'))) {
          setCurrentValue(result);
          setPreviousValue(null);
          setOperation(null);
          setHistoryExpression('');
          setHasError(true);
          return;
        }
        
        const newValue = String(result);
        setCurrentValue(newValue);
        setPreviousValue(newValue);
        
        // When chaining operations, check if the second operand has a unary expression
        // Extract the second operand part from the history expression
        const operatorIndex = historyExpression ? historyExpression.lastIndexOf(operation) : -1;
        let expression;
        
        if (operatorIndex !== -1 && historyExpression && !historyExpression.includes('=')) {
          // Check if there's content after the operator (unary operations on second operand)
          const afterOperator = historyExpression.substring(operatorIndex + operation.length).trim();
          if (afterOperator) {
            // There's a unary operation on the second operand, use it in the expression
            expression = `${formatDisplayValue(newValue)} ${nextOperator}`;
          } else {
            // No unary operation, just use the result
            expression = `${formatDisplayValue(newValue)} ${nextOperator}`;
          }
        } else {
          // No history expression or doesn't contain the operator, just use the result
          expression = `${formatDisplayValue(newValue)} ${nextOperator}`;
        }
        
        setHistoryExpression(expression);
      } else if (waitingForOperand) {
        // Operator pressed again while waiting for operand - replace the operator
        // Remove the last operator from the expression and append the new one
        if (historyExpression && !historyExpression.includes('=')) {
          // Find and remove the last operator
          const trimmedExpression = historyExpression.trim();
          const lastChar = trimmedExpression[trimmedExpression.length - 1];
          
          // Check if the last character is an operator
          if (['+', '−', '×', '÷'].includes(lastChar)) {
            const expression = trimmedExpression.slice(0, -1).trim() + ' ' + nextOperator;
            setHistoryExpression(expression);
          } else {
            // Shouldn't happen, but fallback to appending
            setHistoryExpression(`${historyExpression} ${nextOperator}`);
          }
        }
      } else {
        // Keep the existing expression if it has unary operations
        const expression = historyExpression && !historyExpression.includes('=')
          ? `${historyExpression} ${nextOperator}`
          : `${formatDisplayValue(previousValue)} ${nextOperator}`;
        setHistoryExpression(expression);
      }

      setWaitingForOperand(true);
      setOperation(nextOperator);
    } catch (e) {
      setCurrentValue('Invalid input');
      setHasError(true);
    }
  }, [currentValue, operation, previousValue, waitingForOperand, historyExpression, hasError]);

  /**
   * Handles equals operation
   */
  const handleEquals = () => {
    // If there's an error, reset calculator to "0"
    if (hasError) {
      setCurrentValue('0');
      setPreviousValue(null);
      setOperation(null);
      setHistoryExpression('');
      setWaitingForOperand(false);
      setLastOperation(null);
      setLastOperand(null);
      setHasError(false);
      return;
    }

    try {
      new Decimal(currentValue); // Validate current value

      // Case 1: Repeat last operation (pressing = again after a calculation)
      if (waitingForOperand && lastOperation && lastOperand !== null) {
        const result = calculate(lastOperation, currentValue, lastOperand);
        
        if (typeof result === 'string' && (result.includes('Cannot') || result.includes('Invalid'))) {
          setCurrentValue(result);
          setHistoryExpression('');
          setHasError(true);
          return;
        }

        const expression = `${formatDisplayValue(currentValue)} ${lastOperation} ${formatDisplayValue(lastOperand)} =`;
        setCurrentValue(String(result));
        setHistoryExpression(expression);
        addToHistory(expression, formatDisplayValue(String(result)));
        return;
      }

      // Case 2: No binary operation pending (just = pressed, or after unary operation)
      if (previousValue === null || operation === null) {
        // If there's an expression (like sqrt, sqr, 1/x), keep it
        const expression = historyExpression && !historyExpression.includes('=') 
          ? `${historyExpression} =`
          : `${formatDisplayValue(currentValue)} =`;
        setHistoryExpression(expression);
        addToHistory(expression, formatDisplayValue(currentValue));
        setWaitingForOperand(true);
        setLastOperation(null);
        setLastOperand(currentValue);
        return;
      }

      // Case 3: Complete a binary operation
      const result = calculate(operation, previousValue, currentValue);
      
      if (typeof result === 'string' && (result.includes('Cannot') || result.includes('Invalid'))) {
        setCurrentValue(result);
        setPreviousValue(null);
        setOperation(null);
        setHistoryExpression('');
        setHasError(true);
        return;
      }

      // Build expression, keeping unary operations if they exist
      let expression;
      
      // Check if historyExpression has a complete expression (operator + second operand)
      // The expression is complete if:
      // 1. It exists and doesn't have '='
      // 2. It contains the operator
      // 3. It has content after the operator (not just "5 + " but "5 + 3" or "5 + √(4)")
      const operatorIndex = historyExpression ? historyExpression.lastIndexOf(operation) : -1;
      const hasContentAfterOperator = operatorIndex !== -1 && 
                                       historyExpression.substring(operatorIndex + operation.length).trim().length > 0;
      
      const hasCompleteExpression = historyExpression && 
                                    !historyExpression.includes('=') &&
                                    hasContentAfterOperator;
      
      if (hasCompleteExpression) {
        // Expression already built with unary operations, just add equals
        expression = `${historyExpression} =`;
      } else if (historyExpression && !historyExpression.includes('=') && operatorIndex !== -1) {
        // Expression has first operand (possibly with unary) and operator, but missing second operand
        // Keep the part before and including the operator, then add the second operand
        const firstPartWithOperator = historyExpression.substring(0, operatorIndex + operation.length);
        expression = `${firstPartWithOperator} ${formatDisplayValue(currentValue)} =`;
      } else {
        // Build expression from scratch (no historyExpression context)
        expression = `${formatDisplayValue(previousValue)} ${operation} ${formatDisplayValue(currentValue)} =`;
      }
      
      setLastOperation(operation);
      setLastOperand(currentValue);
      setCurrentValue(String(result));
      setHistoryExpression(expression);
      addToHistory(expression, formatDisplayValue(String(result)));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    } catch (e) {
      setCurrentValue('Invalid input');
      setHasError(true);
    }
  };

  /**
   * Handle square calculation using Decimal.js
   */
  const handleSquare = () => {
    // Cannot perform operation on error
    if (hasError) {
      return;
    }

    try {
      const value = new Decimal(currentValue);
      const result = value.times(value);
      
      // Check if there's an existing expression to nest
      let expression;
      if (previousValue !== null && operation) {
        // We're in the middle of a calculation (e.g., "√(4) + " and now pressing sqr on second operand)
        // Find the operator position to preserve everything before it
        const operatorIndex = historyExpression ? historyExpression.lastIndexOf(operation) : -1;
        
        if (operatorIndex !== -1) {
          // Extract the first operand (with any unary operations) up to and including the operator
          const firstPartWithOperator = historyExpression.substring(0, operatorIndex + operation.length);
          
          // Check if there's already a unary expression for the second operand after the operator
          const afterOperator = historyExpression.substring(operatorIndex + operation.length).trim();
          if (afterOperator) {
            // Nest the existing second operand unary expression
            expression = `${firstPartWithOperator} sqr(${afterOperator})`;
          } else {
            // No existing unary expression on second operand, create one
            expression = `${firstPartWithOperator} sqr(${formatDisplayValue(currentValue)})`;
          }
        } else {
          // Fallback: no operator found in history, build fresh
          expression = `${formatDisplayValue(previousValue)} ${operation} sqr(${formatDisplayValue(currentValue)})`;
        }
      } else if (historyExpression && !historyExpression.includes('=')) {
        // There's an existing unary expression, nest it
        expression = `sqr(${historyExpression.trim()})`;
      } else {
        expression = `sqr(${formatDisplayValue(currentValue)})`;
      }
      
      setCurrentValue(result.toString());
      setHistoryExpression(expression);
      setWaitingForOperand(true);
    } catch (e) {
      setCurrentValue('Invalid input');
      setHasError(true);
    }
  };

  /**
   * Handle reciprocal calculation using Decimal.js
   */
  const handleReciprocal = () => {
    // Cannot perform operation on error
    if (hasError) {
      return;
    }

    try {
      const value = new Decimal(currentValue);
      if (value.isZero()) {
        setCurrentValue('Cannot divide by zero');
        setHasError(true);
        return;
      }
      const result = new Decimal(1).dividedBy(value);
      
      // Check if there's an existing expression to nest
      let expression;
      if (previousValue !== null && operation) {
        // We're in the middle of a calculation (e.g., "√(4) + " and now pressing 1/x on second operand)
        // Find the operator position to preserve everything before it
        const operatorIndex = historyExpression ? historyExpression.lastIndexOf(operation) : -1;
        
        if (operatorIndex !== -1) {
          // Extract the first operand (with any unary operations) up to and including the operator
          const firstPartWithOperator = historyExpression.substring(0, operatorIndex + operation.length);
          
          // Check if there's already a unary expression for the second operand after the operator
          const afterOperator = historyExpression.substring(operatorIndex + operation.length).trim();
          if (afterOperator) {
            // Nest the existing second operand unary expression
            expression = `${firstPartWithOperator} 1/(${afterOperator})`;
          } else {
            // No existing unary expression on second operand, create one
            expression = `${firstPartWithOperator} 1/(${formatDisplayValue(currentValue)})`;
          }
        } else {
          // Fallback: no operator found in history, build fresh
          expression = `${formatDisplayValue(previousValue)} ${operation} 1/(${formatDisplayValue(currentValue)})`;
        }
      } else if (historyExpression && !historyExpression.includes('=')) {
        // There's an existing unary expression, nest it
        expression = `1/(${historyExpression.trim()})`;
      } else {
        expression = `1/(${formatDisplayValue(currentValue)})`;
      }
      
      setCurrentValue(result.toString());
      setHistoryExpression(expression);
      setWaitingForOperand(true);
    } catch (e) {
      setCurrentValue('Invalid input');
      setHasError(true);
    }
  };

  /**
   * Load history item value
   */
  const loadHistoryValue = (value, expression) => {
    // Parse the formatted value to get the raw number
    // Remove commas and convert to a valid number format
    try {
      const cleanValue = String(value).replace(/,/g, '');
      // Validate that it's a valid number
      new Decimal(cleanValue);
      setCurrentValue(cleanValue);
      setHistoryExpression(expression);
      setWaitingForOperand(true);
    } catch (e) {
      // If parsing fails, just use the value as-is
      setCurrentValue(String(value));
      setHistoryExpression(expression);
      setWaitingForOperand(true);
    }
  };

  return {
    currentValue,
    setCurrentValue,
    historyExpression,
    calculationHistory,
    waitingForOperand,
    setWaitingForOperand,
    hasError,
    inputNumber,
    inputDecimal,
    clearEntry,
    clearAll,
    backspace,
    toggleSign,
    squareRoot,
    handlePercentage,
    handleOperator,
    handleEquals,
    handleSquare,
    handleReciprocal,
    clearHistory,
    loadHistoryValue
  };
};
