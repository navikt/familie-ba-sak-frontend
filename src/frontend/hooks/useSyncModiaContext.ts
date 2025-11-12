import { useEffect } from 'react';

import { useFeatureToggles } from './useFeatureToggles';
import { useSettAktivBrukerIModiaContext } from './useSettAktivBrukerIModiaContext';
import { FeatureToggle } from '../typer/featureToggles';
import type { IPersonInfo } from '../typer/person';

export function useSyncModiaContext(bruker: IPersonInfo | undefined) {
    const toggles = useFeatureToggles();
    const { mutate } = useSettAktivBrukerIModiaContext();

    const personIdent = bruker?.personIdent;

    useEffect(() => {
        if (personIdent === undefined) {
            return;
        }
        if (toggles[FeatureToggle.oppdaterModiaKontekst]) {
            mutate(personIdent);
        }
    }, [personIdent]);
}
