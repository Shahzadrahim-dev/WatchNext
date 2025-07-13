import { useState, useEffect } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null
        ? JSON.parse(item)
        : initialValue;
    } catch (err) {
      console.error(err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const data = window.localStorage.getItem(key);
      const parsed = JSON.parse(data) || {};
      const merged = { ...parsed, ...value };

      window.localStorage.setItem(
        key,
        JSON.stringify(merged),
      );
    } catch (err) {
      console.error(err);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
