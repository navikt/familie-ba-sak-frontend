import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useEndreBehandlingstema } from '../../../../hooks/useEndreBehandlingstema';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import type { IBehandlingstema } from '../../../../typer/behandlingstema';
import { behandlingstemaer } from '../../../../typer/behandlingstema';

export enum EndreBehandlingstemaFelt {
    BEHANDLINGSTEMA = 'behandlingstema',
}

export interface EndreBehandlingstemaFormValues {
    [EndreBehandlingstemaFelt.BEHANDLINGSTEMA]: IBehandlingstema | undefined;
}

type TransformedEndreBehandlingstemaFormValues = {
    [EndreBehandlingstemaFelt.BEHANDLINGSTEMA]: IBehandlingstema;
};

interface Props {
    lukkModal: () => void;
}

export const useEndreBehandlingstemaSkjema = ({ lukkModal }: Props) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { mutateAsync: endreBehandlingstema } = useEndreBehandlingstema();

    const eksisterendeBehandlingstema = Object.values(behandlingstemaer)
        .filter(it => it.id !== 'NASJONAL_ORDINÆR')
        .find(it => it.kategori === behandling.kategori && it.underkategori === behandling.underkategori)!;

    const form = useForm<EndreBehandlingstemaFormValues, unknown, TransformedEndreBehandlingstemaFormValues>({
        values: {
            [EndreBehandlingstemaFelt.BEHANDLINGSTEMA]: eksisterendeBehandlingstema,
        },
    });

    const { setError } = form;

    const onSubmit = async (values: TransformedEndreBehandlingstemaFormValues) => {
        const { behandlingstema } = values;

        const endreBehandlingstemaParameters = {
            behandlingUnderkategori: behandlingstema.underkategori,
            behandlingKategori: behandlingstema.kategori,
            behandlingId: behandling.behandlingId,
        };

        return endreBehandlingstema(endreBehandlingstemaParameters)
            .then(behandling => {
                settÅpenBehandling(byggSuksessRessurs(behandling));
                lukkModal();
            })
            .catch((e: unknown) =>
                setError('root', {
                    message: e instanceof Error ? e.message : 'Teknisk feil ved endring av behandlingstema.',
                })
            );
    };

    return {
        form,
        onSubmit,
    };
};
