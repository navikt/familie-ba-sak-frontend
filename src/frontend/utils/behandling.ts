import { erProd } from './miljø';
import { Behandlingstype, BehandlingÅrsak, type IBehandling } from '../typer/behandling';
import { BehandlerRolle } from '../typer/behandling';
import type { IGrunnlagPerson } from '../typer/person';
import { PersonType } from '../typer/person';
import { Målform } from '../typer/søknad';

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

export const gruppeIdTilSuperbrukerRolle = erProd()
    ? '9b8239c4-cca7-440b-b359-51a64e3f0f00'
    : '314fa714-f13c-4cdc-ac5c-e13ce08e241c';

export const hentSøkersMålform = (behandling: IBehandling) =>
    behandling.personer.find((person: IGrunnlagPerson) => {
        return person.type === PersonType.SØKER;
    })?.målform ?? Målform.NB;

export const MIDLERTIDIG_BEHANDLENDE_ENHET_ID = '4863';

export const erBehandlingMedVedtaksbrevutsending = (åpenBehandling: IBehandling) => {
    const { type, årsak } = åpenBehandling;

    const erBehandlingÅrsakUtenBrevutsending = [
        BehandlingÅrsak.SATSENDRING,
        BehandlingÅrsak.SMÅBARNSTILLEGG_ENDRING_FRAM_I_TID,
    ].includes(årsak);

    const erBehandlingTypeUtenBrevutsending = [
        Behandlingstype.MIGRERING_FRA_INFOTRYGD,
        Behandlingstype.TEKNISK_ENDRING,
    ].includes(type);

    return !erBehandlingTypeUtenBrevutsending && !erBehandlingÅrsakUtenBrevutsending;
};
