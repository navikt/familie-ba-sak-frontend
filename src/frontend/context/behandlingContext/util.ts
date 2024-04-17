import { BehandlingSteg, hentStegNummer } from '../../typer/behandling';

export const saksbehandlerHarKunLesevisning = (
    innloggetSaksbehandlerSkrivetilgang: boolean,
    saksbehandlerHarTilgangTilEnhet: boolean,
    steg: BehandlingSteg | undefined,
    sjekkTilgangTilEnhet = true
) => {
    if (sjekkTilgangTilEnhet) {
        if (!saksbehandlerHarTilgangTilEnhet || !innloggetSaksbehandlerSkrivetilgang) {
            return true;
        }
    } else if (!innloggetSaksbehandlerSkrivetilgang) {
        return true;
    }

    const saksbehandlerKanRedigere =
        steg && hentStegNummer(steg) < hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

    return !saksbehandlerKanRedigere;
};
