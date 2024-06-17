import { useEffect } from 'react';

import { useHttp } from '@navikt/familie-http';

import { useBehandling } from '../../../../context/behandlingContext/BehandlingContext';
import { BehandlingStatus, BehandlingSteg, type IBehandling } from '../../../../typer/behandling';

export const useOppdaterValutakursOgSimuleringPåBeslutterSteg = () => {
    const { request } = useHttp();
    const { settÅpenBehandling, behandling } = useBehandling();

    useEffect(() => {
        if (
            behandling.status === BehandlingStatus.FATTER_VEDTAK &&
            behandling.steg == BehandlingSteg.BESLUTTE_VEDTAK
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
