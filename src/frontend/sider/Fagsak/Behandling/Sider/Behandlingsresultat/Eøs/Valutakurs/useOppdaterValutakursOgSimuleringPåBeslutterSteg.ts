import { useEffect } from 'react';

import { useHttp } from '@navikt/familie-http';

import { useAppContext } from '../../../../../../../context/AppContext';
import {
    BehandlerRolle,
    BehandlingStatus,
    BehandlingSteg,
    type IBehandling,
} from '../../../../../../../typer/behandling';
import { useBehandlingContext } from '../../../../context/BehandlingContext';

export const useOppdaterValutakursOgSimuleringPåBeslutterSteg = () => {
    const { hentSaksbehandlerRolle } = useAppContext();
    const { request } = useHttp();
    const { settÅpenBehandling, behandling } = useBehandlingContext();

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
