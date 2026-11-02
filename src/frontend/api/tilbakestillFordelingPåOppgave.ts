import { apiClient } from '@api/client/apiClient';
import type { IOppgave } from '@typer/oppgave';

interface PathParams {
    oppgaveId: string;
}

export async function tilbakestillFordelingPåOppgave(pathParams: PathParams): Promise<IOppgave> {
    const { oppgaveId } = pathParams;
    return apiClient.post<void, IOppgave>({
        url: `/familie-ba-sak/api/oppgave/${oppgaveId}/tilbakestill`,
    });
}
