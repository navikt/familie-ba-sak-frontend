import { apiClient } from '@api/client/apiClient';

interface PathParams {
    oppgaveId: string;
}

interface QueryParams {
    saksbehandler: string;
}

export async function fordelOppgave(pathParams: PathParams, queryParams: QueryParams): Promise<string> {
    const { oppgaveId } = pathParams;
    return apiClient.post<void, string>({
        url: `/familie-ba-sak/api/oppgave/${oppgaveId}/fordel`,
        params: queryParams,
    });
}
