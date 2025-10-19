import { useState } from 'react';
import { formatDisplayValue } from '../utils/calculatorUtils';

/**
 * History Panel Component - Shows calculation history and memory
 */
const HistoryPanel = ({ 
  history, 
  onClearHistory, 
  onHistoryItemClick,
  memoryValue,
  onMemoryClear,
  onMemoryRecall,
  maxHeight,
  onClose,
  isMobile = false
}) => {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div
      className="flex-shrink-0 w-full md:w-80 bg-calc-bg/95 backdrop-blur-20 rounded-t-2xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      style={{ maxHeight: maxHeight || 'calc(100vh - 2rem)' }}
    >
      {/* Header with Tabs */}
      <div className="bg-calc-header border-b border-theme-border flex-shrink-0">
        <div className="flex">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-5 py-3.5 text-sm font-semibold transition-colors ${
              activeTab === 'history'
                ? 'text-theme-primary border-b-2 border-calc-equals'
                : 'text-theme-secondary hover:text-theme-primary'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className='font-calcicons font-light'>{'\uE81C'}</span>
              History
            </div>
          </button>
          <button
            onClick={() => setActiveTab('memory')}
            className={`flex-1 px-5 py-3.5 text-sm font-semibold transition-colors ${
              activeTab === 'memory'
                ? 'text-theme-primary border-b-2 border-calc-equals'
                : 'text-theme-secondary hover:text-theme-primary'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
              Memory
            </div>
          </button>
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="px-4 py-3.5 text-theme-secondary hover:text-theme-primary transition-colors"
              title="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* History Tab Content */}
      {activeTab === 'history' && (
        <>
          <div className="px-5 py-2.5 bg-calc-display/30 border-b border-theme-border flex items-center justify-between flex-shrink-0">
            <span className="text-theme-tertiary text-xs">Calculation History</span>
            <button
              onClick={onClearHistory}
              disabled={history.length === 0}
              className="text-theme-secondary hover:text-theme-primary text-xs px-2 py-1 rounded hover:bg-theme-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Clear History"
            >
              <span className='font-calcicons font-light'>{'\uE74D'}</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {history.length === 0 ? (
              <div className="px-5 py-8 text-center text-theme-tertiary text-sm">
                There's no history yet
              </div>
            ) : (
              <div className="divide-y divide-theme-border">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="px-5 py-4 hover:bg-theme-hover transition-colors cursor-pointer group"
                    onClick={() => onHistoryItemClick(item.result, item.expression)}
                  >
                    <div className="text-theme-tertiary text-xs mb-1">{item.timestamp}</div>
                    <div className="text-theme-secondary text-xs md:text-sm mb-1 group-hover:text-theme-primary transition-colors text-wrap break-words">
                      {item.expression}
                    </div>
                    <div className="text-theme-primary text-base md:text-lg font-semibold">{formatDisplayValue(item.result)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Memory Tab Content */}
      {activeTab === 'memory' && (
        <>
          <div className="px-5 py-2.5 bg-calc-display/30 border-b border-theme-border flex items-center justify-between flex-shrink-0">
            <span className="text-theme-tertiary text-xs">Stored Memory</span>
            <button
              onClick={onMemoryClear}
              disabled={memoryValue === null}
              className="text-theme-secondary hover:text-theme-primary text-xs px-2 py-1 rounded hover:bg-theme-hover transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Clear Memory"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {memoryValue === null ? (
              <div className="px-5 py-8 text-center">
                <div className="text-theme-tertiary mb-2 opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <p className="text-theme-tertiary text-sm">No value stored in memory</p>
                <p className="text-theme-tertiary text-xs mt-2 opacity-70">Use MS, M+, or M− to store values</p>
              </div>
            ) : (
              <div className="p-5">
                <div 
                  className="bg-theme-hover rounded-xl p-5 hover:bg-theme-hover hover:opacity-70 transition-colors cursor-pointer group border border-theme-border"
                  onClick={onMemoryRecall}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-theme-tertiary text-xs font-semibold uppercase tracking-wider">Memory Value</span>
                    <span className="text-calc-equals text-xs font-semibold px-2 py-0.5 rounded bg-calc-equals/20">M</span>
                  </div>
                  <div className="text-theme-primary text-xl md:text-2xl font-bold break-all mb-2">
                    {formatDisplayValue(memoryValue)}
                  </div>
                  <div className="text-theme-tertiary text-xs group-hover:text-theme-secondary transition-colors flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                    </svg>
                    Click to recall
                  </div>
                </div>

                {/* Memory Operations Guide */}
                <div className="mt-6 p-4 bg-theme-hover rounded-lg border border-theme-border">
                  <h3 className="text-theme-secondary text-xs font-semibold mb-3 uppercase tracking-wider">Memory Operations</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-calc-equals font-mono font-semibold">MC</span>
                      <span className="text-theme-tertiary">Clear memory</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-calc-equals font-mono font-semibold">MR</span>
                      <span className="text-theme-tertiary">Recall memory value</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-calc-equals font-mono font-semibold">M+</span>
                      <span className="text-theme-tertiary">Add to memory</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-calc-equals font-mono font-semibold">M−</span>
                      <span className="text-theme-tertiary">Subtract from memory</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-calc-equals font-mono font-semibold">MS</span>
                      <span className="text-theme-tertiary">Store to memory</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HistoryPanel;
