import { useState } from 'react';

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
   * Memory Add (M+) - Add current value to memory
   */
  const memoryAdd = (value) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setMemoryValue(prev => {
        if (prev === null) return num;
        return prev + num;
      });
    }
  };

  /**
   * Memory Subtract (M−) - Subtract current value from memory
   */
  const memorySubtract = (value) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setMemoryValue(prev => {
        if (prev === null) return -num;
        return prev - num;
      });
    }
  };

  /**
   * Memory Store (MS) - Store current value in memory
   */
  const memoryStore = (value) => {
    const num = parseFloat(value);
    if (!isNaN(num)) {
      setMemoryValue(num);
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
