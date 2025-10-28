import { useEffect } from 'react';

import { useSettAktivBrukerIModiaContext } from './useSettAktivBrukerIModiaContext';
import { useToggles } from './useToggles';
import type { IPersonInfo } from '../typer/person';
import { Toggle } from '../typer/toggles';

export function useSyncModiaContext(bruker: IPersonInfo | undefined) {
    const toggles = useToggles();
    const { mutate } = useSettAktivBrukerIModiaContext();

    const personIdent = bruker?.personIdent;

    useEffect(() => {
        if (personIdent === undefined) {
            return;
        }
        if (toggles[Toggle.oppdaterModiaKontekst]) {
            mutate(personIdent);
        }
    }, [personIdent]);
}
