import type { OptionType } from '@navikt/familie-form-elements';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus, byggTomRessurs } from '@navikt/familie-typer';

import { useApp } from '../../../../context/AppContext';
import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
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

    const korrigertEtterbetaling =
        åpenBehandling.status === RessursStatus.SUKSESS
            ? åpenBehandling.data.korrigertEtterbetaling
            : null;

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS ? åpenBehandling.data.behandlingId : null;

    const aarsakOptions: OptionType[] = [
        {
            label: 'Feil i tidligere utebetalt beløp',
            value: KorrigertEtterbetalingÅrsak.FEIL_TIDLIGERE_UTBETALT_BELØP,
        },
    ];

    const aarsakOption: OptionType = (korrigertEtterbetaling &&
        aarsakOptions.find(option => option.valueOf() === korrigertEtterbetaling.aarsak)) ?? {
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
    } = useSkjema<IKorrigerEtterbetalingSkjema, IKorrigertEtterbetaling>({
        felter: {
            aarsak: useFelt<OptionType>({
                verdi: aarsakOption,
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
                (response: Ressurs<IKorrigertEtterbetaling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settToast(ToastTyper.ETTERBETALING_KORRIGERT, {
                            alertType: AlertType.SUCCESS,
                            tekst: 'Etterbetaling korrigert',
                        });
                        nullstillSkjema();
                    }
                }
            );
        } else {
            settVisfeilmeldinger(true);
        }
    };

    const angreKorrigering = () => {
        settSubmitRessurs(byggTomRessurs());
        onSubmit(
            {
                method: 'PUT',
                url: `/familie-ba-sak/api/korrigertEtterbetaling/${behandlingId}`,
            },
            (response: Ressurs<IKorrigertEtterbetaling>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    settToast(ToastTyper.ETTERBETALING_KORRIGERT, {
                        alertType: AlertType.SUCCESS,
                        tekst: 'Korrigering av etterbetaling fjernet',
                    });
                    nullstillSkjema();
                }
            }
        );
    };

    return {
        skjema,
        aarsakOptions,
        valideringErOk,
        lagreKorrigering,
        angreKorrigering,
        visAngreKorrigering,
    };
};
