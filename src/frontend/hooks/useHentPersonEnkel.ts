import { type DefaultError, useQuery, type UseQueryOptions } from '@tanstack/react-query';

import { useAppContext } from '../context/AppContext';
import type { IPersonInfo } from '../typer/person';
import { RessursResolver } from '../utils/ressursResolver';

export const HentPersonEnkelQueryKeyFactory = {
    personEnkel: (personIdent: string) => ['person_enkel', personIdent],
};

type Parameters = Omit<UseQueryOptions<IPersonInfo, DefaultError, IPersonInfo>, 'queryKey' | 'queryFn' | 'gcTime'> & {
    personIdent: string;
};

export function useHentPersonEnkel({ personIdent, ...rest }: Parameters) {
    const { hentPerson } = useAppContext();
    return useQuery({
        queryKey: HentPersonEnkelQueryKeyFactory.personEnkel(personIdent),
        queryFn: async () => {
            // TODO : Flytt "hentPerson" metoden fra AppContext til api mappen og omdøp den til "hentPersonEnkel",
            //  men må skrive om hvordan "AppInfoModal" fungerer først. Da burde man også tillate å sende inn "gcTime"
            //  og "påvirkerSystemLaster" som parameter.
            const ressurs = await hentPerson(personIdent);
            return RessursResolver.resolveToPromise(ressurs);
        },
        gcTime: 0, // deaktiver cache da "påvirkerSystemLaster" er false.
        ...rest,
    });
}
