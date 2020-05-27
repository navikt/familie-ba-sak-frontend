import createUseContext from 'constate';
import { useState } from 'react';
import { BehandlerRolle, BehandlingSteg, IBehandling } from '../typer/behandling';
import {
    RessursStatus,
    Ressurs,
    byggTomRessurs,
    byggFeiletRessurs,
    byggDataRessurs,
} from '../typer/ressurs';
import { tilFeilside } from '../utils/commons';
import { hentAktivBehandlingPåFagsak, hentBehandlingPåFagsak } from '../utils/fagsak';
import { useApp } from './AppContext';
import { useFagsakRessurser } from './FagsakContext';

const [BehandlingProvider, useBehandling] = createUseContext(() => {
    const [åpenBehandling, settÅpenBehandling] = useState<Ressurs<IBehandling>>(byggTomRessurs());
    const { hentSaksbehandlerRolle } = useApp();
    const { fagsak } = useFagsakRessurser();

    const bestemÅpenBehandling = (behandlingId: string | undefined) => {
        if (fagsak.status === RessursStatus.SUKSESS) {
            const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak.data);
            const åpenBehandling =
                behandlingId && hentBehandlingPåFagsak(fagsak.data, parseInt(behandlingId, 10));

            if (åpenBehandling) {
                settÅpenBehandling(byggDataRessurs(åpenBehandling));
            } else if (behandlingId) {
                settÅpenBehandling(
                    byggFeiletRessurs(`Finner ikke behandling med id ${behandlingId}`)
                );
            } else if (aktivBehandling) {
                settÅpenBehandling(byggDataRessurs(aktivBehandling));
            } else {
                settÅpenBehandling(byggFeiletRessurs('Fagsaken har ingen behandlinger'));
            }
        }
    };

    const hentStegPåÅpenBehandling = (): BehandlingSteg | undefined => {
        return åpenBehandling.status === RessursStatus.SUKSESS
            ? åpenBehandling.data.steg
            : undefined;
    };

    const erLesevisning = (): boolean => {
        const rolle = hentSaksbehandlerRolle();
        const steg = hentStegPåÅpenBehandling();
        const stegNummer: BehandlingSteg = steg && BehandlingSteg[steg];
        if (
            rolle &&
            rolle >= BehandlerRolle.SAKSBEHANDLER &&
            !(stegNummer >= BehandlingSteg.BESLUTTE_VEDTAK)
        ) {
            return false;
        } else if (rolle && rolle >= BehandlerRolle.VEILEDER) {
            return true;
        } else {
            tilFeilside();
            return true;
        }
    };

    return { åpenBehandling, erLesevisning, bestemÅpenBehandling };
});

export { BehandlingProvider, useBehandling };
