import createUseContext from 'constate';
import { useState } from 'react';
import { BehandlerRolle, BehandlingSteg, IBehandling } from '../typer/behandling';
import { RessursStatus } from '../typer/ressurs';
import { tilFeilside } from '../utils/commons';
import { hentAktivBehandlingPåFagsak, hentBehandlingPåFagsak } from '../utils/fagsak';
import { useApp } from './AppContext';
import { useFagsakRessurser } from './FagsakContext';

const [BehandlingProvider, useBehandling] = createUseContext(() => {
    const [åpenBehandling, settÅpenBehandling] = useState<IBehandling | undefined>(undefined);
    const { hentSaksbehandlerRolle } = useApp();
    const { fagsak } = useFagsakRessurser();

    const bestemÅpenBehandling = (behandlingId: string | undefined) => {
        if (fagsak.status === RessursStatus.SUKSESS) {
            const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak.data);
            const åpenBehandling =
                behandlingId && hentBehandlingPåFagsak(fagsak.data, parseInt(behandlingId, 10));
            if (åpenBehandling) {
                settÅpenBehandling(åpenBehandling);
            } else if (behandlingId) {
                settÅpenBehandling(undefined);
            } else if (aktivBehandling) {
                settÅpenBehandling(aktivBehandling);
            } else {
                settÅpenBehandling(undefined);
            }
        } else {
            settÅpenBehandling(undefined);
        }
    };

    const hentStegPåÅpenBehandling = (): BehandlingSteg | undefined => {
        return åpenBehandling?.steg;
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
