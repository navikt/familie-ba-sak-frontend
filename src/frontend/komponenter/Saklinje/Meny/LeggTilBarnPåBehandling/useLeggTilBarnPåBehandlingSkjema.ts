import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useLeggTilBarnPåBehandling } from '../../../../hooks/useLeggTilBarnPåBehandling';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';

export enum LeggTilBarnPåBehandlingFelt {
    BARNIDENT = 'barnIdent',
}

export interface LeggTilBarnPåBehandlingFormValues {
    [LeggTilBarnPåBehandlingFelt.BARNIDENT]: string;
}

interface Props {
    lukkModal: () => void;
}

export const useLeggTilBarnPåBehandlingSkjema = ({ lukkModal }: Props) => {
    const { settÅpenBehandling, behandling } = useBehandlingContext();
    const { mutateAsync: leggTilBarnPåBehandling } = useLeggTilBarnPåBehandling();

    const form = useForm<LeggTilBarnPåBehandlingFormValues>({
        defaultValues: {
            [LeggTilBarnPåBehandlingFelt.BARNIDENT]: undefined,
        },
        // TODO: validate
        // TODO: bruk eksisterende identValidator?
    });

    const { setError } = form;

    const onSubmit = async (values: LeggTilBarnPåBehandlingFormValues) => {
        const { barnIdent } = values;

        const leggTilBarnPåBehandlingParameters = {
            barnIdent: barnIdent,
            behandlingId: behandling.behandlingId,
        };

        return leggTilBarnPåBehandling(leggTilBarnPåBehandlingParameters)
            .then(behandling => {
                settÅpenBehandling(byggSuksessRessurs(behandling));
                lukkModal();
            })
            .catch((e: unknown) => {
                setError('root', {
                    message:
                        e instanceof Error ? e.message : 'Teknisk feil ved forsøk på å legge til barn på behandling.',
                });
            });
    };

    return {
        form,
        onSubmit,
    };
};
