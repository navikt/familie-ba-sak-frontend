import { opprettEndretUtbetalingAndel } from '@api/opprettEndretUtbetalingAndel';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useHttp } from '@navikt/familie-http';
import { type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IBehandling } from '@typer/behandling';

type Options = Omit<UseMutationOptions<IBehandling>, 'mutationFn'>;

export function useOpprettEndretUtbetalingAndel(options?: Options) {
    const { request } = useHttp();
    const behandlingId = useBehandlingId();
    return useMutation({
        mutationFn: () => opprettEndretUtbetalingAndel(request, behandlingId),
        ...options,
    });
}
