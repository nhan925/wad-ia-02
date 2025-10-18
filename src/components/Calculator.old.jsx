import { useState, useEffect, useCallback } from 'react';

/**
 * Rounds a number to a maximum of 15 decimal places
 * Removes trailing zeros and unnecessary decimal point
 */
const roundNumber = (num) => {
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
 * Calculator Component with Tailwind CSS
 * Replicates the Windows 11 Calculator Basic Mode functionality with history
 */
const Calculator = () => {
  // State management
  const [currentValue, setCurrentValue] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [historyExpression, setHistoryExpression] = useState('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastOperation, setLastOperation] = useState(null);
  const [lastOperand, setLastOperand] = useState(null);
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  /**
   * Format display value with rounding (15 decimal places max)
   */
  const formatDisplayValue = (value) => {
    // If it's an error message, return as is
    if (typeof value === 'string' && (value.includes('Cannot') || value.includes('Invalid'))) {
      return value;
    }
    
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    
    return roundNumber(num);
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
    if (waitingForOperand) {
      setCurrentValue(String(num));
      setWaitingForOperand(false);
    } else {
      setCurrentValue(currentValue === '0' ? String(num) : currentValue + num);
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
    const expression = `√(${value})`;
    setCurrentValue(String(result));
    setHistoryExpression(expression);
    setWaitingForOperand(true);
  };

  /**
   * Performs the calculation based on the operator
   */
  const performOperation = (nextOperation, currentVal, previousVal) => {
    const current = parseFloat(currentVal);
    const previous = parseFloat(previousVal);

    if (isNaN(previous) || isNaN(current)) {
      return current;
    }

    let result;
    switch (nextOperation) {
      case '+':
        result = previous + current;
        break;
      case '−':
        result = previous - current;
        break;
      case '×':
        result = previous * current;
        break;
      case '÷':
        if (current === 0) {
          return 'Cannot divide by zero';
        }
        result = previous / current;
        break;
      default:
        return current;
    }

    return result;
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
      setHistoryExpression(`${previousValue} ${operation} ${result}`);
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
      setHistoryExpression(`${currentValue} ${nextOperator}`);
    } else if (operation && !waitingForOperand) {
      const result = performOperation(operation, currentValue, previousValue);
      
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
      setHistoryExpression(`${newValue} ${nextOperator}`);
    } else {
      setHistoryExpression(`${previousValue} ${nextOperator}`);
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
      const result = performOperation(lastOperation, lastOperand, currentValue);
      
      if (typeof result === 'string') {
        setCurrentValue(result);
        setHistoryExpression('');
        return;
      }
      
      const expression = `${currentValue} ${lastOperation} ${lastOperand} =`;
      setCurrentValue(String(result));
      setHistoryExpression(expression);
      addToHistory(expression, String(result));
      return;
    }

    if (previousValue === null || operation === null) {
      setHistoryExpression(`${currentValue} =`);
      return;
    }

    const result = performOperation(operation, currentValue, previousValue);
    
    if (typeof result === 'string') {
      setCurrentValue(result);
      setPreviousValue(null);
      setOperation(null);
      setHistoryExpression('');
      return;
    }

    const expression = `${previousValue} ${operation} ${currentValue} =`;
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
   * Keyboard event handler
   */
  const handleKeyPress = useCallback((event) => {
    const key = event.key;

    if (key >= '0' && key <= '9') {
      event.preventDefault();
      inputNumber(key);
    } else if (key === '.' || key === ',') {
      event.preventDefault();
      inputDecimal();
    } else if (key === '+') {
      event.preventDefault();
      handleOperator('+');
    } else if (key === '-') {
      event.preventDefault();
      handleOperator('−');
    } else if (key === '*') {
      event.preventDefault();
      handleOperator('×');
    } else if (key === '/') {
      event.preventDefault();
      handleOperator('÷');
    } else if (key === 'Enter' || key === '=') {
      event.preventDefault();
      handleEquals();
    } else if (key === 'Backspace') {
      event.preventDefault();
      backspace();
    } else if (key === 'Escape') {
      event.preventDefault();
      clearAll();
    } else if (key === 'Delete') {
      event.preventDefault();
      clearEntry();
    } else if (key === '%') {
      event.preventDefault();
      handlePercentage();
    }
  }, [inputNumber, inputDecimal, handleOperator]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  /**
   * Button component
   */
  const Button = ({ value, onClick, className = '', span = 1, children }) => (
    <button
      className={`
        px-5 py-4 text-xl font-semibold rounded-lg
        transition-all duration-150 ease-in-out
        hover:scale-[1.02] active:scale-95
        focus:outline-none focus:ring-2 focus:ring-white/30
        ${className}
      `}
      onClick={onClick}
      style={{ gridColumn: span > 1 ? `span ${span}` : 'auto' }}
    >
      {children || value}
    </button>
  );

  return (
    <div className="w-full max-w-7xl mx-auto flex gap-4 items-start justify-center px-4">
      {/* Calculator Main Section */}
      <div className="flex-shrink-0 w-full max-w-md max-h-[calc(100vh-2rem)]">
        <div className="bg-calc-bg/95 backdrop-blur-20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-calc-header px-5 py-3.5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h1 className="text-white text-base font-semibold flex items-center gap-2">
                <span className="text-lg">🖩</span> Calculator
              </h1>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-white/70 hover:text-white text-sm px-3 py-1 rounded hover:bg-white/10 transition-colors"
                title="Toggle History"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Display */}
          <div className="bg-calc-display px-6 py-5 min-h-[130px] flex flex-col justify-end gap-2">
            <div className="text-white/50 text-sm font-normal min-h-[22px] overflow-x-auto scrollbar-hide text-right">
              {historyExpression || '\u00A0'}
            </div>
            <div
              data-testid="calculator-display"
              className="text-white text-5xl font-semibold overflow-x-auto scrollbar-hide text-right leading-tight break-all"
            >
              {formatDisplayValue(currentValue)}
            </div>
          </div>

          {/* Memory Buttons */}
          <div className="grid grid-cols-5 gap-1 px-4 py-2.5 bg-calc-display/50 border-b border-white/5">
            {['MC', 'MR', 'M+', 'M−', 'MS'].map((btn) => (
              <button
                key={btn}
                disabled
                className="bg-transparent text-white/30 text-xs font-semibold px-2 py-2 rounded cursor-not-allowed hover:bg-white/5 transition-colors"
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Calculator Buttons */}
          <div className="grid grid-cols-4 gap-1 p-3 bg-transparent">
            {/* Row 1 */}
            <Button value="%" onClick={handlePercentage} className="bg-calc-function hover:bg-calc-function/80 text-white">
              %
            </Button>
            <Button value="CE" onClick={clearEntry} className="bg-calc-function hover:bg-calc-function/80 text-white text-lg">
              CE
            </Button>
            <Button value="C" onClick={clearAll} className="bg-calc-function hover:bg-calc-function/80 text-white text-lg">
              C
            </Button>
            <Button value="⌫" onClick={backspace} className="bg-calc-function hover:bg-calc-function/80 text-white text-lg">
              ⌫
            </Button>

            {/* Row 2 */}
            <Button
              value="¹⁄ₓ"
              onClick={() => {
                const value = parseFloat(currentValue);
                if (value === 0) {
                  setCurrentValue('Cannot divide by zero');
                } else {
                  const result = 1 / value;
                  setCurrentValue(String(result));
                  setHistoryExpression(`1/(${value})`);
                  setWaitingForOperand(true);
                }
              }}
              className="bg-calc-function hover:bg-calc-function/80 text-white text-base"
            >
              ¹⁄ₓ
            </Button>
            <Button
              value="x²"
              onClick={() => {
                const value = parseFloat(currentValue);
                const result = value * value;
                setCurrentValue(String(result));
                setHistoryExpression(`sqr(${value})`);
                setWaitingForOperand(true);
              }}
              className="bg-calc-function hover:bg-calc-function/80 text-white text-base"
            >
              x²
            </Button>
            <Button value="√" onClick={squareRoot} className="bg-calc-function hover:bg-calc-function/80 text-white text-xl">
              √
            </Button>
            <Button value="÷" onClick={() => handleOperator('÷')} className="bg-calc-operator hover:bg-calc-operator/80 text-white text-2xl">
              ÷
            </Button>

            {/* Row 3 */}
            <Button value="7" onClick={() => inputNumber('7')} className="bg-calc-button hover:bg-calc-button-hover text-white">
              7
            </Button>
            <Button value="8" onClick={() => inputNumber('8')} className="bg-calc-button hover:bg-calc-button-hover text-white">
              8
            </Button>
            <Button value="9" onClick={() => inputNumber('9')} className="bg-calc-button hover:bg-calc-button-hover text-white">
              9
            </Button>
            <Button value="×" onClick={() => handleOperator('×')} className="bg-calc-operator hover:bg-calc-operator/80 text-white text-2xl">
              ×
            </Button>

            {/* Row 4 */}
            <Button value="4" onClick={() => inputNumber('4')} className="bg-calc-button hover:bg-calc-button-hover text-white">
              4
            </Button>
            <Button value="5" onClick={() => inputNumber('5')} className="bg-calc-button hover:bg-calc-button-hover text-white">
              5
            </Button>
            <Button value="6" onClick={() => inputNumber('6')} className="bg-calc-button hover:bg-calc-button-hover text-white">
              6
            </Button>
            <Button value="−" onClick={() => handleOperator('−')} className="bg-calc-operator hover:bg-calc-operator/80 text-white text-2xl">
              −
            </Button>

            {/* Row 5 */}
            <Button value="1" onClick={() => inputNumber('1')} className="bg-calc-button hover:bg-calc-button-hover text-white">
              1
            </Button>
            <Button value="2" onClick={() => inputNumber('2')} className="bg-calc-button hover:bg-calc-button-hover text-white">
              2
            </Button>
            <Button value="3" onClick={() => inputNumber('3')} className="bg-calc-button hover:bg-calc-button-hover text-white">
              3
            </Button>
            <Button value="+" onClick={() => handleOperator('+')} className="bg-calc-operator hover:bg-calc-operator/80 text-white text-2xl">
              +
            </Button>

            {/* Row 6 */}
            <Button value="±" onClick={toggleSign} className="bg-calc-button hover:bg-calc-button-hover text-white">
              ±
            </Button>
            <Button value="0" onClick={() => inputNumber('0')} className="bg-calc-button hover:bg-calc-button-hover text-white">
              0
            </Button>
            <Button value="." onClick={inputDecimal} className="bg-calc-button hover:bg-calc-button-hover text-white">
              .
            </Button>
            <Button 
              value="=" 
              onClick={handleEquals} 
              className="bg-gradient-to-br from-calc-equals to-blue-700 hover:from-calc-equals-hover hover:to-blue-600 text-white text-2xl shadow-lg"
            >
              =
            </Button>
          </div>
        </div>
      </div>

      {/* History Section */}
      {showHistory && (
        <div className="flex-shrink-0 w-80 max-h-[calc(100vh-2rem)] bg-calc-bg/95 backdrop-blur-20 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <div className="bg-calc-header px-5 py-3.5 border-b border-white/10 flex items-center justify-between flex-shrink-0">
            <h2 className="text-white text-base font-semibold">History</h2>
            <button
              onClick={clearHistory}
              className="text-white/70 hover:text-white text-sm px-3 py-1 rounded hover:bg-white/10 transition-colors"
              title="Clear History"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {calculationHistory.length === 0 ? (
              <div className="px-5 py-8 text-center text-white/50 text-sm">
                There's no history yet
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {calculationHistory.map((item) => (
                  <div
                    key={item.id}
                    className="px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer group"
                    onClick={() => {
                      setCurrentValue(item.result);
                      setWaitingForOperand(true);
                    }}
                  >
                    <div className="text-white/50 text-xs mb-1">{item.timestamp}</div>
                    <div className="text-white/70 text-sm mb-1 group-hover:text-white transition-colors">
                      {item.expression}
                    </div>
                    <div className="text-white text-xl font-semibold">{item.result}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
