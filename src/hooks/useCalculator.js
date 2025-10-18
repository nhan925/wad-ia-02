import { useState, useCallback } from 'react';
import { performOperation as calculate, normalizeInput as normalize, formatDisplayValue } from '../utils/calculatorUtils';

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
    if (waitingForOperand) {
      setCurrentValue(String(num));
      setWaitingForOperand(false);
    } else {
      setCurrentValue(normalize(currentValue === '0' ? String(num) : currentValue + num));
    }
  }, [currentValue, waitingForOperand]);

  /**
   * Handles decimal point input
   */
  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setCurrentValue('0.');
      setWaitingForOperand(false);
    } else if (currentValue.indexOf('.') === -1) {
      setCurrentValue(currentValue + '.');
    }
  }, [currentValue, waitingForOperand]);

  /**
   * Clears the current entry (CE)
   */
  const clearEntry = () => {
    setCurrentValue('0');
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
  };

  /**
   * Backspace function
   */
  const backspace = () => {
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
    if (currentValue !== '0') {
      setCurrentValue(
        currentValue.charAt(0) === '-' 
          ? currentValue.slice(1) 
          : '-' + currentValue
      );
    }
  };

  /**
   * Calculates square root
   */
  const squareRoot = () => {
    const value = parseFloat(currentValue);
    if (value < 0) {
      setCurrentValue('Invalid input');
      return;
    }
    const result = Math.sqrt(value);
    const expression = `√(${formatDisplayValue(value)})`;
    setCurrentValue(String(result));
    setHistoryExpression(expression);
    setWaitingForOperand(true);
  };

  /**
   * Handles percentage calculation
   */
  const handlePercentage = () => {
    const current = parseFloat(currentValue);
    
    if (previousValue !== null && operation) {
      let result;
      const previous = parseFloat(previousValue);
      
      switch (operation) {
        case '+':
        case '−':
          result = (previous * current) / 100;
          break;
        case '×':
        case '÷':
          result = current / 100;
          break;
        default:
          result = current / 100;
      }
      
      setCurrentValue(String(result));
      setHistoryExpression(`${formatDisplayValue(previousValue)} ${operation} ${formatDisplayValue(result)}`);
    } else {
      const result = current / 100;
      setCurrentValue(String(result));
    }
    
    setWaitingForOperand(true);
  };

  /**
   * Handles operator input
   */
  const handleOperator = useCallback((nextOperator) => {
    const inputValue = parseFloat(currentValue);

    if (previousValue === null) {
      setPreviousValue(currentValue);
      setHistoryExpression(`${formatDisplayValue(currentValue)} ${nextOperator}`);
    } else if (operation && !waitingForOperand) {
      const result = calculate(operation, previousValue, currentValue);
      
      if (typeof result === 'string') {
        setCurrentValue(result);
        setPreviousValue(null);
        setOperation(null);
        setHistoryExpression('');
        return;
      }
      
      const newValue = String(result);
      setCurrentValue(newValue);
      setPreviousValue(newValue);
      setHistoryExpression(`${formatDisplayValue(newValue)} ${nextOperator}`);
    } else {
      setHistoryExpression(`${formatDisplayValue(previousValue)} ${nextOperator}`);
    }

    setWaitingForOperand(true);
    setOperation(nextOperator);
  }, [currentValue, operation, previousValue, waitingForOperand]);

  /**
   * Handles equals operation
   */
  const handleEquals = () => {
    const inputValue = parseFloat(currentValue);

    if (waitingForOperand && lastOperation && lastOperand !== null) {
      const result = calculate(lastOperation, currentValue, lastOperand);
      
      if (typeof result === 'string') {
        setCurrentValue(result);
        setHistoryExpression('');
        return;
      }

      const expression = `${formatDisplayValue(currentValue)} ${lastOperation} ${formatDisplayValue(lastOperand)} =`;
      setCurrentValue(String(result));
      setHistoryExpression(expression);
      addToHistory(expression, String(result));
      return;
    }

    if (previousValue === null || operation === null) {
      setHistoryExpression(`${formatDisplayValue(currentValue)} =`);
      return;
    }

    const result = calculate(operation, previousValue, currentValue);
    
    if (typeof result === 'string') {
      setCurrentValue(result);
      setPreviousValue(null);
      setOperation(null);
      setHistoryExpression('');
      return;
    }

    const expression = `${formatDisplayValue(previousValue)} ${operation} ${formatDisplayValue(currentValue)} =`;
    setLastOperation(operation);
    setLastOperand(currentValue);
    setCurrentValue(String(result));
    setHistoryExpression(expression);
    addToHistory(expression, String(result));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  /**
   * Handle square calculation
   */
  const handleSquare = () => {
    const value = parseFloat(currentValue);
    const result = value * value;
    const expression = `sqr(${formatDisplayValue(value)})`;
    setCurrentValue(String(result));
    setHistoryExpression(expression);
    setWaitingForOperand(true);
  };

  /**
   * Handle reciprocal calculation
   */
  const handleReciprocal = () => {
    const value = parseFloat(currentValue);
    if (value === 0) {
      setCurrentValue('Cannot divide by zero');
      return;
    }
    const result = 1 / value;
    const expression = `1/(${formatDisplayValue(value)})`;
    setCurrentValue(String(result));
    setHistoryExpression(expression);
    setWaitingForOperand(true);
  };

  /**
   * Load history item value
   */
  const loadHistoryValue = (value) => {
    setCurrentValue(value);
    setWaitingForOperand(true);
  };

  return {
    currentValue,
    setCurrentValue,
    historyExpression,
    calculationHistory,
    waitingForOperand,
    setWaitingForOperand,
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
