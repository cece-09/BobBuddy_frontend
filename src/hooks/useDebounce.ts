import { useCallback, useEffect } from 'react';

const useDebounce = <T extends string | number | undefined | boolean | null>(
  value: T,
  delay: number,
  callbackFn: (value: T) => void,
) => {
  const callback = useCallback((value: T) => {
    callbackFn(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);
};

export default useDebounce;
