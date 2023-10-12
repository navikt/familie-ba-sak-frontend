import { useEffect } from 'react';

import { addDays, isValid } from 'date-fns';

import type { FeltState } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';

import { hentAlleÅrsaker } from './settPåVentUtils';
import type { IBehandling, ISettPåVent, SettPåVentÅrsak } from '../../../../../typer/behandling';
import { dagensDato } from '../../../../../utils/dato';

const STANDARD_ANTALL_DAGER_FRIST = 3 * 7;

export const useSettPåVentSkjema = (settPåVent: ISettPåVent | undefined, modalVises: boolean) => {
    const standardfrist = addDays(dagensDato(), STANDARD_ANTALL_DAGER_FRIST);
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
                verdi: settPåVentFrist ?? standardfrist,
                valideringsfunksjon: (felt: FeltState<Date | undefined>) => {
                    return felt.verdi && isValid(felt.verdi)
                        ? ok(felt)
                        : feil(felt, 'Du må sette en gyldig frist');
                },
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
            settPåVentSkjema.skjema.felter.frist.validerOgSettFelt(settPåVentFrist);
            settPåVentSkjema.skjema.felter.årsak.validerOgSettFelt(settPåVent.årsak);
        } else {
            fyllInnStandardverdier();
        }
    }, [modalVises]);

    return settPåVentSkjema;
};
