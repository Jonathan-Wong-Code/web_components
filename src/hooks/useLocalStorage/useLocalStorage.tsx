import { useState, useEffect, useRef } from 'react';

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [state, setState] = useState<any>(() => {
    const valueInStorage = window.localStorage.getItem(key);
    if (valueInStorage) {
      return JSON.parse(valueInStorage)
    }
    // if default value is a function in case expensive, call it
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const prevKeyRef = useRef(key);

  useEffect(() => {
    // Check if keys match
    const prevKey = prevKeyRef.current;
    if (key !== prevKey) {
      window.localStorage.removeItem(key);
    }

    prevKeyRef.current = key;
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}