import { oppdaterVedtaksperiodeMedBegrunnelser } from '@api/oppdaterVedtaksperiodeMedBegrunnelser';
import { useHttp } from '@navikt/familie-http';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { VedtakBegrunnelse } from '@typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';

export const OppdaterVedtaksperiodeMedBegrunnelserMutationKeyFactory = {
    vedtaksperiodeMedBegrunnelser: (vedtaksperiodeMedBegrunnelserId: number) => [
        'vedtaksperiodeMedBegrunnelser',
        vedtaksperiodeMedBegrunnelserId,
    ],
};

type Options = Omit<UseMutationOptions<IVedtaksperiodeMedBegrunnelser[], DefaultError, Parameters>, 'mutationFn'>;

interface Parameters {
    standardbegrunnelser: VedtakBegrunnelse[];
}

export function useOppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelserId: number, options?: Options) {
    const { request } = useHttp();
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { standardbegrunnelser } = parameters;
            const payload = { standardbegrunnelser };
            return oppdaterVedtaksperiodeMedBegrunnelser(request, vedtaksperiodeMedBegrunnelserId, payload);
        },
        mutationKey: OppdaterVedtaksperiodeMedBegrunnelserMutationKeyFactory.vedtaksperiodeMedBegrunnelser(
            vedtaksperiodeMedBegrunnelserId
        ),
        ...options,
    });
}
