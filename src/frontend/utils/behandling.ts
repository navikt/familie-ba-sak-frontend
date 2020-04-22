import { BehandlingSteg } from '../typer/behandling';
import { useFagsakRessurser } from '../context/FagsakContext';
import { RessursStatus } from '../typer/ressurs';
import { useApp } from '../context/AppContext';

export const hentStegPåBehandlingOppe = (): BehandlingSteg | undefined => {
    const { behandlingOppe } = useFagsakRessurser();
    return behandlingOppe.status === RessursStatus.SUKSESS ? behandlingOppe.data.steg : undefined;
};

export const hentSaksbehandlerRolle = (): string | undefined => {
    // TODO: Enum for roller?
    const { innloggetSaksbehandler } = useApp();
    const saksbehandlerRolle = innloggetSaksbehandler && innloggetSaksbehandler.firstName; // TODO: Logikk som returnerer "høyeste" rolle?
    return saksbehandlerRolle;
};

export const erLesevisning = (): boolean | undefined => {
    return (
        hentSaksbehandlerRolle() === 'VEILEDERROLLE' || //TODO: Sjekk om veileder er høyeste blant grupper, evt om rolle er veileder
        hentStegPåBehandlingOppe() === BehandlingSteg.GODKJENNE_VEDTAK
    );
};
