import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useOppdaterBehandlingstema } from '../../../../hooks/useOppdaterBehandlingstema';
import { useBehandlingContext } from '../../../../sider/Fagsak/Behandling/context/BehandlingContext';
import type { IBehandlingstema } from '../../../../typer/behandlingstema';
import { behandlingstemaer } from '../../../../typer/behandlingstema';

export enum EndreBehandlingstemaFelt {
    BEHANDLINGSTEMA = 'behandlingstema',
}

export interface EndreBehandlingstemaFormValues {
    [EndreBehandlingstemaFelt.BEHANDLINGSTEMA]: IBehandlingstema;
}

interface Props {
    lukkModal: () => void;
}

export const useEndreBehandlingstemaSkjema = ({ lukkModal }: Props) => {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
    const { mutateAsync: oppdaterBehandlingstema } = useOppdaterBehandlingstema();

    const eksisterendeBehandlingstema = Object.values(behandlingstemaer)
        .filter(it => it.id !== 'NASJONAL_ORDINÆR')
        .find(it => it.kategori === behandling.kategori && it.underkategori === behandling.underkategori)!;

    const form = useForm<EndreBehandlingstemaFormValues>({
        values: {
            [EndreBehandlingstemaFelt.BEHANDLINGSTEMA]: eksisterendeBehandlingstema,
        },
    });

    const { setError } = form;

    const onSubmit = async (values: EndreBehandlingstemaFormValues) => {
        const { behandlingstema } = values;

        const oppdaterBehandlingstemaParameters = {
            behandlingUnderkategori: behandlingstema.underkategori,
            behandlingKategori: behandlingstema.kategori,
            behandlingId: behandling.behandlingId,
        };

        return oppdaterBehandlingstema(oppdaterBehandlingstemaParameters)
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
