/**
 * Memory Buttons Component
 */
const MemoryButtons = ({ 
  onMemoryClear, 
  onMemoryRecall, 
  onMemoryAdd, 
  onMemorySubtract, 
  onMemoryStore,
  hasMemory 
}) => {
  const buttons = [
    { label: 'MC', handler: onMemoryClear, disabled: !hasMemory },
    { label: 'MR', handler: onMemoryRecall, disabled: !hasMemory },
    { label: 'M+', handler: onMemoryAdd, disabled: false },
    { label: 'M−', handler: onMemorySubtract, disabled: false },
    { label: 'MS', handler: onMemoryStore, disabled: false }
  ];

  return (
    <div className="grid grid-cols-5 gap-1 px-4 py-2.5 bg-calc-display/50 border-b border-white/5">
      {buttons.map((btn) => (
        <button
          key={btn.label}
          onClick={btn.handler}
          disabled={btn.disabled}
          className={`
            text-xs font-semibold px-2 py-2 rounded transition-colors
            ${btn.disabled 
              ? 'bg-transparent text-white/30 cursor-not-allowed' 
              : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10 cursor-pointer active:opacity-60 active:scale-95'
            }
          `}
          title={getMemoryButtonTitle(btn.label)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

/**
 * Get tooltip title for memory buttons
 */
const getMemoryButtonTitle = (label) => {
  const titles = {
    'MC': 'Memory Clear',
    'MR': 'Memory Recall',
    'M+': 'Memory Add',
    'M−': 'Memory Subtract',
    'MS': 'Memory Store'
  };
  return titles[label] || '';
};

export default MemoryButtons;
