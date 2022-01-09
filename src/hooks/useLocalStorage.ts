import { useState, useEffect, useCallback } from 'react';

export default function useLocalStorage<T>(key: string, defaultValue: T) {
  const getItem = useCallback(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored !== null) return JSON.parse(stored);
      return defaultValue;
    } catch {
      return defaultValue;
    }
  }, [key, defaultValue]);

  const [value, setValue] = useState(getItem);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
