import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterVedtaksperiodeMedFritekster } from '../api/oppdaterVedtaksperiodeMedFritekster';
import type { IRestPutVedtaksperiodeMedFritekster, IVedtaksperiodeMedBegrunnelser } from '../typer/vedtaksperiode';

export const OppdaterVedtaksperioderMedFriteksterMutationKeyFactory = {
    vedtaksperiodeMedBegrunnelser: (vedtaksperiodeMedBegrunnelser: number) => [
        'vedtaksperioderMedFritekster',
        vedtaksperiodeMedBegrunnelser,
    ],
};
type Options = Omit<
    UseMutationOptions<IVedtaksperiodeMedBegrunnelser[], DefaultError, IRestPutVedtaksperiodeMedFritekster, unknown>,
    'mutationFn'
>;

export function useOppdaterVedtaksperiodeMedFritekster(vedtaksperiodeMedBegrunnelserId: number, options: Options = {}) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (payload: IRestPutVedtaksperiodeMedFritekster) => {
            return oppdaterVedtaksperiodeMedFritekster(request, vedtaksperiodeMedBegrunnelserId, payload);
        },
        mutationKey: OppdaterVedtaksperioderMedFriteksterMutationKeyFactory.vedtaksperiodeMedBegrunnelser(
            vedtaksperiodeMedBegrunnelserId
        ),
        ...options,
    });
}
