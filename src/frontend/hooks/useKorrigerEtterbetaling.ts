import { useMutation } from '@tanstack/react-query';

import { useHttp } from '@navikt/familie-http';

import {
    angreKorrigertEtterbetalingAsync,
    korrigerEtterbetalingAsync,
    type KorrigerEtterbetalingPayload,
} from '../api/korrigerEtterbetaling';
import type { IBehandling } from '../typer/behandling';

interface KorrigerEtterbetalingParameters extends KorrigerEtterbetalingPayload {
    behandlingId: number;
}

export function useKorrigerEtterbetaling() {
    const { request } = useHttp();

    const korrigerEtterbetalingMutation = useMutation<
        IBehandling,
        Error,
        KorrigerEtterbetalingParameters
    >({
        mutationFn: (parameters: KorrigerEtterbetalingParameters): Promise<IBehandling> => {
            const { årsak, beløp, begrunnelse, behandlingId } = parameters;
            const payload = { årsak, beløp, begrunnelse };
            return korrigerEtterbetalingAsync(request, payload, behandlingId);
        },
    });

    const angreKorrigertEtterbetalingMutation = useMutation<IBehandling, Error, number>({
        mutationFn: (behandlingId: number): Promise<IBehandling> => {
            return angreKorrigertEtterbetalingAsync(request, behandlingId);
        },
    });

    return {
        korrigerEtterbetalingMutation,
        angreKorrigertEtterbetalingMutation,
    };
}
