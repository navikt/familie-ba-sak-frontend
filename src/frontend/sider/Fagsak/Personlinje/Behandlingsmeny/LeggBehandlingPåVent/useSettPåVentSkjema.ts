import { useEffect } from 'react';

import { addDays } from 'date-fns';

import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';

import { hentAlleÅrsaker } from './settPåVentUtils';
import type { IBehandling, ISettPåVent, SettPåVentÅrsak } from '../../../../../typer/behandling';
import { dagensDato, validerGyldigDato } from '../../../../../utils/dato';

const STANDARD_ANTALL_DAGER_FRIST = 3 * 7;

export const useSettPåVentSkjema = (settPåVent: ISettPåVent | undefined) => {
    const standardfrist = addDays(dagensDato, STANDARD_ANTALL_DAGER_FRIST);
    const settPåVentFrist = settPåVent?.frist ? new Date(settPåVent?.frist) : undefined;

    const årsaker = hentAlleÅrsaker();

    const settPåVentSkjema = useSkjema<
        {
            frist: Date | undefined;
            årsak: SettPåVentÅrsak | undefined;
        },
        IBehandling
    >({
        felter: {
            frist: useFelt<Date | undefined>({
                verdi: undefined,
                valideringsfunksjon: validerGyldigDato,
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
        if (settPåVent) {
            settPåVentSkjema.skjema.felter.frist.validerOgSettFelt(settPåVentFrist);
            settPåVentSkjema.skjema.felter.årsak.validerOgSettFelt(settPåVent.årsak);
        } else {
            fyllInnStandardverdier();
        }
    }, []);

    return settPåVentSkjema;
};
