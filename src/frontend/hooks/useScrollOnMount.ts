import { useRef, useEffect } from 'react';

export function useScrollOnMount<T extends HTMLElement = HTMLElement>(
    options: ScrollIntoViewOptions = { block: 'start' }
) {
    const ref = useRef<T>(null);
    const optionsRef = useRef(options);

    useEffect(() => {
        ref.current?.scrollIntoView(optionsRef.current);
    }, []);

    return ref;
}
