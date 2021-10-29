import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import { byggHenterRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import {
    BehandlingKategori,
    BehandlingUnderkategori,
    IBehandling,
    IRestEndreBehandlingUnderkategori,
} from '../../../../../typer/behandling';

const useEndreBehandling = (lukkModal: () => void) => {
    const { request } = useHttp();
    const { åpenBehandling, settÅpenBehandling } = useBehandling();

    const [underkategori, settUnderkategori] = useState<BehandlingUnderkategori>(
        BehandlingUnderkategori.ORDINÆR
    );

    const [kategori, settKategori] = useState<BehandlingKategori>(BehandlingKategori.NASJONAL);

    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());

    useEffect(() => {
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            settUnderkategori(åpenBehandling.data.underkategori);
            settKategori(åpenBehandling.data.kategori);
            settSubmitRessurs(byggTomRessurs());
        }
    }, [åpenBehandling]);

    const endreBehandlingstema = (behandlingId: number) => {
        settSubmitRessurs(byggHenterRessurs());
        request<IRestEndreBehandlingUnderkategori, IBehandling>({
            method: 'PUT',
            data: { behandlingUnderkategori: underkategori, behandlingKategori: kategori },
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/behandlingstema`,
        }).then((oppdatertBehandling: Ressurs<IBehandling>) => {
            if (oppdatertBehandling.status === RessursStatus.SUKSESS) {
                settÅpenBehandling(oppdatertBehandling);
                settSubmitRessurs(byggTomRessurs());
                lukkModal();
            }
            settSubmitRessurs(oppdatertBehandling);
        });
    };

    const fjernState = () => {
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            settUnderkategori(åpenBehandling.data.underkategori);
            settKategori(åpenBehandling.data.kategori);
            settSubmitRessurs(byggTomRessurs());
        }
    };

    return {
        underkategori,
        settUnderkategori,
        kategori,
        settKategori,
        endreBehandlingstema,
        submitRessurs,
        settSubmitRessurs,
        fjernState,
    };
};

export default useEndreBehandling;
