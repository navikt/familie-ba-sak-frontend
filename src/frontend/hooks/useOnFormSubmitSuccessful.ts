import { useEffect, useRef } from 'react';

import type { Control, FieldValues } from 'react-hook-form';
import { useFormState } from 'react-hook-form';

export function useOnFormSubmitSuccessful<T extends FieldValues, U extends FieldValues>(
    control: Control<T, unknown, U>,
    callback: () => void
) {
    const { isSubmitSuccessful } = useFormState<T, U>({ control });

    const callbackRef = useRef(callback);
    callbackRef.current = callback;

    useEffect(() => {
        // It's recommended to reset inside useEffect after submission,
        // see https://react-hook-form.com/docs/useform/reset.
        if (isSubmitSuccessful) {
            callbackRef.current();
        }
    }, [isSubmitSuccessful]);
}
