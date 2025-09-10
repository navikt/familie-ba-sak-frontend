import { useEffect } from 'react';

import { useSettAktivBrukerIModiaContext } from './useSettAktivBrukerIModiaContext';
import { useAppContext } from '../context/AppContext';
import type { IPersonInfo } from '../typer/person';
import { ToggleNavn } from '../typer/toggles';

export function useSyncModiaContext(bruker: IPersonInfo | undefined) {
    const { toggles } = useAppContext();
    const { mutate } = useSettAktivBrukerIModiaContext();

    const personIdent = bruker?.personIdent;

    useEffect(() => {
        if (personIdent === undefined) {
            return;
        }
        if (toggles[ToggleNavn.oppdaterModiaKontekst]) {
            mutate(personIdent);
        }
    }, [personIdent]);
}
