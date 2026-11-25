import { genererAInntektUrl } from '@api/genererAInntektUrl';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

interface Parameters {
    ident: string;
}

type Options = Omit<UseMutationOptions<string, DefaultError, Parameters>, 'mutationFn'>;

export function useGenererAInntektUrl(options?: Options) {
    return useMutation({
        mutationFn: ({ ident }: Parameters) => genererAInntektUrl({ ident }),
        ...options,
    });
}
