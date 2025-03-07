import { useState } from 'react';

import deepEqual from 'deep-equal';

import { useHttp } from '@navikt/familie-http';
import type { Avhengigheter } from '@navikt/familie-skjema';
import { feil, ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import { RessursStatus, type Ressurs } from '@navikt/familie-typer';

import type { Utbetaling } from '../komponenter/Fagsak/Behandlingsresultat/Utbetaling';
import {
    prosentTilUtbetaling,
    utbetalingTilProsent,
} from '../komponenter/Fagsak/Behandlingsresultat/Utbetaling';
import type { IBehandling } from '../typer/behandling';
import type { IRestEndretUtbetalingAndel } from '../typer/utbetalingAndel';
import { IEndretUtbetalingAndelÅrsak } from '../typer/utbetalingAndel';
import type { IsoDatoString } from '../utils/dato';
import {
    dateTilIsoDatoStringEllerUndefined,
    erIsoStringGyldig,
    validerGyldigDato,
} from '../utils/dato';
import { useBehandling } from './behandlingContext/BehandlingContext';

export interface IEndretUtbetalingAndelSkjema {
    person: string | undefined;
    fom: IsoDatoString | undefined;
    tom: IsoDatoString | undefined;
    utbetaling: Utbetaling | undefined;
    årsak: IEndretUtbetalingAndelÅrsak | undefined;
    søknadstidspunkt: Date | undefined;
    avtaletidspunktDeltBosted: Date | undefined;
    begrunnelse: string | undefined;
}

export const useEndretUtbetalingAndel = (
    endretUtbetalingAndel: IRestEndretUtbetalingAndel,
    åpenBehandling: IBehandling
) => {
    const { request } = useHttp();
    const { settÅpenBehandling } = useBehandling();

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
            person: useFelt<string | undefined>({
                verdi: undefined,
                valideringsfunksjon: felt =>
                    felt.verdi ? ok(felt) : feil(felt, 'Du må velge en person'),
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

    const settFelterTilDefault = () => {
        skjema.felter.person.validerOgSettFelt(endretUtbetalingAndel.personIdent);
        skjema.felter.fom.validerOgSettFelt(endretUtbetalingAndel.fom);
        skjema.felter.tom.validerOgSettFelt(endretUtbetalingAndel.tom);
        skjema.felter.utbetaling.validerOgSettFelt(
            prosentTilUtbetaling(endretUtbetalingAndel.prosent)
        );
        skjema.felter.årsak.validerOgSettFelt(endretUtbetalingAndel.årsak);

        skjema.felter.begrunnelse.validerOgSettFelt(endretUtbetalingAndel.begrunnelse);

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
        settFelterTilDefault();
    }

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
            prosent: utbetalingTilProsent(skjema.felter.utbetaling.verdi),
            fom: fom && fom.verdi,
            tom: tom && tom.verdi,
            årsak: årsak && årsak.verdi,
            begrunnelse: begrunnelse.verdi,
            søknadstidspunkt: dateTilIsoDatoStringEllerUndefined(søknadstidspunkt.verdi),
            avtaletidspunktDeltBosted: dateTilIsoDatoStringEllerUndefined(
                avtaletidspunktDeltBosted.verdi
            ),
            erTilknyttetAndeler: endretUtbetalingAndel.erTilknyttetAndeler,
        };
    };

    const skjemaHarEndringerSomIkkeErLagret = () =>
        !deepEqual(
            {
                ...endretUtbetalingAndel,
                prosent:
                    typeof endretUtbetalingAndel.prosent === 'number'
                        ? endretUtbetalingAndel.prosent
                        : 0,
            },
            hentSkjemaData()
        );

    const oppdaterEndretUtbetaling = (avbrytEndringAvUtbetalingsperiode: () => void) => {
        if (kanSendeSkjema()) {
            onSubmit<IRestEndretUtbetalingAndel>(
                {
                    method: 'PUT',
                    url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${endretUtbetalingAndel.id}`,
                    påvirkerSystemLaster: true,
                    data: hentSkjemaData(),
                },
                (behandling: Ressurs<IBehandling>) => {
                    if (behandling.status === RessursStatus.SUKSESS) {
                        avbrytEndringAvUtbetalingsperiode();
                        settÅpenBehandling(behandling);
                    }
                }
            );
        }
    };

    const slettEndretUtbetaling = () => {
        request<undefined, IBehandling>({
            method: 'DELETE',
            url: `/familie-ba-sak/api/endretutbetalingandel/${åpenBehandling.behandlingId}/${endretUtbetalingAndel.id}`,
            påvirkerSystemLaster: true,
        }).then((behandling: Ressurs<IBehandling>) => settÅpenBehandling(behandling));
    };

    return {
        skjema,
        settFelterTilDefault,
        skjemaHarEndringerSomIkkeErLagret,
        oppdaterEndretUtbetaling,
        slettEndretUtbetaling,
    };
};
