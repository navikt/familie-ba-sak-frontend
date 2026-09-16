import { journalfør } from '@api/journalfør';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestJournalføring } from '@typer/manuell-journalføring';

interface ManuellJournalføringParameters extends IRestJournalføring {
    journalpostId: string;
    oppgaveId: string;
    saksbehandlerEnhet: string;
}

type Options = Omit<UseMutationOptions<IRestJournalføring, Error, IRestJournalføring>, 'mutationFn'>;

export function useJournalfør(options?: Options) {
    return useMutation<IRestJournalføring, Error, IRestJournalføring>({
        mutationFn: ({
            journalpostId,
            oppgaveId,
            saksbehandlerEnhet,
            ...payload
        }: ManuellJournalføringParameters): Promise<IRestJournalføring> =>
            journalfør(payload, journalpostId, oppgaveId, saksbehandlerEnhet),
        ...options,
    });
}
