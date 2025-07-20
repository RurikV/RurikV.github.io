import { useMemo, useRef } from 'react';

export type Callback = (...args: unknown[]) => unknown;

/**
 * Alternative to useCallback that gets all dependencies from closure.
 * Based on Dan Abramov's RFC: https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 * This implementation differs slightly from the original but works just as well.
 */
export const useEvent = <T extends Callback = Callback>(callback: T): T => {
  const copy = useRef<T>(callback);
  copy.current = callback;

  return useMemo<T>(() => ((...args) => copy.current?.(...args)) as T, []);
};
