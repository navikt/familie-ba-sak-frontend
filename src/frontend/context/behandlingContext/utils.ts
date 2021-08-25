import { BehandlingSteg, hentStegNummer } from '../../typer/behandling';

export const saksbehandlerHarKunLesevisning = (
    innloggetSaksbehandlerSkrivetilgang: boolean,
    steg: BehandlingSteg | undefined
) => {
    if (
        innloggetSaksbehandlerSkrivetilgang &&
        steg &&
        hentStegNummer(steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK)
    ) {
        return false;
    } else if (!innloggetSaksbehandlerSkrivetilgang) {
        return true;
    } else {
        // Default til lesevisning dersom vi er usikre
        return true;
    }
};
