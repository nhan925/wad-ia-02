import { formatDisplayValue } from '../utils/calculatorUtils';

/**
 * Display Component - Shows calculator display and history expression
 */
const Display = ({ currentValue, historyExpression }) => {
  return (
    <div className="bg-calc-display px-4 md:px-6 py-4 md:py-5 min-h-[100px] md:min-h-[130px] flex flex-col justify-end gap-2">
      <div className="text-theme-tertiary text-xs md:text-sm font-normal min-h-[18px] md:min-h-[22px] overflow-x-auto scrollbar-hide text-right">
        {historyExpression || '\u00A0'}
      </div>
      <div
        data-testid="calculator-display"
        className="text-theme-primary text-2xl md:text-3xl font-semibold overflow-x-auto scrollbar-hide text-right leading-tight break-all"
      >
        {formatDisplayValue(currentValue, true)}
      </div>
    </div>
  );
};

export default Display;
