import { ModalType } from '@context/ModalContext';
import { useLåsOppFagsak } from '@hooks/useLåsOppFagsak';
import { useModal } from '@hooks/useModal';
import { useFagsakContext } from '@sider/Fagsak/FagsakContext';
import { useQueryClient } from '@tanstack/react-query';
import { type FieldErrors, useForm } from 'react-hook-form';

import { HentFagsakQueryKeyFactory } from '../../../../hooks/useHentFagsak';

export const LåsOppFagsakServerErrors: Record<
    'onSubmitError',
    {
        id: `root.${string}`;
        lookup: (errors: FieldErrors<LåsOppFagsakFormValues>) => string | undefined;
    }
> = {
    onSubmitError: {
        id: 'root.onSubmitError',
        lookup: errors => errors?.root?.onSubmitError?.message,
    },
};

export enum LåsOppFagsakFormFields {
    BEGRUNNELSE = 'begrunnelse',
}

export interface LåsOppFagsakFormValues {
    [LåsOppFagsakFormFields.BEGRUNNELSE]: string;
}

export const LAAS_OPP_FAGSAK_FORM_ID = 'laas_opp_fagsak_modal_form';

export function useLåsOppFagsakForm() {
    const { fagsak } = useFagsakContext();
    const { lukkModal } = useModal(ModalType.LAAS_OPP_FAGSAK);
    const { mutateAsync } = useLåsOppFagsak();
    const queryClient = useQueryClient();

    const form = useForm<LåsOppFagsakFormValues>({
        defaultValues: {
            [LåsOppFagsakFormFields.BEGRUNNELSE]: '',
        },
    });

    const { setError } = form;

    async function onSubmit(values: LåsOppFagsakFormValues) {
        const { begrunnelse } = values;
        return mutateAsync({ fagsakId: fagsak.id, begrunnelse: begrunnelse.trim() })
            .then(() => {
                lukkModal();
                queryClient.invalidateQueries({
                    queryKey: HentFagsakQueryKeyFactory.fagsak(fagsak.id),
                });
            })
            .catch(error =>
                setError(LåsOppFagsakServerErrors.onSubmitError.id, {
                    message: error.message ?? 'En feil oppstod.',
                })
            );
    }

    return { form, onSubmit };
}
