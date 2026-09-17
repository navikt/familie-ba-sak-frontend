import { useBehandling } from '@hooks/useBehandling';
import { Mottaker } from '@komponenter/Saklinje/Meny/LeggTilEllerFjernBrevmottakere/useBrevmottakerSkjema';

export function useHarBrevmottakerMedUtenlandskAdresse() {
    const behandling = useBehandling();

    return behandling.brevmottakere.some(mottaker => mottaker.type === Mottaker.BRUKER_MED_UTENLANDSK_ADRESSE);
}
