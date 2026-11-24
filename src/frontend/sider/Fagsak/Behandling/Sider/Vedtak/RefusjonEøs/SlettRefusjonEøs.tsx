import { queryKeys } from '@hooks/keys/queryKeys';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useErLesevisning } from '@hooks/useErLesevisning';
import { useSlettRefusjonEøs } from '@hooks/useSlettRefusjonEøs';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
    refusjonEøsId: number;
}

export function SlettRefusjonEøs({ refusjonEøsId }: Props) {
    const queryClient = useQueryClient();
    const behandlingId = useBehandlingId();

    const { mutate, isPending } = useSlettRefusjonEøs({
        refusjonEøsId: refusjonEøsId,
        onSuccess: refusjonEøsPerioder => {
            queryClient.setQueryData(queryKeys.refusjonEøs(behandlingId), refusjonEøsPerioder);
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
                onClick={() => mutate({ behandlingId, refusjonEøsId })}
                icon={<TrashIcon />}
                loading={isPending}
            />
        </Tooltip>
    );
}
