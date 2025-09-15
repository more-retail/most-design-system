import React from "react";

/**
 * Creates a throttled version of a callback that is guaranteed to be stable.
 * It will only invoke the callback at most once per `delay` milliseconds.
 * The last call will always be executed after the delay to ensure the final state is captured.
 */
export function useThrottledCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number,
) {
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = React.useRef<(...args: Args) => void>(callback);
  const lastArgsRef = React.useRef<Args | null>(null);

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return React.useCallback(
    (...args: Args) => {
      lastArgsRef.current = args;

      if (!timeoutRef.current) {
        callbackRef.current(...args);
        timeoutRef.current = setTimeout(() => {
          timeoutRef.current = null;
          if (lastArgsRef.current) {
            callbackRef.current(...lastArgsRef.current);
            lastArgsRef.current = null;
          }
        }, delay);
      }
    },
    [delay],
  );
}
