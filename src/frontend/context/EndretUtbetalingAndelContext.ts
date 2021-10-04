import createUseContext from 'constate';

import { Avhengigheter, feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';

import { IFagsak } from '../typer/fagsak';
import { IEndretUtbetalingAndelÅrsak, IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';
import { erIsoStringGyldig, FamilieIsoDate } from '../utils/kalender';

interface IProps {
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
}

const [EndretUtbetalingAndelProvider, useEndretUtbetalingAndel] = createUseContext(
    ({ endretUtbetalingAndel }: IProps) => {
        const årsakFelt = useFelt<IEndretUtbetalingAndelÅrsak | undefined>({
            verdi: endretUtbetalingAndel.årsak ? endretUtbetalingAndel.årsak : undefined,
            valideringsfunksjon: felt =>
                felt.verdi ? ok(felt) : feil(felt, 'Du må velge en årsak'),
        });

        const periodeSkalUtbetalesTilSøkerFelt = useFelt<boolean>({
            verdi: endretUtbetalingAndel.prosent !== undefined && endretUtbetalingAndel.prosent > 0,
        });

        const { skjema, kanSendeSkjema, onSubmit, nullstillSkjema } = useSkjema<
            {
                person: string | undefined;
                fom: FamilieIsoDate | undefined;
                tom: FamilieIsoDate | undefined;
                periodeSkalUtbetalesTilSøker: boolean;
                årsak: IEndretUtbetalingAndelÅrsak | undefined;
                søknadstidspunkt: FamilieIsoDate | undefined;
                avtaleOmDeltBosted: FamilieIsoDate | undefined;
                fullSats: boolean | undefined;
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
                periodeSkalUtbetalesTilSøker: periodeSkalUtbetalesTilSøkerFelt,
                årsak: årsakFelt,
                søknadstidspunkt: useFelt<FamilieIsoDate | undefined>({
                    verdi: endretUtbetalingAndel.søknadstidspunkt
                        ? endretUtbetalingAndel.søknadstidspunkt
                        : undefined,
                    valideringsfunksjon: felt =>
                        erIsoStringGyldig(felt.verdi)
                            ? ok(felt)
                            : feil(felt, 'Du må velge et søknadstidspunkt.'),
                }),
                avtaleOmDeltBosted: useFelt<FamilieIsoDate | undefined>({
                    verdi: endretUtbetalingAndel.avtaleOmDeltBosted
                        ? endretUtbetalingAndel.avtaleOmDeltBosted
                        : undefined,
                    avhengigheter: {
                        årsak: årsakFelt,
                    },
                    skalFeltetVises: (avhengigheter: Avhengigheter) =>
                        avhengigheter?.årsak.verdi === IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
                    valideringsfunksjon: felt =>
                        erIsoStringGyldig(felt.verdi)
                            ? ok(felt)
                            : feil(felt, 'Du må velge tidspunkt for avtale om delt bosted.'),
                }),
                fullSats: useFelt<boolean | undefined>({
                    verdi:
                        endretUtbetalingAndel.prosent !== undefined
                            ? endretUtbetalingAndel.prosent === 100
                            : undefined,
                    avhengigheter: {
                        årsak: årsakFelt,
                        periodeSkalUtbetalesTilSøker: periodeSkalUtbetalesTilSøkerFelt,
                    },
                    skalFeltetVises: (avhengigheter: Avhengigheter) =>
                        avhengigheter?.årsak.verdi === IEndretUtbetalingAndelÅrsak.DELT_BOSTED &&
                        periodeSkalUtbetalesTilSøkerFelt.verdi,
                    valideringsfunksjon: felt =>
                        felt.verdi
                            ? ok(felt)
                            : feil(felt, 'Du må velge om brukeren skal ha full sats eller ikke.'),
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
