import { type FieldErrors, useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { ModalType } from '../../../../context/ModalContext';
import { useHenleggBehandling } from '../../../../hooks/useHenleggBehandling';
import { useModal } from '../../../../hooks/useModal';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import type { HenleggÅrsak } from '../../../../typer/behandling';

export const HenleggBehandlingServerErrors: Record<
    'onSubmitError',
    {
        id: `root.${string}`;
        lookup: (errors: FieldErrors<HenleggBehandlingFormValues>) => string | undefined;
    }
> = {
    onSubmitError: {
        id: 'root.onSubmitError',
        lookup: errors => errors?.root?.onSubmitError?.message,
    },
};

export enum HenleggBehandlingFormFields {
    ÅRSAK = 'årsak',
    BEGRUNNELSE = 'begrunnelse',
}

export interface HenleggBehandlingFormValues {
    [HenleggBehandlingFormFields.ÅRSAK]: HenleggÅrsak | '';
    [HenleggBehandlingFormFields.BEGRUNNELSE]: string;
}

export const HENLEGG_BEHANDLING_FORM_ID = 'henlegg_behandling_modal_form';

export function useHenleggBehandlingForm() {
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const { lukkModal } = useModal(ModalType.HENLEGG_BEHANDLING);
    const { åpneModal } = useModal(ModalType.HENLEGG_BEHANDLING_VEIVALG);

    const { mutateAsync } = useHenleggBehandling();

    const form = useForm<HenleggBehandlingFormValues>({
        defaultValues: {
            [HenleggBehandlingFormFields.ÅRSAK]: '',
            [HenleggBehandlingFormFields.BEGRUNNELSE]: '',
        },
    });

    const { setError } = form;

    async function onSubmit(values: HenleggBehandlingFormValues) {
        const { årsak, begrunnelse } = values;
        if (årsak === '') {
            setError(HenleggBehandlingServerErrors.onSubmitError.id, {
                message: 'Årsak er påkrevd.',
            });
            return;
        }
        return mutateAsync({ behandling, årsak, begrunnelse })
            .then(behandling => {
                settÅpenBehandling(byggSuksessRessurs(behandling));
                lukkModal();
                åpneModal({ årsak });
            })
            .catch(error =>
                setError(HenleggBehandlingServerErrors.onSubmitError.id, {
                    message: error.message ?? 'En feil oppstod.',
                })
            );
    }

    return { form, onSubmit };
}
