import { useForm } from 'react-hook-form';

import { RessursStatus } from '@navikt/familie-typer';

import { useAppContext } from '../../../../../../context/AppContext';
import { ModalType } from '../../../../../../context/ModalContext';
import { useKorrigerEtterbetaling } from '../../../../../../hooks/useKorrigerEtterbetaling';
import { useModal } from '../../../../../../hooks/useModal';
import { AlertType, ToastTyper } from '../../../../../../komponenter/Toast/typer';
import type { OptionType } from '../../../../../../typer/common';
import { KorrigertEtterbetalingÅrsak } from '../../../../../../typer/vedtak';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface KorrigerEtterbetalingFormValues {
    årsak: string;
    beløp: string;
    begrunnelse: string;
}

export const årsaker: OptionType[] = [
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

export function useKorrigerEtterbetalingForm() {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const korrigertEtterbetaling = behandling.korrigertEtterbetaling;

    const { settToast } = useAppContext();

    const { korrigerEtterbetalingMutation, angreKorrigertEtterbetalingMutation } =
        useKorrigerEtterbetaling();

    const { lukkModal } = useModal(ModalType.KORRIGER_ETTERBETALING);

    const valgtÅrsak: string =
        (
            korrigertEtterbetaling &&
            årsaker.find(option => option.value === korrigertEtterbetaling.årsak.toString())
        )?.value ?? '';

    const form = useForm<KorrigerEtterbetalingFormValues>({
        values: {
            årsak: valgtÅrsak,
            beløp: korrigertEtterbetaling?.beløp?.toString() ?? '',
            begrunnelse: korrigertEtterbetaling?.begrunnelse ?? '',
        },
    });

    const { setError } = form;

    const isPending =
        angreKorrigertEtterbetalingMutation.isPending || korrigerEtterbetalingMutation.isPending;

    async function korrigerEtterbetaling(values: KorrigerEtterbetalingFormValues) {
        const { årsak, beløp, begrunnelse } = values;

        const korrigerEtterbetalingParameters = {
            årsak,
            beløp: Number(beløp),
            begrunnelse,
            behandlingId: behandling.behandlingId,
        };

        korrigerEtterbetalingMutation
            .mutateAsync(korrigerEtterbetalingParameters)
            .then(behandling => {
                settToast(ToastTyper.ETTERBETALING_KORRIGERT, {
                    alertType: AlertType.SUCCESS,
                    tekst: 'Etterbetalingsbeløp i brevet er korrigert',
                });
                settÅpenBehandling({ status: RessursStatus.SUKSESS, data: behandling });
                lukkModal();
            })
            .catch(_ => {
                setError('root', {
                    message: 'Teknisk feil ved lagring av korrigert etterbetalingsbeløp',
                });
            });
    }

    async function angreKorrigertEtterbetaling() {
        angreKorrigertEtterbetalingMutation
            .mutateAsync(behandling.behandlingId)
            .then(behandling => {
                settToast(ToastTyper.ETTERBETALING_KORRIGERT, {
                    alertType: AlertType.SUCCESS,
                    tekst: 'Korrigering av etterbetalingsbeløp fjernet',
                });
                settÅpenBehandling({ status: RessursStatus.SUKSESS, data: behandling });
                lukkModal();
            })
            .catch(_ => {
                setError('root', {
                    message: 'Teknisk feil ved fjerning av korrigert etterbetalingsbeløp',
                });
            });
    }

    return { form, korrigerEtterbetaling, angreKorrigertEtterbetaling, isPending };
}
