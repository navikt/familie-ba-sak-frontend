import { BehandlerRolle, BehandlingSteg } from '../typer/behandling';

export const gruppeIdTilRolle = (gruppeId: string) => {
    switch (gruppeId) {
        case '199c2b39-e535-4ae8-ac59-8ccbee7991ae':
        case '93a26831-9866-4410-927b-74ff51a9107c':
            return BehandlerRolle.VEILEDER;
        case '847e3d72-9dc1-41c3-80ff-f5d4acdd5d46':
        case 'd21e00a4-969d-4b28-8782-dc818abfae65':
            return BehandlerRolle.SAKSBEHANDLER;
        case '7a271f87-39fb-468b-a9ee-6cf3c070f548':
        case '9449c153-5a1e-44a7-84c6-7cc7a8867233':
            return BehandlerRolle.BESLUTTER;
        default:
            return BehandlerRolle.SYSTEM;
    }
};

export const erLesevisning = (rolle: BehandlerRolle, steg: BehandlingSteg): boolean => {
    return rolle <= BehandlerRolle.VEILEDER || steg >= BehandlingSteg.GODKJENNE_VEDTAK;
};
