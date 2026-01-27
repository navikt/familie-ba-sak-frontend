import { useEffect } from 'react';

import { useSettAktivBrukerIModiaContext } from './useSettAktivBrukerIModiaContext';
import type { IPersonInfo } from '../typer/person';

export function useSyncModiaContext(bruker: IPersonInfo | undefined) {
    const { mutate } = useSettAktivBrukerIModiaContext();

    const personIdent = bruker?.personIdent;

    useEffect(() => {
        if (personIdent === undefined) {
            return;
        }
        mutate(personIdent);
    }, [personIdent]);
}
