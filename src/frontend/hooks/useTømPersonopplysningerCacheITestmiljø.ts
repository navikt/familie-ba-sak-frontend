import { tømPersonopplysningerCacheITestmiljø } from '@api/tømPersonopplysningerCacheITestmiljø';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';

type Options = Omit<UseMutationOptions<string, DefaultError, void>, 'mutationFn'>;

export function useTømPersonopplysningerCacheITestmiljø(options?: Options) {
    return useMutation({
        mutationFn: () => tømPersonopplysningerCacheITestmiljø(),
        ...options,
    });
}
