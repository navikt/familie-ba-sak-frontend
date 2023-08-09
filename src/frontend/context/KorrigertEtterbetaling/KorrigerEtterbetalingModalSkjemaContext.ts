import { useEffect, useState } from 'react';

import type { OptionType } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { useFelt, useSkjema, Valideringsstatus } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { RessursStatus, byggTomRessurs } from '@navikt/familie-typer';

import {
    erÅrsakForKorrigeringGyldig,
    erEtterbetalingsbeløpGyldig,
} from './ValideringKorrigertEtterbetaling';
import { ToastTyper, AlertType } from '../../komponenter/Felleskomponenter/Toast/typer';
import type { IBehandling } from '../../typer/behandling';
import type { IRestKorrigertEtterbetaling } from '../../typer/vedtak';
import { KorrigertEtterbetalingÅrsak } from '../../typer/vedtak';
import { useApp } from '../AppContext';
import { useBehandling } from '../behandlingContext/BehandlingContext';

interface IKorrigerEtterbetalingSkjema {
    årsak: string;
    beløp: string;
    begrunnelse: string;
}

interface IProps {
    onSuccess: () => void;
    korrigertEtterbetaling?: IRestKorrigertEtterbetaling;
    behandlingId: number;
}

export const useKorrigerEtterbetalingSkjemaContext = ({
    onSuccess,
    korrigertEtterbetaling,
    behandlingId,
}: IProps) => {
    const { settÅpenBehandling } = useBehandling();
    const { settToast } = useApp();
    const { request } = useHttp();

    const [restFeil, settRestFeil] = useState<string | undefined>(undefined);
    const [angrerKorrigering, settAngrerKorrigering] = useState<boolean>(false);

    const årsaker: OptionType[] = [
        {
            label: 'Velg',
            value: '',
        },
        {
            label: 'Feil i tidligere utbetalt beløp',
            value: KorrigertEtterbetalingÅrsak.FEIL_TIDLIGERE_UTBETALT_BELØP,
        },
        {
            label: 'Refusjon fra UDI',
            value: KorrigertEtterbetalingÅrsak.REFUSJON_FRA_UDI,
        },
        {
            label: 'Refusjon fra andre myndigheter',
            value: KorrigertEtterbetalingÅrsak.REFUSJON_FRA_ANDRE_MYNDIGHETER,
        },
        {
            label: 'Motregning',
            value: KorrigertEtterbetalingÅrsak.MOTREGNING,
        },
    ];

    const valgtÅrsak: string =
        (
            korrigertEtterbetaling &&
            årsaker.find(option => option.value === korrigertEtterbetaling.årsak.toString())
        )?.value ?? '';

    const {
        skjema,
        valideringErOk,
        kanSendeSkjema,
        onSubmit,
        nullstillSkjema,
        settSubmitRessurs,
        settVisfeilmeldinger,
        validerAlleSynligeFelter,
    } = useSkjema<IKorrigerEtterbetalingSkjema, IBehandling>({
        felter: {
            årsak: useFelt<string>({
                verdi: valgtÅrsak,
                valideringsfunksjon: erÅrsakForKorrigeringGyldig,
            }),
            beløp: useFelt<string>({
                verdi: korrigertEtterbetaling?.beløp?.toString() ?? '',
                valideringsfunksjon: erEtterbetalingsbeløpGyldig,
            }),
            begrunnelse: useFelt<string>({
                verdi: korrigertEtterbetaling?.begrunnelse ?? '',
            }),
        },
        skjemanavn: 'KorrigerEtterbetalingSkjema',
    });

    const valideringsstatuser = [
        skjema.felter.årsak.valideringsstatus,
        skjema.felter.beløp.valideringsstatus,
        skjema.felter.begrunnelse.valideringsstatus,
    ];

    // Nullstiller skjema dersom korrigert etterbetaling på behandling er endret (trigges etter lagring/angring av korrigering)
    useEffect(() => {
        nullstillSkjema();
    }, [
        korrigertEtterbetaling?.årsak,
        korrigertEtterbetaling?.beløp,
        korrigertEtterbetaling?.begrunnelse,
    ]);

    // Sørger for at alle felter valideres etter at de er initialisert
    useEffect(() => {
        if (
            valideringsstatuser.some(
                valideringsstatus => valideringsstatus === Valideringsstatus.IKKE_VALIDERT
            )
        ) {
            validerAlleSynligeFelter();
        }
    }, [valideringsstatuser]);

    const visAngreKorrigering = korrigertEtterbetaling != null;

    const korrigertEtterbetalingURL = `/familie-ba-sak/api/korrigertetterbetaling/behandling/${behandlingId}`;

    const lagreKorrigering = () => {
        if (kanSendeSkjema()) {
            settSubmitRessurs(byggTomRessurs());
            settVisfeilmeldinger(false);
            onSubmit(
                {
                    method: 'POST',
                    data: {
                        årsak: skjema.felter.årsak.verdi,
                        beløp: skjema.felter.beløp.verdi,
                        begrunnelse: skjema.felter.begrunnelse.verdi,
                    },
                    url: korrigertEtterbetalingURL,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settToast(ToastTyper.ETTERBETALING_KORRIGERT, {
                            alertType: AlertType.SUCCESS,
                            tekst: 'Etterbetalingsbeløp i brevet er korrigert',
                        });
                        settRestFeil(undefined);
                        settÅpenBehandling(response);
                        onSuccess();
                    }
                },
                () => {
                    settRestFeil('Teknisk feil ved lagring av korrigert etterbetalingsbeløp');
                }
            );
        } else {
            settVisfeilmeldinger(true);
        }
    };

    const angreKorrigering = () => {
        settAngrerKorrigering(true);
        request<void, IBehandling>({
            method: 'PATCH',
            url: korrigertEtterbetalingURL,
        }).then((response: Ressurs<IBehandling>) => {
            settAngrerKorrigering(false);
            if (response.status === RessursStatus.SUKSESS) {
                settToast(ToastTyper.ETTERBETALING_KORRIGERT, {
                    alertType: AlertType.SUCCESS,
                    tekst: 'Korrigering av etterbetalingsbeløp fjernet',
                });
                settRestFeil(undefined);
                settÅpenBehandling(response);
                onSuccess();
            } else {
                settRestFeil('Teknisk feil ved fjerning av korrigert etterbetalingsbeløp');
            }
        });
    };

    return {
        skjema,
        årsaker,
        valideringErOk,
        lagreKorrigering,
        angreKorrigering,
        visAngreKorrigering,
        angrerKorrigering,
        settVisfeilmeldinger,
        settRestFeil,
        restFeil,
        nullstillSkjema,
    };
};
