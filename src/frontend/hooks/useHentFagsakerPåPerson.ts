import { hentFagsaker } from '@api/hentFagsaker';
import { MetaKey } from '@hooks/meta/metaKey';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IMinimalFagsak } from '@typer/fagsak';

export const HentFagsakerPåPersonMutationKeyFactory = {
    hentFagsakerPåPerson: () => ['hent_fagsaker_på_person'],
};

interface Parameters {
    personIdent: string;
}

type Options = Omit<UseMutationOptions<IMinimalFagsak[], DefaultError, Parameters>, 'mutationKey' | 'mutationFn'>;

export function useHentFagsakerPåPerson(options?: Options) {
    return useMutation({
        mutationKey: HentFagsakerPåPersonMutationKeyFactory.hentFagsakerPåPerson(),
        mutationFn: ({ personIdent }: Parameters) => hentFagsaker({ personIdent }),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
