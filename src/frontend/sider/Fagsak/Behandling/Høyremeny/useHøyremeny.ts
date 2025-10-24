import type { Dispatch, SetStateAction } from 'react';

import { LocalStorageKey, useLocalStorage } from '../../../../hooks/useLocalStorage';

export function useHøyremeny(): [boolean, Dispatch<SetStateAction<boolean>>] {
    const [erÅpen, settErÅpen] = useLocalStorage(LocalStorageKey.ER_HØYREMENY_ÅPEN, true);

    return [erÅpen, settErÅpen];
}
