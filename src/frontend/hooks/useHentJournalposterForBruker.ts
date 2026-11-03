import { hentJournalposterForBruker } from '@api/hentJournalposterForBruker';
import { useQuery } from '@tanstack/react-query';

export const HentJournalposterForBrukerQueryKeyFactory = {
    journalposterForBruker: (ident: string) => ['journalposterForBruker', ident],
};

export function useHentJournalposterForBruker(ident: string) {
    return useQuery({
        queryKey: HentJournalposterForBrukerQueryKeyFactory.journalposterForBruker(ident),
        queryFn: () => hentJournalposterForBruker(ident),
    });
}
