import createUseContext from 'constate';

import { OptionType } from '@navikt/familie-form-elements';
import { useSkjema, useFelt } from '@navikt/familie-skjema';

import { IFagsak } from '../typer/fagsak';
import { FamilieIsoDate } from '../utils/kalender';

const [EndreUtbetalingAndelProvider, useEndreUtbetalingAndel] = createUseContext(() => {
    const { skjema } = useSkjema<
        {
            person: OptionType | undefined;
            fom: string | undefined;
            tom: string | undefined;
            periodeSkalUtbetalesTilSøker: boolean;
            årsak: OptionType | undefined;
            begrunnelse: string;
        },
        IFagsak
    >({
        felter: {
            person: useFelt<{ label: string; value: string } | undefined>({
                verdi: undefined,
            }),
            fom: useFelt<FamilieIsoDate | undefined>({
                verdi: undefined,
            }),
            tom: useFelt<FamilieIsoDate | undefined>({
                verdi: undefined,
            }),
            periodeSkalUtbetalesTilSøker: useFelt<boolean>({
                verdi: false,
            }),
            årsak: useFelt<{ label: string; value: string } | undefined>({
                verdi: undefined,
            }),
            begrunnelse: useFelt<string>({
                verdi: '',
            }),
        },
        skjemanavn: 'Endre utbetalingsperiode',
    });

    return {
        skjema,
    };
});

export { EndreUtbetalingAndelProvider, useEndreUtbetalingAndel };
