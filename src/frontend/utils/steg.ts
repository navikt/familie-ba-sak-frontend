import type { BehandlingSteg, IBehandling } from '../typer/behandling';
import { hentStegnummer } from '../typer/behandling';

export const behandlingErEtterSteg = (steg: BehandlingSteg, åpenBehandling?: IBehandling) => {
    const behandlingssteg = åpenBehandling?.steg ?? steg;
    return hentStegnummer(behandlingssteg) > hentStegnummer(steg);
};
