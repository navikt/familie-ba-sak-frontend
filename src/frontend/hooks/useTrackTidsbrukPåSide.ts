import { useEffect } from 'react';

import { useAppContext } from '../context/AppContext';
import { hentSideFraUrl } from '../sider/Fagsak/Behandling/Sider/sider';
import type { IBehandling } from '../typer/behandling';
import type { IMinimalFagsak } from '../typer/fagsak';
import { hentSideHref } from '../utils/miljø';
import { sendTilUmami } from '../utils/umami';

export const useTrackTidsbrukPåSide = (fagsak: IMinimalFagsak, behandling: IBehandling) => {
    const sidevisning = hentSideHref(location.pathname);
    const sideId = hentSideFraUrl(sidevisning);
    const { hentSaksbehandlerRolle } = useAppContext();

    useEffect(() => {
        const startTid = new Date();
        return () => {
            const sluttTid = new Date();
            const intervallISekunder = (sluttTid.getTime() - startTid.getTime()) / 1000;

            // Gjør ingenting med svært korte intervaller. De er sannsynligvis på grunn av
            // re-renders av samme komponent eller strict mode i localhost
            if (intervallISekunder < 0.1) {
                return;
            }

            const data = {
                fagsakId: fagsak.id,
                fagsakType: fagsak.fagsakType,
                fagsakStatus: fagsak.status,
                behandlingId: behandling.behandlingId,
                sideId: sideId,
                type: behandling.type,
                årsak: behandling.årsak,
                kategori: behandling.kategori,
                underkategori: behandling.underkategori,
                behandlingStatus: behandling.status,
                resultat: behandling.resultat,
                stegTilstand: behandling.stegTilstand,
                behandlerRolle: hentSaksbehandlerRolle(),
                startTid: startTid,
                sluttTid: sluttTid,
                intervallISekunder: intervallISekunder,
            };

            sendTilUmami('sidevisning_i_behandling', data);
        };
    }, [sidevisning]);
};
