import type { Behandlingstype, BehandlingÅrsak } from '@typer/behandling';
import { type IBehandling } from '@typer/behandling';
import type { BehandlingKategori } from '@typer/behandlingstema';
import { type BehandlingUnderkategori } from '@typer/behandlingstema';
import type { IsoDatoString } from '@utils/dato';

import type { FamilieRequest } from '@navikt/familie-http/dist/HttpProvider';

import { RessursResolver } from '../utils/ressursResolver';

export interface OpprettBehandlingPayload {
    kategori: BehandlingKategori | null;
    underkategori: BehandlingUnderkategori | null;
    behandlingType: Behandlingstype;
    journalpostID?: string;
    behandlingÅrsak?: BehandlingÅrsak;
    skalBehandlesAutomatisk?: boolean;
    navIdent?: string;
    barnasIdenter?: string[];
    nyMigreringsdato?: IsoDatoString;
    søknadMottattDato?: IsoDatoString;
    fagsakId: number;
}

export async function opprettBehandling(request: FamilieRequest, payload: OpprettBehandlingPayload) {
    const ressurs = await request<OpprettBehandlingPayload, IBehandling>({
        data: payload,
        method: 'POST',
        url: `/familie-ba-sak/api/behandlinger`,
        påvirkerSystemLaster: true,
    });
    return RessursResolver.resolveToPromise(ressurs);
}
