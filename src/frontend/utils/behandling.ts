import {
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
    erBehandlingHenlagt,
    type IBehandling,
} from '@typer/behandling';
import { behandlingstemaer, type IBehandlingstema } from '@typer/behandlingstema';
import { FagsakStatus, FagsakType, type IMinimalFagsak } from '@typer/fagsak';
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

// Behandlingstema-feltet vises ikke for institusjonssaker, men backend krever kategori/underkategori
export function hentDefaultBehandlingstema(fagsakType: FagsakType | undefined): IBehandlingstema | undefined {
    return fagsakType === FagsakType.INSTITUSJON ? behandlingstemaer.NASJONAL_INSTITUSJON : undefined;
}

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
