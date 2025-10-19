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
  maxHeight
}) => {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div
      className="flex-shrink-0 md:w-80 bg-calc-bg/95 backdrop-blur-20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      style={{ maxHeight: maxHeight || 'calc(100vh - 2rem)' }}
    >
      {/* Header with Tabs */}
      <div className="bg-calc-header border-b border-white/10 flex-shrink-0">
        <div className="flex">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 px-5 py-3.5 text-sm font-semibold transition-colors ${
              activeTab === 'history'
                ? 'text-white border-b-2 border-calc-equals'
                : 'text-white/60 hover:text-white/80'
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
                ? 'text-white border-b-2 border-calc-equals'
                : 'text-white/60 hover:text-white/80'
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
        </div>
      </div>

      {/* History Tab Content */}
      {activeTab === 'history' && (
        <>
          <div className="px-5 py-2.5 bg-calc-display/30 border-b border-white/5 flex items-center justify-between flex-shrink-0">
            <span className="text-white/50 text-xs">Calculation History</span>
            <button
              onClick={onClearHistory}
              disabled={history.length === 0}
              className="text-white/70 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              title="Clear History"
            >
              <span className='font-calcicons font-light'>{'\uE74D'}</span>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
            {history.length === 0 ? (
              <div className="px-5 py-8 text-center text-white/50 text-sm">
                There's no history yet
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="px-5 py-4 hover:bg-white/5 transition-colors cursor-pointer group"
                    onClick={() => onHistoryItemClick(item.result)}
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
        </>
      )}

      {/* Memory Tab Content */}
      {activeTab === 'memory' && (
        <>
          <div className="px-5 py-2.5 bg-calc-display/30 border-b border-white/5 flex items-center justify-between flex-shrink-0">
            <span className="text-white/50 text-xs">Stored Memory</span>
            <button
              onClick={onMemoryClear}
              disabled={memoryValue === null}
              className="text-white/70 hover:text-white text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
                <div className="text-white/30 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <p className="text-white/50 text-sm">No value stored in memory</p>
                <p className="text-white/30 text-xs mt-2">Use MS, M+, or M− to store values</p>
              </div>
            ) : (
              <div className="p-5">
                <div 
                  className="bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-colors cursor-pointer group border border-white/10"
                  onClick={onMemoryRecall}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">Memory Value</span>
                    <span className="text-calc-equals text-xs font-semibold px-2 py-0.5 rounded bg-calc-equals/20">M</span>
                  </div>
                  <div className="text-white text-3xl font-bold break-all mb-2">
                    {formatDisplayValue(memoryValue)}
                  </div>
                  <div className="text-white/40 text-xs group-hover:text-white/60 transition-colors flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
                    </svg>
                    Click to recall
                  </div>
                </div>

                {/* Memory Operations Guide */}
                <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                  <h3 className="text-white/70 text-xs font-semibold mb-3 uppercase tracking-wider">Memory Operations</h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-calc-equals font-mono font-semibold">MC</span>
                      <span className="text-white/50">Clear memory</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-calc-equals font-mono font-semibold">MR</span>
                      <span className="text-white/50">Recall memory value</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-calc-equals font-mono font-semibold">M+</span>
                      <span className="text-white/50">Add to memory</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-calc-equals font-mono font-semibold">M−</span>
                      <span className="text-white/50">Subtract from memory</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-calc-equals font-mono font-semibold">MS</span>
                      <span className="text-white/50">Store to memory</span>
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
