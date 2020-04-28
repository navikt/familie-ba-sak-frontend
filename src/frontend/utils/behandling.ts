import { BehandlerRolle } from '../typer/behandling';

export const gruppeIdTilRolle = (gruppeId: string) => {
    const host = window.location.host;
    const rolleConfig =
        host === 'barnetrygd.nais.adeo.no' || host === 'barnetrygd.prod-fss.nais.io'
            ? new Map([
                  ['199c2b39-e535-4ae8-ac59-8ccbee7991ae', BehandlerRolle.VEILEDER],
                  ['847e3d72-9dc1-41c3-80ff-f5d4acdd5d46', BehandlerRolle.SAKSBEHANDLER],
                  ['7a271f87-39fb-468b-a9ee-6cf3c070f548', BehandlerRolle.BESLUTTER],
              ])
            : new Map([
                  ['93a26831-9866-4410-927b-74ff51a9107c', BehandlerRolle.VEILEDER],
                  ['d21e00a4-969d-4b28-8782-dc818abfae65', BehandlerRolle.SAKSBEHANDLER],
                  ['9449c153-5a1e-44a7-84c6-7cc7a8867233', BehandlerRolle.BESLUTTER],
              ]);
    return rolleConfig.get(gruppeId) ?? BehandlerRolle.SYSTEM;
};
