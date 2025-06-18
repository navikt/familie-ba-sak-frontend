import { useQuery } from '@tanstack/react-query';

import { useAppContext } from '../context/AppContext';
import { RessursResolver } from '../utils/ressursResolver';

interface Props {
    personIdent: string;
}

export function useHentPersonEnkel({ personIdent }: Props) {
    const { hentPerson } = useAppContext();
    return useQuery({
        queryKey: ['person_enkel', personIdent],
        queryFn: async () => {
            // TODO : Flytt "hentPerson" metoden fra AppContext til api mappen og omdøp den til "hentPersonEnkel",
            //  men må skrive om hvordan "AppInfoModal" fungerer først
            const ressurs = await hentPerson(personIdent);
            return RessursResolver.resolveToPromise(ressurs);
        },
    });
}
