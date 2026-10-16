import {
    BehandlingResultat,
    BehandlingStatus,
    Behandlingstype,
    BehandlingÅrsak,
    erBehandlingHenlagt,
    type IBehandling,
    MANUELLE_BEHANDLINGSÅRSAKER,
    type ManuellBehandlingÅrsak,
} from '@typer/behandling';
import { BehandlingKategori, behandlingstemaer, type IBehandlingstema } from '@typer/behandlingstema';
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

export function hentTilgjengeligeBehandlingstyper(
    fagsak: IMinimalFagsak | undefined,
    saksbehandler: Saksbehandler,
    erManuellJournalføring?: boolean
): (Behandlingstype | Tilbakekrevingsbehandlingstype | Klagebehandlingstype)[] {
    const behandling = fagsak ? hentAktivBehandlingPåMinimalFagsak(fagsak) : undefined;
    const harIkkeAktivBehandling = !behandling || behandling?.status === BehandlingStatus.AVSLUTTET;

    const kanOppretteFørstegangsbehandling =
        fagsak === undefined || (fagsak.status !== FagsakStatus.LØPENDE && harIkkeAktivBehandling);
    const kanOppretteRevurdering =
        harIkkeAktivBehandling &&
        (fagsak?.behandlinger.some(behandling => !erBehandlingHenlagt(behandling.resultat)) ?? false);
    const kanOppretteTekniskEndring = harIkkeAktivBehandling && saksbehandler.harSuperbrukertilgang;
    const kanOppretteKlagebehandling = fagsak !== undefined && !fagsak.finnesStrengtFortroligPersonIFagsak;
    const kanOppretteTilbakekreving = !erManuellJournalføring;
    const kanOppretteMigreringFraInfotrygd = !erManuellJournalføring && harIkkeAktivBehandling;

    return TILGJENGELIGE_BEHANDLINGSTYPER.filter(
        type =>
            (kanOppretteFørstegangsbehandling && type === Behandlingstype.FØRSTEGANGSBEHANDLING) ||
            (kanOppretteRevurdering && type === Behandlingstype.REVURDERING) ||
            (kanOppretteTekniskEndring && type === Behandlingstype.TEKNISK_ENDRING) ||
            (kanOppretteTilbakekreving && type === Tilbakekrevingsbehandlingstype.TILBAKEKREVING) ||
            (kanOppretteKlagebehandling && type === Klagebehandlingstype.KLAGE) ||
            (kanOppretteMigreringFraInfotrygd && type === Behandlingstype.MIGRERING_FRA_INFOTRYGD)
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

export function hentTilgjengeligeBehandlingstemaer(fagsakType: FagsakType | undefined): IBehandlingstema[] {
    return Object.values(behandlingstemaer)
        .filter(it => it.id !== 'NASJONAL_INSTITUSJON')
        .filter(it => it.kategori !== BehandlingKategori.EØS || fagsakType !== FagsakType.BARN_ENSLIG_MINDREÅRIG);
}

export const forrigeBehandlingVarTekniskEndringMedOpphør = (minimalFagsak?: IMinimalFagsak) => {
    const behandling = hentSisteIkkeHenlagteBehandling(minimalFagsak);
    return (
        behandling?.årsak === BehandlingÅrsak.TEKNISK_ENDRING &&
        (behandling.resultat === BehandlingResultat.OPPHØRT ||
            behandling.resultat === BehandlingResultat.ENDRET_OG_OPPHØRT)
    );
};
