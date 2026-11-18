import { oppdaterVedtaksperiodeMedFritekster } from '@api/oppdaterVedtaksperiodeMedFritekster';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';

type Options = Omit<
    UseMutationOptions<IVedtaksperiodeMedBegrunnelser[], DefaultError, Parameters>,
    'mutationKey' | 'mutationFn'
>;

interface Parameters {
    fritekster: string[];
}

export function useOppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId: number, options?: Options) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { fritekster } = parameters;
            const payload = { fritekster };
            return oppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId, payload);
        },
        mutationKey: mutationKeys.oppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId),
        ...options,
    });
}
