import constate from 'constate';

import { OptionType } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { useSkjema, useFelt, feil, ok } from '@navikt/familie-skjema';

import { IBehandling } from '../typer/behandling';
import { IFagsak } from '../typer/fagsak';
import { ÅrsakOption } from '../typer/utbetalingAndel';
import { FamilieIsoDate } from '../utils/kalender';

interface IProps {
    åpenBehandling: IBehandling;
}

const [EndretUtbetalingAndelProvider, useEndretUtbetalingAndel] = constate(
    ({ åpenBehandling }: IProps) => {
        const { skjema, kanSendeSkjema, onSubmit } = useSkjema<
            {
                person: OptionType | undefined;
                fom: string | undefined;
                tom: string | undefined;
                periodeSkalUtbetalesTilSøker: boolean;
                årsak: ÅrsakOption | undefined;
                begrunnelse: string;
            },
            IFagsak
        >({
            felter: {
                person: useFelt<OptionType | undefined>({
                    verdi: undefined,
                    valideringsfunksjon: felt =>
                        felt !== null ? ok(felt) : feil(felt, 'Du må velge en person'),
                }),
                fom: useFelt<FamilieIsoDate | undefined>({
                    verdi: undefined,
                    valideringsfunksjon: felt =>
                        felt !== null ? ok(felt) : feil(felt, 'Du må velge T.o.m-dato'),
                }),
                tom: useFelt<FamilieIsoDate | undefined>({
                    verdi: undefined,
                    valideringsfunksjon: felt =>
                        felt !== null ? ok(felt) : feil(felt, 'Du må velge F.o.m-dato'),
                }),
                periodeSkalUtbetalesTilSøker: useFelt<boolean>({
                    verdi: false,
                }),
                årsak: useFelt<ÅrsakOption | undefined>({
                    verdi: undefined,
                    valideringsfunksjon: felt =>
                        felt !== null ? ok(felt) : feil(felt, 'Du må velge en årsak'),
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
    }
);

export { EndretUtbetalingAndelProvider, useEndretUtbetalingAndel };
