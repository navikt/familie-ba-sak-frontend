import { BehandlerRolle } from '../typer/behandling';

export const gruppeIdTilRolle = (gruppeId: string) => {
    switch (gruppeId) {
        case '199c2b39-e535-4ae8-ac59-8ccbee7991ae':
            return BehandlerRolle.VEILEDER;
        case '847e3d72-9dc1-41c3-80ff-f5d4acdd5d46':
            return BehandlerRolle.SAKSBEHANDLER;
        case '7a271f87-39fb-468b-a9ee-6cf3c070f548':
            return BehandlerRolle.BESLUTTER;
        default:
            return BehandlerRolle.SYSTEM;
    }
};
