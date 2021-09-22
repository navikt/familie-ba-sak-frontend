import constate from 'constate';

import { OptionType } from '@navikt/familie-form-elements';
import { useSkjema, useFelt, feil, ok } from '@navikt/familie-skjema';

import { IFagsak } from '../typer/fagsak';
import { ÅrsakOption } from '../typer/utbetalingAndel';
import { FamilieIsoDate } from '../utils/kalender';

const [EndretUtbetalingAndelProvider, useEndretUtbetalingAndel] = constate(() => {
    const { skjema, kanSendeSkjema, onSubmit } = useSkjema<
        {
            id?: string;
            person: OptionType | undefined;
            fom: FamilieIsoDate | undefined;
            tom: FamilieIsoDate | undefined;
            periodeSkalUtbetalesTilSøker: boolean;
            årsak: ÅrsakOption | undefined;
            begrunnelse: string;
        },
        IFagsak
    >({
        felter: {
            id: useFelt<string | undefined>({
                verdi: undefined,
            }),
            person: useFelt<OptionType | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge en person'),
            }),
            fom: useFelt<FamilieIsoDate | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge f.o.m-dato'),
            }),
            tom: useFelt<FamilieIsoDate | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge t.o.m-dato'),
            }),
            periodeSkalUtbetalesTilSøker: useFelt<boolean>({
                verdi: false,
            }),
            årsak: useFelt<ÅrsakOption | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge en årsak'),
            }),
            begrunnelse: useFelt<string>({
                verdi: '',
            }),
        },
        skjemanavn: 'Endre utbetalingsperiode',
    });

    return {
        skjema,
        kanSendeSkjema,
        onSubmit,
    };
});

export { EndretUtbetalingAndelProvider, useEndretUtbetalingAndel };
