import { useBehandling } from '@hooks/useBehandling';
import { useFeatureToggles } from '@hooks/useFeatureToggles';
import { Behandlingstype, erBehandlingAvslått, erBehandlingFortsattInnvilget } from '@typer/behandling';
import { FeatureToggle } from '@typer/featureToggles';

export function useSkalViseSammensattKontrollsakMenyvalg() {
    const toggles = useFeatureToggles();
    const behandling = useBehandling();

    if (!toggles[FeatureToggle.kanOppretteOgEndreSammensatteKontrollsaker]) {
        return false;
    }

    return (
        behandling.type !== Behandlingstype.FØRSTEGANGSBEHANDLING &&
        !erBehandlingAvslått(behandling.resultat) &&
        !erBehandlingFortsattInnvilget(behandling.resultat)
    );
}
