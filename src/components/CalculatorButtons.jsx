import Button from './Button';

/**
 * Calculator Buttons Component - Main button grid
 */
const CalculatorButtons = ({
  onNumberClick,
  onOperatorClick,
  onDecimalClick,
  onEqualsClick,
  onClearEntry,
  onClearAll,
  onBackspace,
  onPercentage,
  onSquareRoot,
  onSquare,
  onReciprocal,
  onToggleSign
}) => {
  return (
    <div className="grid grid-cols-4 gap-1 p-3 bg-transparent">
      {/* Row 1 */}
      <Button value="%" onClick={onPercentage} className="bg-calc-function hover:bg-calc-function/80 text-white">
        %
      </Button>
      <Button value="CE" onClick={onClearEntry} className="bg-calc-function hover:bg-calc-function/80 text-white text-lg">
        CE
      </Button>
      <Button value="C" onClick={onClearAll} className="bg-calc-function hover:bg-calc-function/80 text-white text-lg">
        C
      </Button>
      <Button value="⌫" onClick={onBackspace} className="bg-calc-function hover:bg-calc-function/80 text-white text-2xl">
        ⌫
      </Button>

      {/* Row 2 */}
      <Button value="¹⁄ₓ" onClick={onReciprocal} className="bg-calc-function hover:bg-calc-function/80 text-white text-lg">
        ¹⁄ₓ
      </Button>
      <Button value="x²" onClick={onSquare} className="bg-calc-function hover:bg-calc-function/80 text-white">
        x²
      </Button>
      <Button value="√" onClick={onSquareRoot} className="bg-calc-function hover:bg-calc-function/80 text-white text-2xl">
        √
      </Button>
      <Button value="÷" onClick={() => onOperatorClick('÷')} className="bg-calc-operator hover:bg-calc-button-hover text-white text-2xl">
        ÷
      </Button>

      {/* Row 3 */}
      <Button value="7" onClick={() => onNumberClick('7')} className="bg-calc-button hover:bg-calc-button-hover text-white">
        7
      </Button>
      <Button value="8" onClick={() => onNumberClick('8')} className="bg-calc-button hover:bg-calc-button-hover text-white">
        8
      </Button>
      <Button value="9" onClick={() => onNumberClick('9')} className="bg-calc-button hover:bg-calc-button-hover text-white">
        9
      </Button>
      <Button value="×" onClick={() => onOperatorClick('×')} className="bg-calc-operator hover:bg-calc-button-hover text-white text-2xl">
        ×
      </Button>

      {/* Row 4 */}
      <Button value="4" onClick={() => onNumberClick('4')} className="bg-calc-button hover:bg-calc-button-hover text-white">
        4
      </Button>
      <Button value="5" onClick={() => onNumberClick('5')} className="bg-calc-button hover:bg-calc-button-hover text-white">
        5
      </Button>
      <Button value="6" onClick={() => onNumberClick('6')} className="bg-calc-button hover:bg-calc-button-hover text-white">
        6
      </Button>
      <Button value="−" onClick={() => onOperatorClick('−')} className="bg-calc-operator hover:bg-calc-button-hover text-white text-2xl">
        −
      </Button>

      {/* Row 5 */}
      <Button value="1" onClick={() => onNumberClick('1')} className="bg-calc-button hover:bg-calc-button-hover text-white">
        1
      </Button>
      <Button value="2" onClick={() => onNumberClick('2')} className="bg-calc-button hover:bg-calc-button-hover text-white">
        2
      </Button>
      <Button value="3" onClick={() => onNumberClick('3')} className="bg-calc-button hover:bg-calc-button-hover text-white">
        3
      </Button>
      <Button value="+" onClick={() => onOperatorClick('+')} className="bg-calc-operator hover:bg-calc-button-hover text-white text-2xl">
        +
      </Button>

      {/* Row 6 */}
      <Button value="±" onClick={onToggleSign} className="bg-calc-button hover:bg-calc-button-hover text-white text-2xl">
        ±
      </Button>
      <Button value="0" onClick={() => onNumberClick('0')} className="bg-calc-button hover:bg-calc-button-hover text-white">
        0
      </Button>
      <Button value="." onClick={onDecimalClick} className="bg-calc-button hover:bg-calc-button-hover text-white text-3xl">
        .
      </Button>
      <Button
        value="="
        onClick={onEqualsClick}
        className="bg-gradient-to-br from-calc-equals to-blue-700 hover:from-calc-equals-hover hover:to-blue-600 text-white text-2xl shadow-lg"
      >
        =
      </Button>
    </div>
  );
};

export default CalculatorButtons;
