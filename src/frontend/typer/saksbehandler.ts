import type { ISaksbehandler } from '@navikt/familie-typer';

import { BehandlerRolle } from './behandling';
import { erProd } from '../utils/miljø';

function gruppeIdTilRolle(gruppeId: string) {
    const rolleConfig = erProd()
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
    return rolleConfig.get(gruppeId) ?? BehandlerRolle.UKJENT;
}

function hentGruppeIdTilSuperbrukerRolle() {
    return erProd() ? '9b8239c4-cca7-440b-b359-51a64e3f0f00' : '314fa714-f13c-4cdc-ac5c-e13ce08e241c';
}

export interface Saksbehandler extends ISaksbehandler {
    groups: string[];
}

export function utledBehandlerRolle(saksbehandler: Saksbehandler): BehandlerRolle {
    let rolle = BehandlerRolle.UKJENT;
    saksbehandler.groups.forEach(id => {
        rolle = rolle < gruppeIdTilRolle(id) ? gruppeIdTilRolle(id) : rolle;
    });
    if (rolle === BehandlerRolle.UKJENT) {
        throw new Error('Finner ikke rolle til saksbehandler.');
    }
    return rolle;
}

export function harSuperbrukerTilgang(saksbehandler: Saksbehandler) {
    return saksbehandler.groups.includes(hentGruppeIdTilSuperbrukerRolle());
}

export function harSkrivetilgang(saksbehandler: Saksbehandler) {
    const rolle = utledBehandlerRolle(saksbehandler);
    return rolle >= BehandlerRolle.SAKSBEHANDLER;
}
