import { BehandlerRolle, behandlingstyper, IBehandling } from '../typer/behandling';
import { IGrunnlagPerson, PersonType } from '../typer/person';
import { Målform } from '../typer/søknad';
import { erProd } from './miljø';

export const gruppeIdTilRolle = (gruppeId: string) => {
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
};

export const muligeBehandlingstyper = () => {
    return behandlingstyper;
};

export const hentSøkersMålform = (behandling: IBehandling) =>
    behandling.personer.find((person: IGrunnlagPerson) => {
        return person.type === PersonType.SØKER;
    })?.målform ?? Målform.NB;
