import { useBehandlingIdParam } from '@hooks/useBehandlingIdParam';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { useNavigerTilFagsakHvisBehandlingIkkeTilhørerFagsak } from '@hooks/useNavigerTilFagsakHvisBehandlingIkkeTilhørerFagsak';
import { NotFound } from '@komponenter/Error/NotFound';
import { FeatureToggle } from '@typer/featureToggles';

import { BehandlingMedReactQuery } from './BehandlingMedReactQuery';
import { BehandlingMedUseHttp } from './BehandlingMedUseHttp';

export function Behandling() {
    const toggles = useFeatureToggles();
    const behandlingIdParam = useBehandlingIdParam();

    useNavigerTilFagsakHvisBehandlingIkkeTilhørerFagsak({ behandlingIdParam });

    if (!behandlingIdParam) {
        return <NotFound />;
    }

    if (toggles[FeatureToggle.brukReactQueryForBehandling]) {
        return <BehandlingMedReactQuery behandlingId={behandlingIdParam} />;
    }

    return <BehandlingMedUseHttp behandlingId={behandlingIdParam} />;
}
