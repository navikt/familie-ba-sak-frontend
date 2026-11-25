import { opprettSammensattKontrollsak } from '@api/opprettSammensattKontrollsak';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestOpprettSammensattKontrollsak, IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

type Parameters = IRestOpprettSammensattKontrollsak;

type Options = Omit<
    UseMutationOptions<IRestSammensattKontrollsak, DefaultError, Parameters>,
    'mutationKey' | 'mutationFn'
>;

export function useOpprettSammensattKontrollsak(behandlingId: number, options?: Options) {
    return useMutation({
        mutationKey: mutationKeys.opprettSammensattKontrollsak(behandlingId),
        mutationFn: (parameters: Parameters) => opprettSammensattKontrollsak(parameters),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
