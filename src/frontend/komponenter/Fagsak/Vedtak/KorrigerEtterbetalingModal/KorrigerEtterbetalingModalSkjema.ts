import type { OptionType } from '@navikt/familie-form-elements';
import { useFelt, useSkjema } from '@navikt/familie-skjema';
import { type Ressurs, RessursStatus, byggTomRessurs } from '@navikt/familie-typer';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import type { IKorrigertEtterbetaling } from '../../../../typer/vedtak';
import { KorrigertEtterbetalingÅrsak } from '../../../../typer/vedtak';
import {
    erEtterbetalingsbeløpGyldig,
    erÅrsakForKorrigeringGyldig,
} from './ValideringKorrigertEtterbetaling';

export interface IKorrigerEtterbetalingSkjema {
    aarsak: OptionType;
    etterbetalingsbeløp: string;
    begrunnelse: string;
}

export const useKorrigerEtterbetalingSkjema = () => {
    const { åpenBehandling } = useBehandling();

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
                    method: 'PUT',
                    data: {
                        aarsak: skjema.felter.aarsak.verdi.value,
                        etterbetalingsbeløp: skjema.felter.etterbetalingsbeløp.verdi,
                        begrunnelse: skjema.felter.begrunnelse.verdi,
                    },
                    url: `/familie-ba-sak/api/korrigertEtterbetaling/${behandlingId}`,
                },
                (response: Ressurs<IKorrigertEtterbetaling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        nullstillSkjema();
                    }
                }
            );
        } else {
            settVisfeilmeldinger(true);
        }
    };

    const angreKorrigering = () => {
        console.log('angre korrigering');
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
