import { useEffect, useRef } from 'react';

import { useSettAktivBrukerIModiaContext } from './useSettAktivBrukerIModiaContext';
import { useAppContext } from '../context/AppContext';
import type { IPersonInfo } from '../typer/person';
import { ToggleNavn } from '../typer/toggles';

export function useSyncModiaContext(bruker: IPersonInfo | undefined) {
    const { toggles } = useAppContext();
    const { mutate } = useSettAktivBrukerIModiaContext();

    const sattPersonIdent = useRef<string | undefined>(undefined);

    useEffect(() => {
        if (bruker === undefined || sattPersonIdent.current === bruker.personIdent) {
            return;
        }
        if (toggles[ToggleNavn.oppdaterModiaKontekst]) {
            mutate(bruker.personIdent);
            sattPersonIdent.current = bruker.personIdent;
        }
    }, [bruker]);
}
