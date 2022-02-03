import { BehandlingSteg, hentStegNummer, IBehandling } from '../typer/behandling';

export const behandlingErEtterSteg = (steg: BehandlingSteg, åpenBehandling?: IBehandling) => {
    const behandlingssteg = åpenBehandling?.steg ?? steg;
    return hentStegNummer(behandlingssteg) > hentStegNummer(steg);
};
