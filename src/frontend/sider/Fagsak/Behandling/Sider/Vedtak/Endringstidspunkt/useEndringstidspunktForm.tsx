import { queryKeys } from '@hooks/keys/queryKeys';
import { useConfirmBrowserRefresh } from '@hooks/useConfirmBrowserRefresh';
import { useOnFormSubmitSuccessful } from '@hooks/useOnFormSubmitSuccessful';
import { useOppdaterEndringstidspunkt } from '@hooks/useOppdaterEndringstidspunkt';
import { useQueryClient } from '@tanstack/react-query';
import type { IsoDatoString } from '@utils/dato';
import { useForm } from 'react-hook-form';

import { useBehandlingContext } from '../../../BehandlingContext';
import { useEndringstidspunktDialogContext } from './EndringstidspunktDialogContext';

export interface FormValues {
    [Feltnavn.ENDRINGSTIDSPUNKT]: IsoDatoString | null;
}

export interface TransformedFormValues {
    [Feltnavn.ENDRINGSTIDSPUNKT]: IsoDatoString;
}

export enum Feltnavn {
    ENDRINGSTIDSPUNKT = 'endringstidspunkt',
}

export function useEndringstidspunktForm() {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { lukkDialog } = useEndringstidspunktDialogContext();

    const queryClient = useQueryClient();

    const { mutateAsync: oppdaterEndringstidspunkt } = useOppdaterEndringstidspunkt(behandling.behandlingId);

    const form = useForm<FormValues, unknown, TransformedFormValues>({
        defaultValues: {
            [Feltnavn.ENDRINGSTIDSPUNKT]: null,
        },
    });

    const {
        control,
        formState: { isDirty },
        reset,
        setError,
    } = form;

    useConfirmBrowserRefresh({ enabled: isDirty });

    useOnFormSubmitSuccessful(control, () => reset());

    async function onSubmit(formValues: TransformedFormValues) {
        const { endringstidspunkt } = formValues;
        try {
            const oppdatertBehandling = await oppdaterEndringstidspunkt({ endringstidspunkt });
            await queryClient.invalidateQueries({
                queryKey: queryKeys.vedtaksperioder(oppdatertBehandling.behandlingId),
            });
            queryClient.invalidateQueries({ queryKey: queryKeys.endringstidspunkt(oppdatertBehandling.behandlingId) });
            settÅpenBehandling(oppdatertBehandling);
            lukkDialog();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'En ukjent feil oppstod.';
            setError('root', { message });
        }
    }

    return { form, onSubmit };
}
