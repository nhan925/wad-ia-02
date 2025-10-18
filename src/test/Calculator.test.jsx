import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Calculator from '../components/Calculator';

/**
 * Helper function to get the calculator display value
 */
const getDisplayValue = () => {
  const display = screen.getByTestId('calculator-display');
  return display.textContent;
};

describe('Calculator Component', () => {
  beforeEach(() => {
    render(<Calculator />);
  });

  describe('Rendering', () => {
    it('should render calculator with initial value of 0', () => {
      expect(getDisplayValue()).toBe('0');
    });

    it('should render calculator title', () => {
      const title = screen.getByText(/Calculator/i);
      expect(title).toBeInTheDocument();
    });

    it('should render all number buttons', () => {
      for (let i = 0; i <= 9; i++) {
        const button = screen.getByRole('button', { name: String(i) });
        expect(button).toBeInTheDocument();
      }
    });

    it('should render all operator buttons', () => {
      const operators = ['+', '−', '×', '÷', '='];
      operators.forEach(op => {
        const button = screen.getByRole('button', { name: op });
        expect(button).toBeInTheDocument();
      });
    });

    it('should render control buttons', () => {
      expect(screen.getByRole('button', { name: 'C' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'CE' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '⌫' })).toBeInTheDocument();
    });

    it('should render special function buttons', () => {
      expect(screen.getByRole('button', { name: '%' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '√' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'x²' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '¹⁄ₓ' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '±' })).toBeInTheDocument();
    });
  });

  describe('Basic Operations', () => {
    it('should handle number input correctly', async () => {
      const user = userEvent.setup();
      const button5 = screen.getByRole('button', { name: '5' });
      await user.click(button5);
      
      expect(getDisplayValue()).toBe('5');
    });

    it('should handle addition correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('5');
    });

    it('should handle subtraction correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '−' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('6');
    });

    it('should handle multiplication correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '×' }));
      await user.click(screen.getByRole('button', { name: '6' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('30');
    });

    it('should handle division correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '÷' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('5');
    });
  });

  describe('Sequential Operations', () => {
    it('should handle sequential addition', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('6');
    });

    it('should evaluate left-to-right (2 + 3 × 4 = 20)', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '×' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('20');
    });

    it('should handle mixed operations (10 / 2 * 3 = 15)', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '÷' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '×' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('15');
    });
  });

  describe('Special Functions', () => {
    it('should calculate square root correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '6' }));
      await user.click(screen.getByRole('button', { name: '√' }));
      
      expect(getDisplayValue()).toBe('4');
    });

    it('should calculate square correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: 'x²' }));
      
      expect(getDisplayValue()).toBe('25');
    });

    it('should toggle sign correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '±' }));
      
      expect(getDisplayValue()).toBe('-5');
    });

    it('should calculate reciprocal correctly', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '¹⁄ₓ' }));
      
      expect(getDisplayValue()).toBe('0.25');
    });
  });

  describe('Control Functions', () => {
    it('should clear entry with CE', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '9' }));
      await user.click(screen.getByRole('button', { name: 'CE' }));
      await user.click(screen.getByRole('button', { name: '4' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('9');
    });

    it('should clear all with C', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: 'C' }));
      
      expect(getDisplayValue()).toBe('0');
    });

    it('should handle backspace', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '⌫' }));
      
      expect(getDisplayValue()).toBe('12');
    });
  });

  describe('Error Handling', () => {
    it('should handle division by zero', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '÷' }));
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(screen.getByText('Cannot divide by zero')).toBeInTheDocument();
    });

    it('should handle reciprocal of zero', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '0' }));
      await user.click(screen.getByRole('button', { name: '¹⁄ₓ' }));
      
      expect(screen.getByText('Cannot divide by zero')).toBeInTheDocument();
    });
  });

  describe('Decimal Operations', () => {
    it('should handle decimal point input', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '5' }));
      
      expect(getDisplayValue()).toBe('1.5');
    });

    it('should handle decimal addition', async () => {
      const user = userEvent.setup();
      
      await user.click(screen.getByRole('button', { name: '1' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '.' }));
      await user.click(screen.getByRole('button', { name: '5' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      expect(getDisplayValue()).toBe('4');
    });
  });

  describe('History Functionality', () => {
    it('should toggle history panel', async () => {
      const user = userEvent.setup();
      
      const historyButton = screen.getAllByTitle('Toggle History')[0];
      await user.click(historyButton);
      
      expect(screen.getByText('History')).toBeInTheDocument();
      expect(screen.getByText("There's no history yet")).toBeInTheDocument();
    });

    it('should add calculation to history after equals', async () => {
      const user = userEvent.setup();
      
      // Show history
      const historyButton = screen.getAllByTitle('Toggle History')[0];
      await user.click(historyButton);
      
      // Perform calculation
      await user.click(screen.getByRole('button', { name: '2' }));
      await user.click(screen.getByRole('button', { name: '+' }));
      await user.click(screen.getByRole('button', { name: '3' }));
      await user.click(screen.getByRole('button', { name: '=' }));
      
      // Check display has correct result
      expect(getDisplayValue()).toBe('5');
      
      // Check history contains the calculation (find all matching text and verify at least one exists)
      const historyExpressions = screen.getAllByText('2 + 3 =');
      expect(historyExpressions.length).toBeGreaterThan(0);
    });
  });
});
