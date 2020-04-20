import { IFagsak } from '../../frontend/typer/fagsak';
import { IBehandling, BehandlingSteg } from '../../frontend/typer/behandling';
export declare const mockFagsak: (id: number, søkerFødselsnummer: string) => {
    status: import("../../frontend/typer/ressurs").RessursStatus.IKKE_HENTET;
} | {
    status: import("../../frontend/typer/ressurs").RessursStatus.HENTER;
} | {
    melding: string;
    status: import("../../frontend/typer/ressurs").RessursStatus.IKKE_TILGANG;
} | {
    errorMelding?: string | undefined;
    melding: string;
    status: import("../../frontend/typer/ressurs").RessursStatus.FEILET;
} | {
    data: IFagsak;
    status: import("../../frontend/typer/ressurs").RessursStatus.SUKSESS;
} | null;
export declare const mockBehandling: (behandlingId: number, aktiv: boolean, steg: BehandlingSteg) => IBehandling;
