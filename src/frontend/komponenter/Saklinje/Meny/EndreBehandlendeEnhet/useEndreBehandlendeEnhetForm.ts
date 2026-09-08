import { ApiFeil } from '@api/client/apiClient';
import { useOppdaterBehandlendeEnhet } from '@hooks/useOppdaterBehandlendeEnhet';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { useBehandlingContext } from '@sider/Fagsak/Behandling/context/BehandlingContext';
import { behandlendeEnheter, UKJENT_ENHET } from '@typer/enhet';
import { useForm } from 'react-hook-form';

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
    const { mutateAsync: oppdaterBehandlendeEnhet } = useOppdaterBehandlendeEnhet(behandling.behandlingId);

    const erEnhetFraBehandlingValgbar = behandlendeEnheter
        .map(arbeidsfordelingsenhet => arbeidsfordelingsenhet.enhetId)
        .some(enhetId => enhetId === behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId);

    const form = useForm<EndreBehandlendeEnhetFormValues>({
        values: {
            [EndreBehandlendeEnhetFormFields.ENHET_ID]: erEnhetFraBehandlingValgbar
                ? behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId
                : UKJENT_ENHET,
            [EndreBehandlendeEnhetFormFields.BEGRUNNELSE]: '',
        },
    });

    const { setError } = form;

    async function onSubmit(formValues: EndreBehandlendeEnhetFormValues) {
        const { enhetId, begrunnelse } = formValues;
        try {
            const oppdatertBehandling = await oppdaterBehandlendeEnhet({ enhetId, begrunnelse });
            settÅpenBehandling(byggSuksessRessurs(oppdatertBehandling));
            lukkModal();
        } catch (error: unknown) {
            setError('root', { message: error instanceof ApiFeil ? error.message : 'Ukjent feil' });
        }
    }

    return { form, onSubmit };
}
