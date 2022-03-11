import { useEffect } from 'react';

import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';

import type { IBehandling, ISettPåVent, SettPåVentÅrsak } from '../../../../../typer/behandling';
import type { FamilieIsoDate } from '../../../../../utils/kalender';
import {
    iDag,
    KalenderEnhet,
    leggTil,
    serializeIso8601String,
} from '../../../../../utils/kalender';
import { hentAlleÅrsaker, validerSettPåVentFrist } from './settPåVentUtils';

const STANDARD_ANTALL_DAGER_FRIST = 3 * 7;

export const useSettPåVentSkjema = (settPåVent: ISettPåVent | undefined, modalVises: boolean) => {
    const standardfrist = serializeIso8601String(
        leggTil(iDag(), STANDARD_ANTALL_DAGER_FRIST, KalenderEnhet.DAG)
    );
    const årsaker = hentAlleÅrsaker();

    const settPåVentSkjema = useSkjema<
        {
            frist: FamilieIsoDate | undefined;
            årsak: SettPåVentÅrsak | undefined;
        },
        IBehandling
    >({
        felter: {
            frist: useFelt<FamilieIsoDate | undefined>({
                verdi: settPåVent?.frist ?? standardfrist,
                valideringsfunksjon: validerSettPåVentFrist,
            }),
            årsak: useFelt<SettPåVentÅrsak | undefined>({
                verdi: settPåVent?.årsak ?? undefined,
                valideringsfunksjon: felt =>
                    felt.verdi === undefined || !årsaker.includes(felt.verdi)
                        ? feil(felt, 'Du må velge en årsak')
                        : ok(felt),
            }),
        },
        skjemanavn: 'Sett behandling på vent',
    });

    const fyllInnStandardverdier = () => {
        settPåVentSkjema.nullstillSkjema();
        settPåVentSkjema.skjema.felter.frist.validerOgSettFelt(standardfrist);
        settPåVentSkjema.skjema.felter.årsak.validerOgSettFelt(undefined);
    };

    useEffect(() => {
        if (modalVises && settPåVent) {
            settPåVentSkjema.skjema.felter.frist.validerOgSettFelt(settPåVent.frist);
            settPåVentSkjema.skjema.felter.årsak.validerOgSettFelt(settPåVent.årsak);
        } else {
            fyllInnStandardverdier();
        }
    }, [modalVises]);

    return settPåVentSkjema;
};
