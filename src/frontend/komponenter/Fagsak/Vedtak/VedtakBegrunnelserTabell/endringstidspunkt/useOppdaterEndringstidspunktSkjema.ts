import { useEffect } from 'react';

import { addDays } from 'date-fns';

import { useFelt, useSkjema } from '@navikt/familie-skjema';

import type { IBehandling } from '../../../../../typer/behandling';
import { dagensDato, validerGyldigDato } from '../../../../../utils/dato';

const STANDARD_ANTALL_DAGER_FRIST = 3 * 7;

export const useOppdaterEndringstidspunktSkjema = (endringstidspunkt: Date | undefined) => {
    const standardfrist = addDays(dagensDato(), STANDARD_ANTALL_DAGER_FRIST);

    const oppdaterEndringstidspunktSkjema = useSkjema<
        {
            endringstidspunkt: Date | undefined;
        },
        IBehandling
    >({
        felter: {
            endringstidspunkt: useFelt<Date | undefined>({
                verdi: undefined,
                valideringsfunksjon: validerGyldigDato,
            }),
        },
        skjemanavn: 'Oppdater første endringstidspunkt',
    });

    const fyllInnStandardverdier = () => {
        oppdaterEndringstidspunktSkjema.nullstillSkjema();
        oppdaterEndringstidspunktSkjema.skjema.felter.endringstidspunkt.validerOgSettFelt(
            standardfrist
        );
    };

    useEffect(() => {
        if (endringstidspunkt) {
            oppdaterEndringstidspunktSkjema.skjema.felter.endringstidspunkt.validerOgSettFelt(
                endringstidspunkt
            );
        } else {
            fyllInnStandardverdier();
        }
    }, []);

    return oppdaterEndringstidspunktSkjema;
};
