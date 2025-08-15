import { useEffect, useRef } from 'react';

/**
 * {@link usePrevious} stores the previous value of a state in a ref. It returns undefined on initial render and the
 * previous value of a state after rerender:
 *
 *  @param value - The value to be stored.
 */
export function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>(undefined);

    useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
}
