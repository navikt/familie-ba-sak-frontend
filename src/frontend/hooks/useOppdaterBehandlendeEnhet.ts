import { useMutation } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterBehandlendeEnhet } from '../api/oppdaterBehandlendeEnhet';

interface Parameters {
    enhetId: string;
    begrunnelse: string;
}

export function useOppdaterBehandlendeEnhet(behandlingId: number) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            return oppdaterBehandlendeEnhet(request, behandlingId, parameters);
        },
    });
}
