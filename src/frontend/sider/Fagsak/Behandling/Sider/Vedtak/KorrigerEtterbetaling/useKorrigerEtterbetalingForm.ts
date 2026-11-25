import { ModalType } from '@context/ModalContext';
import { useToastContext } from '@context/ToastContext';
import { queryKeys } from '@hooks/keys/queryKeys';
import { useAngreKorrigertEtterbetaling } from '@hooks/useAngreKorrigertEtterbetaling';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useKorrigerEtterbetaling } from '@hooks/useKorrigerEtterbetaling';
import { useModal } from '@hooks/useModal';
import { AlertType, ToastTyper } from '@komponenter/Toast/typer';
import { useQueryClient } from '@tanstack/react-query';
import type { OptionType } from '@typer/common';
import { KorrigertEtterbetalingÅrsak } from '@typer/vedtak';
import { useForm } from 'react-hook-form';

import { useKorrigertEtterbetalingContext } from './KorrigertEtterbetalingContext';

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
    const queryClient = useQueryClient();
    const behandlingId = useBehandlingId();
    const { korrigertEtterbetaling } = useKorrigertEtterbetalingContext();

    const { settToast } = useToastContext();

    const { mutateAsync: korrigerEtterbetalingAsync } = useKorrigerEtterbetaling();

    const { mutateAsync: angreKorrigertEtterbetalingAsync, isPending: angreKorrigertEtterbetalingPending } =
        useAngreKorrigertEtterbetaling();

    const { lukkModal } = useModal(ModalType.KORRIGER_ETTERBETALING);

    const valgtÅrsak: string =
        (korrigertEtterbetaling && årsaker.find(option => option.value === korrigertEtterbetaling.årsak.toString()))
            ?.value ?? '';

    const form = useForm<KorrigerEtterbetalingFormValues>({
        values: {
            årsak: valgtÅrsak,
            beløp: korrigertEtterbetaling?.beløp?.toString() ?? '',
            begrunnelse: korrigertEtterbetaling?.begrunnelse ?? '',
        },
    });

    const {
        setError,
        formState: { isSubmitting: korrigerEtterbetalingPending },
    } = form;

    async function korrigerEtterbetaling(values: KorrigerEtterbetalingFormValues) {
        if (angreKorrigertEtterbetalingPending) {
            return;
        }
        const { årsak, beløp, begrunnelse } = values;

        const korrigerEtterbetalingParameters = {
            årsak,
            beløp: Number(beløp),
            begrunnelse,
            behandlingId,
        };

        return korrigerEtterbetalingAsync(korrigerEtterbetalingParameters)
            .then(lagretKorrigertEtterbetaling => {
                settToast(ToastTyper.ETTERBETALING_KORRIGERT, {
                    alertType: AlertType.SUCCESS,
                    tekst: 'Etterbetalingsbeløp i brevet er korrigert',
                });
                queryClient.setQueryData(queryKeys.korrigertEtterbetaling(behandlingId), lagretKorrigertEtterbetaling);
                queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandlingId) });
                lukkModal();
            })
            .catch(_ => {
                setError('root', {
                    message: 'Teknisk feil ved lagring av korrigert etterbetalingsbeløp',
                });
            });
    }

    async function angreKorrigertEtterbetaling() {
        if (korrigerEtterbetalingPending) {
            return;
        }
        return angreKorrigertEtterbetalingAsync(behandlingId)
            .then(() => {
                settToast(ToastTyper.ETTERBETALING_KORRIGERT, {
                    alertType: AlertType.SUCCESS,
                    tekst: 'Korrigering av etterbetalingsbeløp fjernet',
                });
                queryClient.setQueryData(queryKeys.korrigertEtterbetaling(behandlingId), null);
                queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandlingId) });
                lukkModal();
            })
            .catch(_ => {
                setError('root', {
                    message: 'Teknisk feil ved fjerning av korrigert etterbetalingsbeløp',
                });
            });
    }

    return {
        form,
        korrigerEtterbetaling,
        angreKorrigertEtterbetaling,
        korrigerEtterbetalingPending,
        angreKorrigertEtterbetalingPending,
    };
}
