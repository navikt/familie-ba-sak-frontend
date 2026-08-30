import type { ApiFeil } from '@api/client/apiClient';
import { oppdaterTilbakekrevingsvedtakMotregning } from '@api/oppdaterTilbakekrevingsvedtakMotregning';
import { MetaKey } from '@hooks/meta/metaKey';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';
import type { OppdaterTilbakekrevingsvedtakMotregningDTO } from '@typer/tilbakekrevingsvedtakMotregning';

interface Parameters {
    behandlingId: number;
    tilbakekrevingsvedtakMotregning: OppdaterTilbakekrevingsvedtakMotregningDTO;
}

type Options = Omit<UseMutationOptions<IBehandling, ApiFeil, Parameters>, 'mutationFn'>;

export function useOppdaterTilbakekrevingsvedtakMotregning(options?: Options) {
    return useMutation<IBehandling, ApiFeil, Parameters>({
        mutationFn: ({ behandlingId, tilbakekrevingsvedtakMotregning }: Parameters): Promise<IBehandling> => {
            return oppdaterTilbakekrevingsvedtakMotregning({ behandlingId }, tilbakekrevingsvedtakMotregning);
        },
        meta: { [MetaKey.VIS_SYSTEMET_LASTER]: true },
        ...options,
    });
}
