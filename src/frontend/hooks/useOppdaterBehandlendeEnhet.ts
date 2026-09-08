import { oppdaterBehandlendeEnhet } from '@api/oppdaterBehandlendeEnhet';
import { useMutation } from '@tanstack/react-query';

interface Parameters {
    enhetId: string;
    begrunnelse: string;
}

export function useOppdaterBehandlendeEnhet(behandlingId: number) {
    return useMutation({
        mutationFn: (payload: Parameters) => oppdaterBehandlendeEnhet(behandlingId, payload),
    });
}
