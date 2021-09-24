import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import { byggHenterRessurs, byggTomRessurs, Ressurs, RessursStatus } from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import {
    BehandlingUnderkategori,
    IRestEndreBehandlingUnderkategori,
} from '../../../../../typer/behandling';
import { IFagsak } from '../../../../../typer/fagsak';

const useEndreBehandling = (lukkModal: () => void) => {
    const { request } = useHttp();
    const { settFagsak } = useFagsakRessurser();
    const { åpenBehandling } = useBehandling();

    const [underkategori, settUnderkategori] = useState<BehandlingUnderkategori | undefined>(
        undefined
    );

    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());

    useEffect(() => {
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            settUnderkategori(åpenBehandling.data.underkategori);
            settSubmitRessurs(byggTomRessurs());
        }
    }, [åpenBehandling]);

    const endreBehandlingUnderkategori = (behandlingId: number) => {
        if (underkategori !== undefined) {
            settSubmitRessurs(byggHenterRessurs());
            request<IRestEndreBehandlingUnderkategori, IFagsak>({
                method: 'PUT',
                data: { behandlingUnderkategori: underkategori },
                url: `/familie-ba-sak/api/behandlinger/${behandlingId}/underkategori`,
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
        settUnderkategori(
            åpenBehandling.status === RessursStatus.SUKSESS
                ? åpenBehandling.data.underkategori
                : undefined
        );
        settSubmitRessurs(byggTomRessurs());
    };

    return {
        underkategori,
        settUnderkategori,
        endreBehandlingUnderkategori,
        submitRessurs,
        settSubmitRessurs,
        fjernState,
    };
};

export default useEndreBehandling;
