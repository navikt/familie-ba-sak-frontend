import type { Dispatch, SetStateAction } from 'react';

import { LocalStorageKey, useLocalStorage } from '../../../../hooks/useLocalStorage';

export function useVenstremeny(): [boolean, Dispatch<SetStateAction<boolean>>] {
    const [erÅpen, settErÅpen] = useLocalStorage(LocalStorageKey.ER_VENSTREMENY_ÅPEN, true);

    return [erÅpen, settErÅpen];
}
