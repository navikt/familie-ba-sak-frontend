import { useEffect, useRef } from 'react';

/**
 * Kjører callback én gang når komponenten mountes, også i StrictMode.
 */
export function useOnMount(callback: () => void) {
    const hasRun = useRef(false);
    const callbackRef = useRef(callback);

    useEffect(() => {
        if (hasRun.current) {
            return;
        }
        hasRun.current = true;
        callbackRef.current();
    }, []);
}
