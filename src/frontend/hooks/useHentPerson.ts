import { useQuery } from '@tanstack/react-query';

import { useAppContext } from '../context/AppContext';
import { RessursResolver } from '../utils/ressursResolver';

interface Props {
    personIdent: string;
}

export function useHentPerson({ personIdent }: Props) {
    const { hentPerson } = useAppContext();
    return useQuery({
        queryKey: ['person', personIdent],
        queryFn: async () => {
            const ressurs = await hentPerson(personIdent);
            return RessursResolver.resolveToPromise(ressurs);
        },
    });
}
