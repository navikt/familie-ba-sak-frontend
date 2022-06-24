import { BehandlingSteg, hentStegNummer } from '../../typer/behandling';

export const saksbehandlerHarKunLesevisning = (
    innloggetSaksbehandlerSkrivetilgang: boolean,
    saksbehandlerHarTilgangTilEnhet: boolean,
    steg: BehandlingSteg | undefined,
    erInnloggetBrukerBehandletSaken: boolean, // Hvis innlogget saksbehandler er en annen enn som behandlet saken
    sjekkTilgangTilEnhet = true
) => {
    if (sjekkTilgangTilEnhet) {
        if (!saksbehandlerHarTilgangTilEnhet || !innloggetSaksbehandlerSkrivetilgang) {
            return true;
        }
    } else if (!innloggetSaksbehandlerSkrivetilgang) {
        return true;
    }

    if (steg === undefined) {
        return true;
    }
    const stegNummer = hentStegNummer(steg);
    const stegNummerForBeslutterVedtak = hentStegNummer(BehandlingSteg.BESLUTTE_VEDTAK);

    if (stegNummer < stegNummerForBeslutterVedtak) {
        return false;
    } else if (stegNummer === stegNummerForBeslutterVedtak && !erInnloggetBrukerBehandletSaken) {
        return false;
    } else {
        // Default til lesevisning dersom vi er usikre
        return true;
    }
};
