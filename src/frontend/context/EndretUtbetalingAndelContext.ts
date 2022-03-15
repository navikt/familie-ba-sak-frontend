import createUseContext from 'constate';

import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Avhengigheter } from '@navikt/familie-skjema';

import type { IBehandling } from '../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';
import { IEndretUtbetalingAndelÅrsak } from '../typer/utbetalingAndel';
import type { FamilieIsoDate } from '../utils/kalender';
import { erIsoStringGyldig } from '../utils/kalender';

interface IProps {
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
}

const [EndretUtbetalingAndelProvider, useEndretUtbetalingAndel] = createUseContext(
    ({ endretUtbetalingAndel }: IProps) => {
        const årsakFelt = useFelt<IEndretUtbetalingAndelÅrsak | undefined>({
            verdi: endretUtbetalingAndel.årsak ? endretUtbetalingAndel.årsak : undefined,
            valideringsfunksjon: felt =>
                felt.verdi && Object.values(IEndretUtbetalingAndelÅrsak).includes(felt.verdi)
                    ? ok(felt)
                    : feil(felt, 'Du må velge en årsak'),
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
                avtaletidspunktDeltBosted: FamilieIsoDate | undefined;
                fullSats: boolean | undefined;
                begrunnelse: string | undefined;
            },
            IBehandling
        >({
            felter: {
                person: useFelt<string | undefined>({
                    verdi: endretUtbetalingAndel.personIdent,
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
                }),
                periodeSkalUtbetalesTilSøker: periodeSkalUtbetalesTilSøkerFelt,
                årsak: årsakFelt,
                søknadstidspunkt: useFelt<FamilieIsoDate | undefined>({
                    verdi: endretUtbetalingAndel.søknadstidspunkt,
                    valideringsfunksjon: felt =>
                        erIsoStringGyldig(felt.verdi)
                            ? ok(felt)
                            : feil(felt, 'Du må velge et søknadstidspunkt.'),
                }),
                avtaletidspunktDeltBosted: useFelt<FamilieIsoDate | undefined>({
                    verdi: endretUtbetalingAndel.avtaletidspunktDeltBosted,
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
                        endretUtbetalingAndel.prosent !== null &&
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
                    valideringsfunksjon: (felt, avhengigheter) => {
                        const feilmelding = 'Du må velge om brukeren skal ha full sats eller ikke.';
                        if (avhengigheter?.årsak.verdi === IEndretUtbetalingAndelÅrsak.DELT_BOSTED)
                            return felt.verdi ? ok(felt) : feil(felt, feilmelding);
                        else
                            return typeof felt.verdi === 'boolean'
                                ? ok(felt)
                                : feil(felt, feilmelding);
                    },
                }),
                begrunnelse: useFelt<string | undefined>({
                    verdi: endretUtbetalingAndel.begrunnelse,
                    valideringsfunksjon: felt =>
                        felt.verdi ? ok(felt) : feil(felt, 'Du må oppgi en begrunnelse.'),
                }),
            },
            skjemanavn: 'Endre utbetalingsperiode',
        });

        const hentProsentForEndretUtbetaling = () => {
            return (
                (skjema.felter.periodeSkalUtbetalesTilSøker.verdi ? 100 : 0) /
                (skjema.felter.fullSats.verdi ? 1 : 2)
            );
        };

        const hentSkjemaData = () => {
            const {
                person,
                fom,
                tom,
                årsak,
                begrunnelse,
                søknadstidspunkt,
                avtaletidspunktDeltBosted,
            } = skjema.felter;
            return {
                id: endretUtbetalingAndel.id,
                personIdent: person && person.verdi,
                prosent: hentProsentForEndretUtbetaling(),
                fom: fom && fom.verdi,
                tom: tom && tom.verdi,
                årsak: årsak && årsak.verdi,
                begrunnelse: begrunnelse.verdi,
                søknadstidspunkt: søknadstidspunkt.verdi,
                avtaletidspunktDeltBosted: avtaletidspunktDeltBosted.verdi,
                erTilknyttetAndeler: endretUtbetalingAndel.erTilknyttetAndeler,
            };
        };

        return {
            endretUtbetalingAndel,
            skjema,
            kanSendeSkjema,
            onSubmit,
            nullstillSkjema,
            hentSkjemaData,
        };
    }
);

export { EndretUtbetalingAndelProvider, useEndretUtbetalingAndel };
