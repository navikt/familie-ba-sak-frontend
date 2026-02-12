import { useEffect } from 'react';

import { useHttp } from '@navikt/familie-http';

import { useAppContext } from '../../../../../../../context/AppContext';
import { useFeatureToggles } from '../../../../../../../hooks/useFeatureToggles';
import {
    BehandlerRolle,
    BehandlingStatus,
    BehandlingSteg,
    type IBehandling,
} from '../../../../../../../typer/behandling';
import { FeatureToggle } from '../../../../../../../typer/featureToggles';
import { useBehandlingContext } from '../../../../context/BehandlingContext';

export const useOppdaterValutakursOgSimuleringPåBeslutterSteg = () => {
    const { hentSaksbehandlerRolle } = useAppContext();
    const { request } = useHttp();
    const { settÅpenBehandling, behandling } = useBehandlingContext();
    const toggles = useFeatureToggles();

    useEffect(() => {
        if (
            behandling.status === BehandlingStatus.FATTER_VEDTAK &&
            behandling.steg == BehandlingSteg.BESLUTTE_VEDTAK &&
            hentSaksbehandlerRolle() === BehandlerRolle.BESLUTTER &&
            !toggles[FeatureToggle.hentBehandlingEndepunktForBeslutter]
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
