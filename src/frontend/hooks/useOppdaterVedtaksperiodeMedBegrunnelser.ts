import { oppdaterVedtaksperiodeMedBegrunnelser } from '@api/oppdaterVedtaksperiodeMedBegrunnelser';
import { mutationKeys } from '@hooks/keys/mutationKeys';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { VedtakBegrunnelse } from '@typer/vedtak';
import type { IVedtaksperiodeMedBegrunnelser } from '@typer/vedtaksperiode';

type Options = Omit<
    UseMutationOptions<IVedtaksperiodeMedBegrunnelser[], DefaultError, Parameters>,
    'mutationKey' | 'mutationFn'
>;

interface Parameters {
    standardbegrunnelser: VedtakBegrunnelse[];
}

export function useOppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelserId: number, options?: Options) {
    return useMutation({
        mutationFn: (parameters: Parameters) => {
            const { standardbegrunnelser } = parameters;
            const payload = { standardbegrunnelser };
            return oppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelserId, payload);
        },
        mutationKey: mutationKeys.oppdaterVedtaksperiodeMedBegrunnelser(vedtaksperiodeMedBegrunnelserId),
        ...options,
    });
}
