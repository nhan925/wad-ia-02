import { useState } from 'react';
import Decimal from 'decimal.js';

/**
 * Custom hook for calculator memory functionality
 */
export const useMemory = () => {
  const [memoryValue, setMemoryValue] = useState(null);

  /**
   * Memory Clear (MC) - Clear the memory
   */
  const memoryClear = () => {
    setMemoryValue(null);
  };

  /**
   * Memory Recall (MR) - Recall the value from memory
   */
  const memoryRecall = () => {
    return memoryValue;
  };

  /**
   * Memory Add (M+) - Add current value to memory using Decimal.js
   */
  const memoryAdd = (value) => {
    try {
      const num = new Decimal(value);
      setMemoryValue(prev => {
        if (prev === null) return num.toString();
        return new Decimal(prev).plus(num).toString();
      });
    } catch (e) {
      // Invalid input, do nothing
    }
  };

  /**
   * Memory Subtract (M−) - Subtract current value from memory using Decimal.js
   */
  const memorySubtract = (value) => {
    try {
      const num = new Decimal(value);
      setMemoryValue(prev => {
        if (prev === null) return num.neg().toString();
        return new Decimal(prev).minus(num).toString();
      });
    } catch (e) {
      // Invalid input, do nothing
    }
  };

  /**
   * Memory Store (MS) - Store current value in memory
   */
  const memoryStore = (value) => {
    try {
      const num = new Decimal(value);
      setMemoryValue(num.toString());
    } catch (e) {
      // Invalid input, do nothing
    }
  };

  /**
   * Check if memory has a value
   */
  const hasMemory = memoryValue !== null;

  return {
    memoryValue,
    hasMemory,
    memoryClear,
    memoryRecall,
    memoryAdd,
    memorySubtract,
    memoryStore
  };
};
