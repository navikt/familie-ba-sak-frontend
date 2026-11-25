import { slettSammensattKontrollsak } from '@api/slettSammensattKontrollsak';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { MetaKey } from '@hooks/meta/metaKey';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestSammensattKontrollsak } from '@typer/sammensatt-kontrollsak';

type Options = Omit<UseMutationOptions<number, DefaultError, IRestSammensattKontrollsak>, 'mutationKey' | 'mutationFn'>;

export function useSlettSammensattKontrollsak(behandlingId: number, options?: Options) {
    return useMutation({
        mutationKey: mutationKeys.slettSammensattKontrollsak(behandlingId),
        mutationFn: (sammensattKontrollsak: IRestSammensattKontrollsak) =>
            slettSammensattKontrollsak(sammensattKontrollsak),
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
