import { useState } from 'react';

import { FeltState, ok, useFelt, useSkjema } from '@navikt/familie-skjema';

import { IFagsak } from '../../../../typer/fagsak';

export const useEndreUtbetalingAndelSkjema = () => {
    const [feilmelding, settFeilmelding] = useState<string>();

    const åpneSkjema = () => {
        settFeilmelding(undefined);
        if (feilmelding === 'test') {
            skjema.felter.midlertidigFelt.validerOgSettFelt('Verdi');
        } else {
            settFeilmelding('Under utvikling.');
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
