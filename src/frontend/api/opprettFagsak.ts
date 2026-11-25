import { apiClient } from '@api/client/apiClient';
import type { FagsakType, IMinimalFagsak } from '@typer/fagsak';
import type { IInstitusjon } from '@typer/institusjon';

interface SkjermetBarnSøker {
    søkersIdent: string;
}

export interface OpprettFagsakPayload {
    personIdent: string;
    fagsakType: FagsakType;
    institusjon: IInstitusjon | null;
    skjermetBarnSøker: SkjermetBarnSøker | null;
}

export async function opprettFagsak(payload: OpprettFagsakPayload): Promise<IMinimalFagsak> {
    return apiClient.post<OpprettFagsakPayload, IMinimalFagsak>({
        url: `/familie-ba-sak/api/fagsaker`,
        data: payload,
    });
}
