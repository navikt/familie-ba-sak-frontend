import { FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { IFagsak } from '../../../../typer/fagsak';
import { useState } from 'react';

import { Periode } from '@navikt/helse-frontend-tidslinje';
import { IPersonMedAndelerTilkjentYtelse } from '../../../../typer/beregning';

export const useEndreUtbetalingAndelSkjema = (
    tidslinjePersoner: IPersonMedAndelerTilkjentYtelse[]
) => {
    const [feilmelding, settFeilmelding] = useState<string>();

    const åpneSkjema = (periode: Periode) => {
        settFeilmelding(undefined);

        const identOgPeriode = periode.id?.split('_');
        const valgtIdent = identOgPeriode?.length === 2 && identOgPeriode[0];
        const valgtPeriode = identOgPeriode?.length === 2 && identOgPeriode[1];
        const perioderForIdent = tidslinjePersoner.find(
            periode => periode.personIdent === valgtIdent
        )?.ytelsePerioder;

        if (perioderForIdent && valgtPeriode) {
            const periodePåTidslinje = perioderForIdent[Number(valgtPeriode)];
            skjema.felter.midlertidigFelt.validerOgSettFelt(
                `Under utvikling. Her kommer mulighet for å endre utbetaling for ${valgtIdent} periode ${periodePåTidslinje.stønadFom} - ${periodePåTidslinje.stønadTom}.`
            );
        } else {
            settFeilmelding('Under utvikling. Klarte ikke hente valgt periode.');
        }
    };

    const midlertidigFelt = useFelt({
        verdi: '',
        valideringsfunksjon: (felt: FeltState<string>) => ok(felt),
    });

    const { skjema } = useSkjema<
        {
            midlertidigFelt: string;
        },
        IFagsak
    >({
        felter: {
            midlertidigFelt,
        },
        skjemanavn: 'endreUtbetalingAndel',
    });

    return {
        skjema,
        feilmelding,
        åpneSkjema,
    };
};
