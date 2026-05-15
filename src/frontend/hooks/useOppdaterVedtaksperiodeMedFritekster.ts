import { oppdaterVedtaksperiodeMedFritekster } from '@api/oppdaterVedtaksperiodeMedFritekster';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';

import { useHttp } from '@navikt/familie-http';

export const OppdaterVedtaksperiodeMedFriteksterMutationKeyFactory = {
    vedtaksperiodeMedFritekster: (vedtaksperiodeMedBegrunnelserId: number) => [
        'vedtaksperioderMedFritekster',
        vedtaksperiodeMedBegrunnelserId,
    ],
};

type Options = Omit<UseMutationOptions<IVedtaksperiodeMedBegrunnelser[], DefaultError, Parameters>, 'mutationFn'>;

interface Parameters {
    fritekster: string[];
}

export function useOppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId: number, options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { fritekster } = parameters;
            const payload = { fritekster };
            return oppdaterVedtaksperiodeMedFritekster(request, vedtaksperiodeMedBegrunnelserId, payload);
        },
        mutationKey: OppdaterVedtaksperiodeMedFriteksterMutationKeyFactory.vedtaksperiodeMedFritekster(
            vedtaksperiodeMedBegrunnelserId
        ),
        ...options,
    });
}
