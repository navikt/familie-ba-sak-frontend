import { useEffect } from 'react';

import { useHttp } from '@navikt/familie-http';

import { useApp } from '../../../../../../../context/AppContext';
import { useBehandling } from '../../../../../../../context/behandlingContext/BehandlingContext';
import {
    BehandlerRolle,
    BehandlingStatus,
    BehandlingSteg,
    type IBehandling,
} from '../../../../../../../typer/behandling';

export const useOppdaterValutakursOgSimuleringPåBeslutterSteg = () => {
    const { hentSaksbehandlerRolle } = useApp();
    const { request } = useHttp();
    const { settÅpenBehandling, behandling } = useBehandling();

    useEffect(() => {
        if (
            behandling.status === BehandlingStatus.FATTER_VEDTAK &&
            behandling.steg == BehandlingSteg.BESLUTTE_VEDTAK &&
            hentSaksbehandlerRolle() === BehandlerRolle.BESLUTTER
        ) {
            request<void, IBehandling>({
                method: 'PUT',
                url: `/familie-ba-sak/api/differanseberegning/valutakurs/${behandling.behandlingId}/oppdater-valutakurser-og-simulering-automatisk`,
            }).then(behandlingRessurs => {
                settÅpenBehandling(behandlingRessurs);
            });
        }
    }, [behandling.behandlingId]);
};
