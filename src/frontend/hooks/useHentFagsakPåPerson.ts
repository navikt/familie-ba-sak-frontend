import { hentFagsakPåPerson } from '@api/hentFagsakPåPerson';
import { MetaKey } from '@hooks/meta/metaKey';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IMinimalFagsak } from '@typer/fagsak';

export const HentFagsakPåPersonMutationKeyFactory = {
    hentFagsakPåPerson: () => ['hent_fagsak_på_person'],
};

interface Parameters {
    personIdent: string;
}

type Options = Omit<
    UseMutationOptions<IMinimalFagsak | undefined, DefaultError, Parameters>,
    'mutationKey' | 'mutationFn'
>;

export function useHentFagsakPåPerson(options?: Options) {
    return useMutation({
        mutationKey: HentFagsakPåPersonMutationKeyFactory.hentFagsakPåPerson(),
        mutationFn: ({ personIdent }: Parameters) => hentFagsakPåPerson({ personIdent }),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
