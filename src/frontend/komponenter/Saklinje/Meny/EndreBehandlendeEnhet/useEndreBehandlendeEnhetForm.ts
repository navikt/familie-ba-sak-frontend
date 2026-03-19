import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useOppdaterBehandlendeEnhet } from '../../../../hooks/useOppdaterBehandlendeEnhet';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';

export interface EndreBehandlendeEnhetFormValues {
    [EndreBehandlendeEnhetFormFields.ENHET_ID]: string;
    [EndreBehandlendeEnhetFormFields.BEGRUNNELSE]: string;
}

export enum EndreBehandlendeEnhetFormFields {
    ENHET_ID = 'enhetId',
    BEGRUNNELSE = 'begrunnelse',
}

interface Props {
    lukkModal: () => void;
}

export function useEndreBehandlendeEnhetForm({ lukkModal }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { mutateAsync } = useOppdaterBehandlendeEnhet(behandling.behandlingId);

    const form = useForm<EndreBehandlendeEnhetFormValues>({
        values: {
            [EndreBehandlendeEnhetFormFields.ENHET_ID]: behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId,
            [EndreBehandlendeEnhetFormFields.BEGRUNNELSE]: '',
        },
    });

    const { setError } = form;

    async function onSubmit(formValues: EndreBehandlendeEnhetFormValues) {
        return mutateAsync({
            enhetId: formValues.enhetId,
            begrunnelse: formValues.begrunnelse,
        })
            .then(behandling => {
                settÅpenBehandling(byggSuksessRessurs(behandling));
                lukkModal();
            })
            .catch(error => {
                setError('root', { message: error.message ?? 'Ukjent feil' });
            });
    }

    return { form, onSubmit };
}
