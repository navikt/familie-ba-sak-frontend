import type { Dispatch, SetStateAction } from 'react';

import { Key, useSessionStorage } from '../../../../hooks/useSessionStorage';

export function useVenstremeny(): [boolean, Dispatch<SetStateAction<boolean>>] {
    const [erÅpen, settErÅpen] = useSessionStorage(Key.ER_VENSTREMENY_ÅPEN, true);

    return [erÅpen, settErÅpen];
}
