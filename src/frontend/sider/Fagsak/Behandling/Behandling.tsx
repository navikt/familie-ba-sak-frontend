import { useBehandlingIdParam } from '@hooks/useBehandlingIdParam';
import { useFagsak } from '@hooks/useFagsak';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { NotFound } from '@komponenter/Error/NotFound';
import { FeatureToggle } from '@typer/featureToggles';
import { Navigate } from 'react-router';

import { BehandlingMedReactQuery } from './BehandlingMedReactQuery';
import { BehandlingMedUseHttp } from './BehandlingMedUseHttp';

export function Behandling() {
    const toggles = useFeatureToggles();
    const fagsak = useFagsak();
    const behandlingIdParam = useBehandlingIdParam();

    if (!behandlingIdParam) {
        return <NotFound />;
    }

    if (!fagsak.behandlinger.some(it => it.behandlingId === behandlingIdParam)) {
        return <Navigate to={`/fagsak/${fagsak.id}`} replace={true} />;
    }

    if (toggles[FeatureToggle.brukReactQueryForBehandling]) {
        return <BehandlingMedReactQuery behandlingId={behandlingIdParam} />;
    }

    return <BehandlingMedUseHttp behandlingId={behandlingIdParam} />;
}
