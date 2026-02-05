import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterRegisteropplysninger } from '../api/oppdaterRegisteropplysninger';
import type { IBehandling } from '../typer/behandling';

interface Parameters {
    behandlingId: number;
    påvirkerSystemLaster?: boolean;
}

type Options = Omit<UseMutationOptions<IBehandling, DefaultError, Parameters>, 'mutationFn'>;

export function useOppdaterRegisteropplysninger(options: Options = {}) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { behandlingId, påvirkerSystemLaster = false } = parameters;
            return oppdaterRegisteropplysninger(request, behandlingId, påvirkerSystemLaster);
        },
        ...options,
    });
}
