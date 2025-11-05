import { useCallback, useState } from 'react';

export function useToggle(initialState: boolean = false): [boolean, () => void] {
    const [value, setValue] = useState(initialState);

    const toggle = useCallback(() => {
        setValue(prevValue => !prevValue);
    }, []);

    return [value, toggle];
}
