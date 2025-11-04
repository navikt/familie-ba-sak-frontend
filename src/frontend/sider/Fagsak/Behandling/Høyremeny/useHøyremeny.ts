import type { Dispatch, SetStateAction } from 'react';

import { Key, useSessionStorage } from '../../../../hooks/useSessionStorage';

export function useHøyremeny(): [boolean, Dispatch<SetStateAction<boolean>>] {
    const [erÅpen, settErÅpen] = useSessionStorage(Key.ER_HØYREMENY_ÅPEN, true);

    return [erÅpen, settErÅpen];
}
