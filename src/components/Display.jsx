import { formatDisplayValue } from '../utils/calculatorUtils';

/**
 * Display Component - Shows calculator display and history expression
 */
const Display = ({ currentValue, historyExpression }) => {
  return (
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
  );
};

export default Display;
