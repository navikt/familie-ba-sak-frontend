import { useEffect } from 'react';
import type { IPersonInfo } from '../typer/person';
import { useSettAktivBrukerIModiaContext } from './useSettAktivBrukerIModiaContext';

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
