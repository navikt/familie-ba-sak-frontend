import createUseContext from 'constate';

import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';

import { IFagsak } from '../typer/fagsak';
import { IEndretUtbetalingAndelÅrsak, IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';
import { erIsoStringGyldig, FamilieIsoDate } from '../utils/kalender';

interface IProps {
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
}

const [EndretUtbetalingAndelProvider, useEndretUtbetalingAndel] = createUseContext(
    ({ endretUtbetalingAndel }: IProps) => {
        const { skjema, kanSendeSkjema, onSubmit, nullstillSkjema } = useSkjema<
            {
                person: string | undefined;
                fom: FamilieIsoDate | undefined;
                tom: FamilieIsoDate | undefined;
                periodeSkalUtbetalesTilSøker: boolean;
                fullSats: boolean | undefined;
                årsak: IEndretUtbetalingAndelÅrsak | undefined;
                begrunnelse: string;
            },
            IFagsak
        >({
            felter: {
                person: useFelt<string | undefined>({
                    verdi: endretUtbetalingAndel
                        ? endretUtbetalingAndel.personIdent
                            ? endretUtbetalingAndel.personIdent
                            : undefined
                        : undefined,
                    valideringsfunksjon: felt =>
                        felt.verdi ? ok(felt) : feil(felt, 'Du må velge en person'),
                }),
                fom: useFelt<FamilieIsoDate | undefined>({
                    verdi: endretUtbetalingAndel.fom,
                    valideringsfunksjon: felt =>
                        erIsoStringGyldig(felt.verdi)
                            ? ok(felt)
                            : feil(felt, 'Du må velge f.o.m-dato'),
                }),
                tom: useFelt<FamilieIsoDate | undefined>({
                    verdi: endretUtbetalingAndel.tom,
                    valideringsfunksjon: felt =>
                        erIsoStringGyldig(felt.verdi)
                            ? ok(felt)
                            : feil(felt, 'Du må velge t.o.m-dato'),
                }),
                periodeSkalUtbetalesTilSøker: useFelt<boolean>({
                    verdi:
                        endretUtbetalingAndel.prosent !== undefined &&
                        endretUtbetalingAndel.prosent > 0,
                }),
                fullSats: useFelt<boolean | undefined>({
                    verdi:
                        endretUtbetalingAndel.prosent !== undefined
                            ? endretUtbetalingAndel.prosent === 100
                            : undefined,
                }),
                årsak: useFelt<IEndretUtbetalingAndelÅrsak | undefined>({
                    verdi: endretUtbetalingAndel.årsak ? endretUtbetalingAndel.årsak : undefined,
                    valideringsfunksjon: felt =>
                        felt.verdi ? ok(felt) : feil(felt, 'Du må velge en årsak'),
                }),
                begrunnelse: useFelt<string>({
                    verdi: endretUtbetalingAndel.begrunnelse
                        ? endretUtbetalingAndel.begrunnelse
                        : '',
                }),
            },
            skjemanavn: 'Endre utbetalingsperiode',
        });

        return { endretUtbetalingAndel, skjema, kanSendeSkjema, onSubmit, nullstillSkjema };
    }
);

export { EndretUtbetalingAndelProvider, useEndretUtbetalingAndel };
