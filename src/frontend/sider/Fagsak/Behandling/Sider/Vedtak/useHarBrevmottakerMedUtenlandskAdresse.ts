import { useBrevmottakereBehandling } from '@sider/Fagsak/Behandling/BrevmottakereBehandlingContext';
import { Brevmottakertype } from '@typer/brevmottaker';

export function useHarBrevmottakerMedUtenlandskAdresse() {
    const brevmottakere = useBrevmottakereBehandling();

    return brevmottakere.some(mottaker => mottaker.type === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE);
}
