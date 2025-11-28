import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Loader, Tooltip } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useSlettRefusjonEøs } from '../../../../../../hooks/useSlettRefusjonEøs';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface Props {
    refusjonEøsId: number;
}

export function SlettRefusjonEøs({ refusjonEøsId }: Props) {
    const { behandling, settÅpenBehandling, vurderErLesevisning } = useBehandlingContext();

    const { mutate, isPending } = useSlettRefusjonEøs({
        refusjonEøsId: refusjonEøsId,
        onSuccess: behandling => {
            settÅpenBehandling(byggSuksessRessurs(behandling), false);
        },
    });

    const erLesevisning = vurderErLesevisning();

    if (erLesevisning) {
        return null;
    }

    return (
        <Tooltip content={'Fjern periode'}>
            <Button
                icon={isPending ? <Loader size={'small'} /> : <TrashIcon />}
                variant={'tertiary'}
                size={'small'}
                onClick={() => mutate({ behandlingId: behandling.behandlingId, refusjonEøsId })}
                disabled={erLesevisning || isPending}
            />
        </Tooltip>
    );
}
