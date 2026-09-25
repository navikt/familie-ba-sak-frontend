import { useCallback, useState } from 'react';

export function useDialog(initialErÅpen: boolean = false) {
    const [åpen, settÅpen] = useState(initialErÅpen);

    const åpne = useCallback(() => {
        settÅpen(true);
    }, []);

    const lukk = useCallback(() => {
        settÅpen(false);
    }, []);

    return { åpen, åpne, lukk };
}
