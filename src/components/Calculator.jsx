import { useState, useEffect, useCallback } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { useMemory } from '../hooks/useMemory';
import Display from './Display';
import MemoryButtons from './MemoryButtons';
import CalculatorButtons from './CalculatorButtons';
import HistoryPanel from './HistoryPanel';

/**
 * Calculator Component - Main component
 * Replicates the Windows 11 Calculator Basic Mode functionality with history and memory
 */
const Calculator = () => {
  const [showHistory, setShowHistory] = useState(false);

  // Calculator logic hook
  const {
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
  } = useCalculator();

  // Memory functionality hook
  const {
    memoryValue,
    hasMemory,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore
  } = useMemory();

  /**
   * Memory button handlers
   */
  const handleMemoryClear = () => {
    memoryClear();
  };

  const handleMemoryRecall = () => {
    const value = memoryRecall();
    if (value !== null) {
      setCurrentValue(String(value));
      setWaitingForOperand(true);
    }
  };

  const handleMemoryAdd = () => {
    memoryAdd(currentValue);
  };

  const handleMemorySubtract = () => {
    memorySubtract(currentValue);
  };

  const handleMemoryStore = () => {
    memoryStore(currentValue);
  };

  /**
   * Toggle history panel
   */
  const toggleHistory = () => {
    setShowHistory(!showHistory);
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
  }, [inputNumber, inputDecimal, handleOperator, handleEquals, backspace, clearAll, clearEntry, handlePercentage]);

  /**
   * Attach keyboard event listener
   */
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="w-full max-w-7xl mx-auto flex gap-4 items-start justify-center px-4">
      {/* Calculator Main Section */}
      <div className="flex-shrink-0 w-full max-w-md max-h-[calc(100vh-2rem)]">
        <div className="bg-calc-bg/95 backdrop-blur-20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-calc-header px-5 py-3.5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h1 className="text-white text-base font-semibold flex items-center gap-2">
                <img src="/logo.svg" alt="Calculator Logo" className="w-[0.8em]" />
                Calculator
              </h1>
              <button
                onClick={toggleHistory}
                className="text-white/70 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors active:scale-95"
                title="Toggle History"
              >
                <span className='font-calcicons font-light'>{'\uE81C'}</span>
              </button>
            </div>
          </div>

          {/* Display */}
          <Display 
            currentValue={currentValue} 
            historyExpression={historyExpression} 
          />

          {/* Memory Buttons */}
          <MemoryButtons
            onMemoryClear={handleMemoryClear}
            onMemoryRecall={handleMemoryRecall}
            onMemoryAdd={handleMemoryAdd}
            onMemorySubtract={handleMemorySubtract}
            onMemoryStore={handleMemoryStore}
            hasMemory={hasMemory}
          />

          {/* Calculator Buttons */}
          <CalculatorButtons
            onNumberClick={inputNumber}
            onOperatorClick={handleOperator}
            onDecimalClick={inputDecimal}
            onEqualsClick={handleEquals}
            onClearEntry={clearEntry}
            onClearAll={clearAll}
            onBackspace={backspace}
            onPercentage={handlePercentage}
            onSquareRoot={squareRoot}
            onSquare={handleSquare}
            onReciprocal={handleReciprocal}
            onToggleSign={toggleSign}
          />
        </div>
      </div>

      {/* History Section */}
      {showHistory && (
        <HistoryPanel
          history={calculationHistory}
          onClearHistory={clearHistory}
          onHistoryItemClick={loadHistoryValue}
          memoryValue={memoryValue}
          onMemoryClear={handleMemoryClear}
          onMemoryRecall={handleMemoryRecall}
        />
      )}
    </div>
  );
};

export default Calculator;
