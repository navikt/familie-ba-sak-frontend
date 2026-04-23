import { Behandlingstype, BehandlingÅrsak, type IBehandling } from '../typer/behandling';
import type { IGrunnlagPerson } from '../typer/person';
import { PersonType } from '../typer/person';
import { Målform } from '../typer/søknad';

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
        BehandlingÅrsak.MÅNEDLIG_VALUTAJUSTERING,
        BehandlingÅrsak.IVERKSETTE_KA_VEDTAK,
        BehandlingÅrsak.FALSK_IDENTITET,
    ].includes(årsak);

    const erBehandlingTypeUtenBrevutsending = [
        Behandlingstype.MIGRERING_FRA_INFOTRYGD,
        Behandlingstype.TEKNISK_ENDRING,
    ].includes(type);

    return !erBehandlingTypeUtenBrevutsending && !erBehandlingÅrsakUtenBrevutsending;
};
