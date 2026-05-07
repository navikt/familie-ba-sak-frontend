import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { useSaksbehandler } from '@hooks/useSaksbehandler';
import { FeatureToggle } from '@typer/featureToggles';

export function useSkalObfuskereData() {
    const toggles = useFeatureToggles();
    const saksbehandler = useSaksbehandler();
    return toggles[FeatureToggle.skalObfuskereData] && !saksbehandler.harSkrivetilgang;
}
