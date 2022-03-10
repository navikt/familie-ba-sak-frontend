import type { BehandlingSteg, IBehandling } from '../typer/behandling';
import { hentStegNummer } from '../typer/behandling';

export const behandlingErEtterSteg = (steg: BehandlingSteg, åpenBehandling?: IBehandling) => {
    const behandlingssteg = åpenBehandling?.steg ?? steg;
    return hentStegNummer(behandlingssteg) > hentStegNummer(steg);
};
