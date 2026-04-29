import { useState, useEffect } from 'react';

/**
 * useDebounce - Delays updating a value until after a specified delay.
 * Useful for search inputs, API calls on user typing, etc.
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 */
const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel timer if value changes before delay completes
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
