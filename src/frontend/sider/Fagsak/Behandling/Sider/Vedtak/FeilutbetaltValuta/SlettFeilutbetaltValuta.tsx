import { queryKeys } from '@hooks/keys/queryKeys';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useSlettFeilutbetaltValuta } from '@hooks/useSlettFeilutbetaltValuta';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    feilutbetaltValutaId: number;
}

export function SlettFeilutbetaltValuta({ feilutbetaltValutaId }: Props) {
    const queryClient = useQueryClient();
    const behandlingId = useBehandlingId();

    const { mutate, isPending } = useSlettFeilutbetaltValuta({
        feilutbetaltValutaId: feilutbetaltValutaId,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.feilutbetaltValuta(behandlingId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandlingId) });
        },
    });

    const erLesevisning = useErLesevisning();

    if (erLesevisning) {
        return null;
    }

    return (
        <Tooltip content={'Fjern periode'}>
            <Button
                variant={'tertiary'}
                size={'small'}
                onClick={() => mutate({ behandlingId, feilutbetaltValutaId })}
                icon={<TrashIcon />}
                loading={isPending}
            />
        </Tooltip>
    );
}
