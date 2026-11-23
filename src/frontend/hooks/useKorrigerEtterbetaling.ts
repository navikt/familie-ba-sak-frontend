import { type KorrigerEtterbetalingPayload, korrigerEtterbetaling } from '@api/korrigerEtterbetaling';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import type { IRestKorrigertEtterbetaling } from '@typer/vedtak';

interface KorrigerEtterbetalingParameters extends KorrigerEtterbetalingPayload {
    behandlingId: number;
}

type Options = Omit<
    UseMutationOptions<IRestKorrigertEtterbetaling, DefaultError, KorrigerEtterbetalingParameters>,
    'mutationFn'
>;

export function useKorrigerEtterbetaling(options?: Options) {
    return useMutation<IRestKorrigertEtterbetaling, Error, KorrigerEtterbetalingParameters>({
        mutationFn: (parameters: KorrigerEtterbetalingParameters): Promise<IRestKorrigertEtterbetaling> => {
            const { årsak, beløp, begrunnelse, behandlingId } = parameters;
            const payload = { årsak, beløp, begrunnelse };
            return korrigerEtterbetaling(payload, behandlingId);
        },
        ...options,
    });
}
