import { BehandlingSteg } from '../typer/behandling';
import { useFagsakRessurser } from '../context/FagsakContext';
import { RessursStatus } from '../typer/ressurs';
import { useApp } from '../context/AppContext';

export const hentStegPåBehandlingOppe = (): BehandlingSteg | undefined => {
    const { behandlingOppe } = useFagsakRessurser();
    return behandlingOppe.status === RessursStatus.SUKSESS ? behandlingOppe.data.steg : undefined;
};

export const erLesevisning = (): boolean | undefined => {
    const { innloggetSaksbehandler } = useApp();
    const saksbehandlerRolle = innloggetSaksbehandler && innloggetSaksbehandler.firstName; // TODO: Hvis veileder-rolle
    return (
        saksbehandlerRolle === 'Nina' ||
        hentStegPåBehandlingOppe() === BehandlingSteg.GODKJENNE_VEDTAK
    );
};
