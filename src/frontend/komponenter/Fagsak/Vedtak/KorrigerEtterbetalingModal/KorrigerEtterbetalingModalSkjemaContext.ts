import { useState } from 'react';

import type { OptionType } from '@navikt/familie-form-elements';
import { useHttp } from '@navikt/familie-http';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus, byggTomRessurs } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../typer/behandling';
import type { IKorrigertEtterbetaling } from '../../../../typer/vedtak';
import { KorrigertEtterbetalingÅrsak } from '../../../../typer/vedtak';
import { ToastTyper, AlertType } from '../../../Felleskomponenter/Toast/typer';
import {
    erEtterbetalingsbeløpGyldig,
    erÅrsakForKorrigeringGyldig,
} from './ValideringKorrigertEtterbetaling';

export interface IKorrigerEtterbetalingSkjema {
    aarsak: OptionType;
    etterbetalingsbeløp: string;
    begrunnelse: string;
}

export const useKorrigerEtterbetalingSkjemaContext = () => {
    const { åpenBehandling } = useBehandling();
    const { settToast } = useApp();
    const { request } = useHttp();

    const [restFeil, settRestFeil] = useState<string | undefined>(undefined);

    const korrigertEtterbetaling: IKorrigertEtterbetaling | null | undefined =
        åpenBehandling.status === RessursStatus.SUKSESS
            ? åpenBehandling.data.korrigertEtterbetaling
            : null;

    const behandlingId: number | null =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.behandlingId : null;

    const årsaker: OptionType[] = [
        {
            label: 'Feil i tidligere utebetalt beløp',
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

    const valgtÅrsak: OptionType = (korrigertEtterbetaling &&
        årsaker.find(option => option.value === korrigertEtterbetaling.aarsak.toString())) ?? {
        label: '',
        value: '',
    };

    const {
        skjema,
        valideringErOk,
        kanSendeSkjema,
        onSubmit,
        nullstillSkjema,
        settSubmitRessurs,
        settVisfeilmeldinger,
    } = useSkjema<IKorrigerEtterbetalingSkjema, IBehandling>({
        felter: {
            aarsak: useFelt<OptionType>({
                verdi: valgtÅrsak,
                valideringsfunksjon: erÅrsakForKorrigeringGyldig,
            }),
            etterbetalingsbeløp: useFelt<string>({
                verdi: korrigertEtterbetaling?.etterbetalingsbeløp?.toString() ?? '',
                valideringsfunksjon: erEtterbetalingsbeløpGyldig,
            }),
            begrunnelse: useFelt<string>({
                verdi: korrigertEtterbetaling?.begrunnelse ?? '',
            }),
        },
        skjemanavn: 'KorrigerEtterbetalingSkjema',
    });

    const visAngreKorrigering = korrigertEtterbetaling != null;

    const lagreKorrigering = () => {
        if (kanSendeSkjema()) {
            settSubmitRessurs(byggTomRessurs());
            settVisfeilmeldinger(false);
            onSubmit(
                {
                    method: 'POST',
                    data: {
                        aarsak: skjema.felter.aarsak.verdi.value,
                        etterbetalingsbeløp: skjema.felter.etterbetalingsbeløp.verdi,
                        begrunnelse: skjema.felter.begrunnelse.verdi,
                    },
                    url: `/familie-ba-sak/api/korrigertEtterbetaling/${behandlingId}`,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settToast(ToastTyper.ETTERBETALING_KORRIGERT, {
                            alertType: AlertType.SUCCESS,
                            tekst: 'Etterbetaling korrigert',
                        });
                        settRestFeil(undefined);
                        nullstillSkjema();
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
        request<void, IBehandling>({
            method: 'PUT',
            url: `/familie-ba-sak/api/korrigertEtterbetaling/${behandlingId}`,
        }).then((response: Ressurs<IBehandling>) => {
            if (response.status === RessursStatus.SUKSESS) {
                settToast(ToastTyper.ETTERBETALING_KORRIGERT, {
                    alertType: AlertType.SUCCESS,
                    tekst: 'Korrigering av etterbetaling fjernet',
                });
                settRestFeil(undefined);
                nullstillSkjema();
            } else {
                settRestFeil('Teknisk feil ved fjerning av korrigert etterbetalingsbeløp');
            }
        });
    };

    return {
        skjema,
        aarsakOptions: årsaker,
        valideringErOk,
        lagreKorrigering,
        angreKorrigering,
        visAngreKorrigering,
        settVisfeilmeldinger,
        settRestFeil,
        restFeil,
        nullstillSkjema,
    };
};
