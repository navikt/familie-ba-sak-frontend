import {
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
    erBehandlingHenlagt,
    MANUELLE_BEHANDLINGSÅRSAKER,
    type IBehandling,
    type ManuellBehandlingÅrsak,
} from '@typer/behandling';
import { FagsakStatus, type IMinimalFagsak } from '@typer/fagsak';
import { Klagebehandlingstype } from '@typer/klage';
import type { IGrunnlagPerson } from '@typer/person';
import { PersonType } from '@typer/person';
import type { Saksbehandler } from '@typer/saksbehandler';
import { Målform } from '@typer/søknad';
import { Tilbakekrevingsbehandlingstype } from '@typer/tilbakekrevingsbehandling';
import { hentAktivBehandlingPåMinimalFagsak, hentSisteIkkeHenlagteBehandling } from '@utils/fagsak';

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

const TILGJENGELIGE_BEHANDLINGSTYPER = [
    Behandlingstype.FØRSTEGANGSBEHANDLING,
    Behandlingstype.REVURDERING,
    Behandlingstype.TEKNISK_ENDRING,
    Tilbakekrevingsbehandlingstype.TILBAKEKREVING,
    Klagebehandlingstype.KLAGE,
    Behandlingstype.MIGRERING_FRA_INFOTRYGD,
];

export function hentTilgjengeligeBehandlingstyper(fagsak: IMinimalFagsak, saksbehandler: Saksbehandler) {
    const behandling = fagsak ? hentAktivBehandlingPåMinimalFagsak(fagsak) : undefined;
    const harIkkeAktivBehandling = !behandling || behandling?.status === BehandlingStatus.AVSLUTTET;

    const kanOppretteFørstegangsbehandling =
        fagsak === undefined || (fagsak.status !== FagsakStatus.LØPENDE && harIkkeAktivBehandling);
    const kanOppretteRevurdering =
        harIkkeAktivBehandling &&
        (fagsak?.behandlinger.some(behandling => !erBehandlingHenlagt(behandling.resultat)) ?? false);
    const kanOppretteTekniskEndring = harIkkeAktivBehandling && saksbehandler.harSuperbrukertilgang;
    const kanOppretteKlagebehandling = fagsak !== undefined && !fagsak.finnesStrengtFortroligPersonIFagsak;

    return TILGJENGELIGE_BEHANDLINGSTYPER.filter(
        type =>
            (kanOppretteFørstegangsbehandling && type === Behandlingstype.FØRSTEGANGSBEHANDLING) ||
            (kanOppretteRevurdering && type === Behandlingstype.REVURDERING) ||
            (kanOppretteTekniskEndring && type === Behandlingstype.TEKNISK_ENDRING) ||
            type === Tilbakekrevingsbehandlingstype.TILBAKEKREVING ||
            (kanOppretteKlagebehandling && type === Klagebehandlingstype.KLAGE) ||
            (harIkkeAktivBehandling && type === Behandlingstype.MIGRERING_FRA_INFOTRYGD)
    );
}

export const hentTilgjengeligeBehandlingsårsaker = (
    erMigreringFraInfotrygd: boolean,
    kanOppretteHelmanuellMigrering: boolean,
    kanOppretteEndreMigreringsdato: boolean
): ManuellBehandlingÅrsak[] =>
    erMigreringFraInfotrygd
        ? MANUELLE_BEHANDLINGSÅRSAKER.filter(
              årsak =>
                  (kanOppretteHelmanuellMigrering && årsak === BehandlingÅrsak.HELMANUELL_MIGRERING) ||
                  (kanOppretteEndreMigreringsdato && årsak === BehandlingÅrsak.ENDRE_MIGRERINGSDATO)
          )
        : MANUELLE_BEHANDLINGSÅRSAKER.filter(
              årsak => årsak !== BehandlingÅrsak.ENDRE_MIGRERINGSDATO && årsak !== BehandlingÅrsak.HELMANUELL_MIGRERING
          );

export const forrigeBehandlingVarTekniskEndringMedOpphør = (minimalFagsak?: IMinimalFagsak) => {
    const behandling = hentSisteIkkeHenlagteBehandling(minimalFagsak);
    return (
        behandling?.årsak === BehandlingÅrsak.TEKNISK_ENDRING &&
        (behandling.resultat === BehandlingResultat.OPPHØRT ||
            behandling.resultat === BehandlingResultat.ENDRET_OG_OPPHØRT)
    );
};
