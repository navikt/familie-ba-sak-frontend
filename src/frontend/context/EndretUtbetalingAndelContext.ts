import { useState } from 'react';

import createUseContext from 'constate';

import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Avhengigheter } from '@navikt/familie-skjema';

import type { IBehandling } from '../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';
import { IEndretUtbetalingAndelÅrsak } from '../typer/utbetalingAndel';
import { dateTilIsoStringEllerUndefined, validerGyldigDato } from '../utils/dato';
import type { FamilieIsoDate } from '../utils/kalender';
import { erIsoStringGyldig } from '../utils/kalender';

interface IProps {
    endretUtbetalingAndel: IRestEndretUtbetalingAndel;
}

const [EndretUtbetalingAndelProvider, useEndretUtbetalingAndel] = createUseContext(
    ({ endretUtbetalingAndel }: IProps) => {
        const årsakFelt = useFelt<IEndretUtbetalingAndelÅrsak | undefined>({
            verdi: endretUtbetalingAndel.årsak,
            valideringsfunksjon: felt =>
                felt.verdi && Object.values(IEndretUtbetalingAndelÅrsak).includes(felt.verdi)
                    ? ok(felt)
                    : feil(felt, 'Du må velge en årsak'),
        });

        const periodeSkalUtbetalesTilSøkerFelt = useFelt<boolean | undefined>({
            verdi:
                endretUtbetalingAndel.prosent === undefined ||
                endretUtbetalingAndel.prosent === null
                    ? undefined
                    : endretUtbetalingAndel.prosent > 0,
        });

        const { skjema, kanSendeSkjema, onSubmit, nullstillSkjema } = useSkjema<
            {
                person: string | undefined;
                fom: FamilieIsoDate | undefined;
                tom: FamilieIsoDate | undefined;
                periodeSkalUtbetalesTilSøker: boolean | undefined;
                årsak: IEndretUtbetalingAndelÅrsak | undefined;
                søknadstidspunkt: Date | undefined;
                avtaletidspunktDeltBosted: Date | undefined;
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
                søknadstidspunkt: useFelt<Date | undefined>({
                    verdi: undefined,
                    valideringsfunksjon: validerGyldigDato,
                }),
                avtaletidspunktDeltBosted: useFelt<Date | undefined>({
                    verdi: undefined,
                    avhengigheter: {
                        årsak: årsakFelt,
                    },
                    nullstillVedAvhengighetEndring: false,
                    skalFeltetVises: (avhengigheter: Avhengigheter) =>
                        avhengigheter?.årsak.verdi === IEndretUtbetalingAndelÅrsak.DELT_BOSTED,
                    valideringsfunksjon: validerGyldigDato,
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
                        periodeSkalUtbetalesTilSøkerFelt.verdi === true,
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

        const settDatofelterTilDefaultverdier = () => {
            skjema.felter.søknadstidspunkt.validerOgSettFelt(
                endretUtbetalingAndel.søknadstidspunkt
                    ? new Date(endretUtbetalingAndel.søknadstidspunkt)
                    : undefined
            );
            skjema.felter.avtaletidspunktDeltBosted.validerOgSettFelt(
                endretUtbetalingAndel.avtaletidspunktDeltBosted
                    ? new Date(endretUtbetalingAndel.avtaletidspunktDeltBosted)
                    : undefined
            );
        };

        const [forrigeEndretUtbetalingAndel, settForrigeEndretUtbetalingAndel] =
            useState<IRestEndretUtbetalingAndel>();

        if (endretUtbetalingAndel !== forrigeEndretUtbetalingAndel) {
            settForrigeEndretUtbetalingAndel(endretUtbetalingAndel);
            settDatofelterTilDefaultverdier();
        }

        const tilbakestillFelterTilDefault = () => {
            nullstillSkjema();
            settDatofelterTilDefaultverdier();
        };

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
                søknadstidspunkt: dateTilIsoStringEllerUndefined(søknadstidspunkt.verdi),
                avtaletidspunktDeltBosted: dateTilIsoStringEllerUndefined(
                    avtaletidspunktDeltBosted.verdi
                ),
                erTilknyttetAndeler: endretUtbetalingAndel.erTilknyttetAndeler,
            };
        };

        return {
            endretUtbetalingAndel,
            skjema,
            kanSendeSkjema,
            onSubmit,
            hentSkjemaData,
            tilbakestillFelterTilDefault,
        };
    }
);

export { EndretUtbetalingAndelProvider, useEndretUtbetalingAndel };
