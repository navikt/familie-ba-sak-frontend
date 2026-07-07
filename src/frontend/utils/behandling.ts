import { BehandlingResultat, Behandlingstype, BehandlingÅrsak, type IBehandling } from '@typer/behandling';
import type { IMinimalFagsak } from '@typer/fagsak';
import type { IGrunnlagPerson } from '@typer/person';
import { PersonType } from '@typer/person';
import { Målform } from '@typer/søknad';
import { hentSisteIkkeHenlagteBehandling } from '@utils/fagsak';

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

export const hentTilgjengeligeBehandlingsårsaker = (
    erMigreringFraInfotrygd: boolean,
    kanOpprettMigreringsbehandlingMedHelmanuellMigrering: boolean,
    kanOppretteMigreringsbehandlingMedEndreMigreringsdato: boolean
): BehandlingÅrsak[] =>
    erMigreringFraInfotrygd
        ? Object.values(BehandlingÅrsak).filter(
              årsak =>
                  (kanOpprettMigreringsbehandlingMedHelmanuellMigrering &&
                      årsak === BehandlingÅrsak.HELMANUELL_MIGRERING) ||
                  (kanOppretteMigreringsbehandlingMedEndreMigreringsdato &&
                      årsak === BehandlingÅrsak.ENDRE_MIGRERINGSDATO)
          )
        : Object.values(BehandlingÅrsak).filter(
              årsak =>
                  årsak !== BehandlingÅrsak.TEKNISK_OPPHØR &&
                  årsak !== BehandlingÅrsak.TEKNISK_ENDRING &&
                  årsak !== BehandlingÅrsak.FØDSELSHENDELSE &&
                  årsak !== BehandlingÅrsak.SATSENDRING &&
                  årsak !== BehandlingÅrsak.MIGRERING &&
                  årsak !== BehandlingÅrsak.OMREGNING_6ÅR &&
                  årsak !== BehandlingÅrsak.OMREGNING_18ÅR &&
                  årsak !== BehandlingÅrsak.OMREGNING_SMÅBARNSTILLEGG &&
                  årsak !== BehandlingÅrsak.KORREKSJON_VEDTAKSBREV &&
                  årsak !== BehandlingÅrsak.ENDRE_MIGRERINGSDATO &&
                  årsak !== BehandlingÅrsak.HELMANUELL_MIGRERING &&
                  årsak !== BehandlingÅrsak.MÅNEDLIG_VALUTAJUSTERING &&
                  årsak !== BehandlingÅrsak.KLAGE &&
                  årsak !== BehandlingÅrsak.FINNMARKSTILLEGG &&
                  årsak !== BehandlingÅrsak.SVALBARDTILLEGG
          );

export const forrigeBehandlingVarTekniskEndringMedOpphør = (minimalFagsak?: IMinimalFagsak) => {
    const behandling = hentSisteIkkeHenlagteBehandling(minimalFagsak);
    return (
        behandling?.årsak === BehandlingÅrsak.TEKNISK_ENDRING &&
        (behandling.resultat === BehandlingResultat.OPPHØRT ||
            behandling.resultat === BehandlingResultat.ENDRET_OG_OPPHØRT)
    );
};
