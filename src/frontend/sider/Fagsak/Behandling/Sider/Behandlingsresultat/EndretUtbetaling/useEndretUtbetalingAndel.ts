import { useState } from 'react';

import deepEqual from 'deep-equal';

import { useHttp } from '@navikt/familie-http';
import type { Avhengigheter } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../../../typer/behandling';
import type { OptionType } from '../../../../../../typer/common';
import type { IRestEndretUtbetalingAndel } from '../../../../../../typer/utbetalingAndel';
import { IEndretUtbetalingAndelÅrsak } from '../../../../../../typer/utbetalingAndel';
import type { IsoDatoString } from '../../../../../../utils/dato';
import {
    dateTilIsoDatoStringEllerUndefined,
    erIsoStringGyldig,
    validerGyldigDato,
} from '../../../../../../utils/dato';
import { lagPersonLabel } from '../../../../../../utils/formatter';
import { useBehandlingContext } from '../../../context/BehandlingContext';
import type { Utbetaling } from '../Utbetaling';
import { prosentTilUtbetaling, utbetalingTilProsent } from '../Utbetaling';

export interface IEndretUtbetalingAndelSkjema {
    personer: OptionType[];
    fom: IsoDatoString | undefined;
    tom: IsoDatoString | undefined;
    utbetaling: Utbetaling | undefined;
    årsak: IEndretUtbetalingAndelÅrsak | undefined;
    søknadstidspunkt: Date | undefined;
    avtaletidspunktDeltBosted: Date | undefined;
    begrunnelse: string | undefined;
}

export const useEndretUtbetalingAndel = (
    lagretEndretUtbetalingAndel: IRestEndretUtbetalingAndel,
    åpenBehandling: IBehandling
) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandlingContext();

    const årsakFelt = useFelt<IEndretUtbetalingAndelÅrsak | undefined>({
        verdi: undefined,
        valideringsfunksjon: felt =>
            felt.verdi && Object.values(IEndretUtbetalingAndelÅrsak).includes(felt.verdi)
                ? ok(felt)
                : feil(felt, 'Du må velge en årsak'),
    });

    const utbetalingFelt = useFelt<Utbetaling | undefined>({
        verdi: undefined,
        valideringsfunksjon: felt => (felt.verdi ? ok(felt) : feil(felt, 'Du må velge utbetaling')),
        avhengigheter: årsakFelt,
        nullstillVedAvhengighetEndring: true,
    });

    const { skjema, kanSendeSkjema, onSubmit } = useSkjema<
        IEndretUtbetalingAndelSkjema,
        IBehandling
    >({
        felter: {
            personer: useFelt<OptionType[]>({
                verdi: [],
                valideringsfunksjon: felt =>
                    felt.verdi.length > 0 ? ok(felt) : feil(felt, 'Du må velge minst én person'),
            }),
            fom: useFelt<IsoDatoString | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    erIsoStringGyldig(felt.verdi) ? ok(felt) : feil(felt, 'Du må velge f.o.m-dato'),
            }),
            tom: useFelt<IsoDatoString | undefined>({
                verdi: undefined,
            }),
            utbetaling: utbetalingFelt,
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
            begrunnelse: useFelt<string | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må oppgi en begrunnelse.'),
            }),
        },
        skjemanavn: 'Endre utbetalingsperiode',
    });

    const personer = lagretEndretUtbetalingAndel.personIdenter.map(ident => ({
        value: ident,
        label: lagPersonLabel(ident, åpenBehandling.personer),
    }));

    const settFelterTilLagredeVerdier = () => {
        skjema.felter.personer.validerOgSettFelt(personer);
        skjema.felter.fom.validerOgSettFelt(lagretEndretUtbetalingAndel.fom);
        skjema.felter.tom.validerOgSettFelt(lagretEndretUtbetalingAndel.tom);
        skjema.felter.utbetaling.validerOgSettFelt(
            prosentTilUtbetaling(lagretEndretUtbetalingAndel.prosent)
        );
        skjema.felter.årsak.validerOgSettFelt(lagretEndretUtbetalingAndel.årsak);

        skjema.felter.begrunnelse.validerOgSettFelt(lagretEndretUtbetalingAndel.begrunnelse);

        skjema.felter.søknadstidspunkt.validerOgSettFelt(
            lagretEndretUtbetalingAndel.søknadstidspunkt
                ? new Date(lagretEndretUtbetalingAndel.søknadstidspunkt)
                : undefined
        );
        skjema.felter.avtaletidspunktDeltBosted.validerOgSettFelt(
            lagretEndretUtbetalingAndel.avtaletidspunktDeltBosted
                ? new Date(lagretEndretUtbetalingAndel.avtaletidspunktDeltBosted)
                : undefined
        );
    };

    const [forrigeEndretUtbetalingAndel, settForrigeEndretUtbetalingAndel] =
        useState<IRestEndretUtbetalingAndel>();

    if (lagretEndretUtbetalingAndel !== forrigeEndretUtbetalingAndel) {
        settForrigeEndretUtbetalingAndel(lagretEndretUtbetalingAndel);
        settFelterTilLagredeVerdier();
    }

    const hentSkjemaData = () => {
        const {
            personer,
            fom,
            tom,
            årsak,
            begrunnelse,
            søknadstidspunkt,
            avtaletidspunktDeltBosted,
        } = skjema.felter;
        return {
            id: lagretEndretUtbetalingAndel.id,
            personIdenter: personer.verdi.map(person => person.value),
            prosent: utbetalingTilProsent(skjema.felter.utbetaling.verdi),
            fom: fom && fom.verdi,
            tom: tom && tom.verdi,
            årsak: årsak && årsak.verdi,
            begrunnelse: begrunnelse.verdi,
            søknadstidspunkt: dateTilIsoDatoStringEllerUndefined(søknadstidspunkt.verdi),
            avtaletidspunktDeltBosted: dateTilIsoDatoStringEllerUndefined(
                avtaletidspunktDeltBosted.verdi
            ),
            erTilknyttetAndeler: lagretEndretUtbetalingAndel.erTilknyttetAndeler,
        };
    };

    const skjemaHarEndringerSomIkkeErLagret = () =>
        !deepEqual(
            {
                ...lagretEndretUtbetalingAndel,
                prosent:
                    typeof lagretEndretUtbetalingAndel.prosent === 'number'
                        ? lagretEndretUtbetalingAndel.prosent
                        : 0,
            },
            hentSkjemaData()
        );

    const oppdaterEndretUtbetaling = (onSuccess: () => void) => {
        if (kanSendeSkjema()) {
            onSubmit<IRestEndretUtbetalingAndel>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${lagretEndretUtbetalingAndel.id}`,
                    påvirkerSystemLaster: true,
                    data: hentSkjemaData(),
                },
                (behandling: Ressurs<IBehandling>) => {
                    if (behandling.status === RessursStatus.SUKSESS) {
                        onSuccess();
                        settÅpenBehandling(behandling);
                    }
                }
            );
        }
    };

    const slettEndretUtbetaling = () => {
        request<undefined, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${lagretEndretUtbetalingAndel.id}`,
            påvirkerSystemLaster: true,
        }).then((behandling: Ressurs<IBehandling>) => settÅpenBehandling(behandling));
    };

    return {
        skjema,
        settFelterTilLagredeVerdier,
        skjemaHarEndringerSomIkkeErLagret,
        oppdaterEndretUtbetaling,
        slettEndretUtbetaling,
    };
};
