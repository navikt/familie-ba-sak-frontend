import { useBehandling } from '@hooks/useBehandling';
import { Brevmottakertype } from '@typer/brevmottaker';

export function useHarBrevmottakerMedUtenlandskAdresse() {
    const behandling = useBehandling();

    return behandling.brevmottakere.some(mottaker => mottaker.type === Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE);
}
