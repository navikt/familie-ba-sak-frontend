import { IBehandling } from '../typer/behandling';

export const aktivVedtakPåBehandling = (behandling?: IBehandling) =>
    behandling?.vedtakForBehandling.find(v => v.aktiv);

export interface IOpprettEllerHentFagsakData {
    personIdent: string | null;
    aktørId: string | null;
}
