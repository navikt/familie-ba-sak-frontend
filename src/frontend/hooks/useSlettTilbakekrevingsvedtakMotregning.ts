import type { ApiFeil } from '@api/client/apiClient';
import { slettTilbakekrevingsvedtakMotregning } from '@api/slettTilbakekrevingsvedtakMotregning';
import { MetaKey } from '@hooks/meta/metaKey';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

interface Parameters {
    behandlingId: number;
}

type Options = Omit<UseMutationOptions<null, ApiFeil, Parameters>, 'mutationFn'>;

export function useSlettTilbakekrevingsvedtakMotregning(options?: Options) {
    return useMutation<null, ApiFeil, Parameters>({
        mutationFn: ({ behandlingId }: Parameters): Promise<null> => {
            return slettTilbakekrevingsvedtakMotregning({ behandlingId });
        },
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
