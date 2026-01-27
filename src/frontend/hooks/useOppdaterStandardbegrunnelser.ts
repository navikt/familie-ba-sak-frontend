import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import { oppdaterStandardbegrunnelser } from '../api/oppdaterStandardbegrunnelser';
import type { VedtakBegrunnelse } from '../typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '../typer/vedtaksperiode';

interface Payload {
    standardbegrunnelser: VedtakBegrunnelse[];
}

export const OppdaterStandardbegrunnelserMutationKeyFactory = {
    vedtaksperiodeMedBegrunnelser: (vedtaksperiodeMedBegrunnelser: number) => [
        'standardbegrunnelser',
        vedtaksperiodeMedBegrunnelser,
    ],
};

type Options = Omit<UseMutationOptions<IVedtaksperiodeMedBegrunnelser[], DefaultError, Payload, unknown>, 'mutationFn'>;

export function useOppdaterStandardbegrunnelser(vedtaksperiodeMedBegrunnelserId: number, options: Options = {}) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (payload: Payload) => {
            return oppdaterStandardbegrunnelser(request, vedtaksperiodeMedBegrunnelserId, payload);
        },
        mutationKey: OppdaterStandardbegrunnelserMutationKeyFactory.vedtaksperiodeMedBegrunnelser(
            vedtaksperiodeMedBegrunnelserId
        ),
        ...options,
    });
}
