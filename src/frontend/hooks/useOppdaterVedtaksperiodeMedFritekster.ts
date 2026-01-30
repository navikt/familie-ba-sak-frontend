import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterVedtaksperiodeMedFritekster } from '../api/oppdaterVedtaksperiodeMedFritekster';
import type { IRestPutVedtaksperiodeMedFritekster, IVedtaksperiodeMedBegrunnelser } from '../typer/vedtaksperiode';

interface Parameters {
    vedtaksperiodeMedBegrunnelserId: number;
    payload: IRestPutVedtaksperiodeMedFritekster;
}

type Options = Omit<
    UseMutationOptions<IVedtaksperiodeMedBegrunnelser[], DefaultError, Parameters, unknown>,
    'mutationFn'
>;

export function useOppdaterVedtaksperiodeMedFritekster(options: Options = {}) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: ({ vedtaksperiodeMedBegrunnelserId, payload }: Parameters) => {
            return oppdaterVedtaksperiodeMedFritekster(request, vedtaksperiodeMedBegrunnelserId, payload);
        },
        ...options,
    });
}
