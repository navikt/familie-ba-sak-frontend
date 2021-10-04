import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import { byggHenterRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import {
    BehandlingKategori,
    BehandlingUnderkategori,
    IRestEndreBehandlingUnderkategori,
} from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';

const useEndreBehandling = (lukkModal: () => void) => {
    const { request } = useHttp();
    const { settFagsak } = useFagsakRessurser();
    const { åpenBehandling } = useBehandling();

    const [underkategori, settUnderkategori] = useState<BehandlingUnderkategori>();

    const [kategori, settKategori] = useState<BehandlingKategori>();

    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());

    useEffect(() => {
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            settUnderkategori(åpenBehandling.data.underkategori);
            settKategori(åpenBehandling.data.kategori);
            settSubmitRessurs(byggTomRessurs());
        }
    }, [åpenBehandling]);

    const endreBehandlingstema = (behandlingId: number) => {
        if (underkategori !== undefined) {
            settSubmitRessurs(byggHenterRessurs());
            request<IRestEndreBehandlingUnderkategori, IFagsak>({
                method: 'PUT',
                data: { behandlingUnderkategori: underkategori, behandlingKategori: kategori },
                url: `/familie-ba-sak/api/behandlinger/${behandlingId}/behandlingstema`,
            }).then((oppdatertFagsak: Ressurs<IFagsak>) => {
                if (oppdatertFagsak.status === RessursStatus.SUKSESS) {
                    settFagsak(oppdatertFagsak);
                    settSubmitRessurs(byggTomRessurs());
                    lukkModal();
                }
                settSubmitRessurs(oppdatertFagsak);
            });
        }
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
