import { hentDataForManuellJournalføring } from '@api/hentDataForManuellJournalføring';
import { useQuery } from '@tanstack/react-query';

export const HentDataForManuellJournalføringQueryKeyFactory = {
    data: (oppgaveId: string) => ['hentDataForManuellJournalføring', oppgaveId],
};

export function useHentDataForManuellJournalføring(oppgaveId: string) {
    return useQuery({
        queryKey: HentDataForManuellJournalføringQueryKeyFactory.data(oppgaveId),
        queryFn: () => hentDataForManuellJournalføring(oppgaveId),
        enabled: !!oppgaveId, // TODO: sjekk dette
    });
}
