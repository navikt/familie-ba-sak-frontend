import { useBehandling } from '@hooks/useBehandling';
import { BehandlingResultat } from '@typer/behandling';

export function useErAutomatiskBehandlingFortsattInnvilget() {
    const behandling = useBehandling();

    return behandling.resultat === BehandlingResultat.FORTSATT_INNVILGET && behandling.skalBehandlesAutomatisk;
}
