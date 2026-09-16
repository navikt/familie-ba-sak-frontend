import type { IDokumentInfo } from '@navikt/familie-typer';
import type { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import type { BehandlingKategori, BehandlingUnderkategori } from '@typer/behandlingstema';
import type { FagsakType } from '@typer/fagsak';
import type { IInstitusjon } from '@typer/institusjon';
import type { Klagebehandlingstype } from '@typer/klage';
import type { TilknyttetBehandling } from '@typer/manuell-journalføring';
import type { IPersonInfo } from '@typer/person';
import type { Tilbakekrevingsbehandlingstype } from '@typer/tilbakekrevingsbehandling';

export interface ManuellJournalføring {
    journalpostTittel: string;
    kategori: BehandlingKategori | null;
    underkategori: BehandlingUnderkategori | null;
    bruker: IPersonInfo; // TODO: ikke riktig type?
    avsender: IPersonInfo; // TODO: ^
    datoMottatt: string | undefined;
    dokumenter: IDokumentInfo[]; // TODO: er denne riktig?
    tilknyttedeBehandlinger: TilknyttetBehandling[];
    opprettOgKnyttTilNyBehandling: boolean;
    nyBehandlingstype: Behandlingstype | Klagebehandlingstype | Tilbakekrevingsbehandlingstype;
    nyBehandlingsårsak: BehandlingÅrsak;
    navIdent: string;
    fagsakType: FagsakType;
    institusjon: IInstitusjon | null;
}
