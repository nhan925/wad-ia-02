import { useState, useEffect, useCallback, useRef } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { useMemory } from '../hooks/useMemory';
import { useTheme } from '../hooks/useTheme';
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
  
  // Theme hook
  const { theme, toggleTheme, isDark } = useTheme();

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

  /**
   * Prevent body scroll when mobile modal is open
   */
  useEffect(() => {
    if (showHistory && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showHistory]);

  // Observe calculator height for history panel max height
  const [calcHeight, setCalcHeight] = useState(0);
  const calcRef = useRef(null);

  useEffect(() => {
    if (!calcRef.current) return;

    const observer = new ResizeObserver(entries => {
      setCalcHeight(entries[0].contentRect.height);
    });

    observer.observe(calcRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-start justify-center px-4">
        {/* Calculator Main Section */}
        <div className="flex-shrink-0 w-full md:max-w-md max-h-[calc(100vh-2rem)]">
          <div className="bg-calc-bg/95 backdrop-blur-20 rounded-2xl shadow-2xl overflow-hidden" ref={calcRef}>
            {/* Header */}
            <div className="bg-calc-header px-3 md:px-5 py-3 md:py-3.5 border-b border-theme-border">
              <div className="flex items-center justify-between px-0">
                <h1 className="text-theme-primary text-sm md:text-base font-semibold flex items-center gap-2">
                  <img src="./logo.svg" alt="Calculator Logo" className="w-[0.8em]" />
                  Calculator
                </h1>
                <div className="flex items-center gap-1 md:gap-2">
                  <button
                    onClick={toggleTheme}
                    className="text-theme-secondary hover:text-theme-primary p-1.5 md:p-2 rounded-lg hover:bg-theme-hover transition-colors active:scale-95"
                    title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                  >
                    {isDark ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 md:h-5 w-4 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 md:h-5 w-4 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={toggleHistory}
                    className="text-theme-secondary hover:text-theme-primary p-1.5 md:p-2 rounded-lg hover:bg-theme-hover transition-colors active:scale-95"
                    title="Toggle History"
                  >
                    <span className='font-calcicons font-light text-base md:text-lg'>{'\uE81C'}</span>
                  </button>
                </div>
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

        {/* History Section - Desktop (side panel) */}
        {showHistory && (
          <div className="hidden md:block">
            <HistoryPanel
              history={calculationHistory}
              onClearHistory={clearHistory}
              onHistoryItemClick={loadHistoryValue}
              memoryValue={memoryValue}
              onMemoryClear={handleMemoryClear}
              onMemoryRecall={handleMemoryRecall}
              maxHeight={calcHeight}
              onClose={toggleHistory}
            />
          </div>
        )}
      </div>

      {/* History Section - Mobile (modal/popup) */}
      {showHistory && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={toggleHistory}
          />
          
          {/* Modal Content */}
          <div className="relative w-full sm:max-w-md max-h-[85vh] sm:max-h-[90vh] animate-slide-up sm:rounded-2xl overflow-hidden">
            <HistoryPanel
              history={calculationHistory}
              onClearHistory={clearHistory}
              onHistoryItemClick={(result, expression) => {
                loadHistoryValue(result, expression);
                toggleHistory(); // Close modal after selecting
              }}
              memoryValue={memoryValue}
              onMemoryClear={handleMemoryClear}
              onMemoryRecall={() => {
                handleMemoryRecall();
                toggleHistory(); // Close modal after recalling
              }}
              maxHeight={null}
              onClose={toggleHistory}
              isMobile={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Calculator;
