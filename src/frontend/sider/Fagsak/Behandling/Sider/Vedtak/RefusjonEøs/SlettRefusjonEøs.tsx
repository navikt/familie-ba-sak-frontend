import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useRefusjonEøsTabellContext } from './RefusjonEøsTabellContext';
import { useSlettRefusjonEøs } from '../../../../../../hooks/useSlettRefusjonEøs';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface Props {
    refusjonEøsId: number;
}

export function SlettRefusjonEøs({ refusjonEøsId }: Props) {
    const { behandling, settÅpenBehandling, vurderErLesevisning } = useBehandlingContext();
    const { erLeggTilRefusjonEøsFormÅpen, skjulRefusjonEøsTabell } = useRefusjonEøsTabellContext();

    const { mutate, isPending } = useSlettRefusjonEøs({
        refusjonEøsId: refusjonEøsId,
        onSuccess: behandling => {
            settÅpenBehandling(byggSuksessRessurs(behandling));
            if (!erLeggTilRefusjonEøsFormÅpen && behandling.refusjonEøs.length === 0) {
                skjulRefusjonEøsTabell();
            }
        },
    });

    const erLesevisning = vurderErLesevisning();

    if (erLesevisning) {
        return null;
    }

    return (
        <Tooltip content={'Fjern periode'}>
            <Button
                variant={'tertiary'}
                size={'small'}
                onClick={() => mutate({ behandlingId: behandling.behandlingId, refusjonEøsId })}
                icon={<TrashIcon />}
                loading={isPending}
            />
        </Tooltip>
    );
}
