import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValutaTabellContext';
import { useSlettFeilutbetaltValuta } from '../../../../../../hooks/useSlettFeilutbetaltValuta';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface Props {
    feilutbetaltValutaId: number;
}

export function SlettFeilutbetaltValuta({ feilutbetaltValutaId }: Props) {
    const { behandling, settÅpenBehandling, vurderErLesevisning } = useBehandlingContext();
    const { erLeggTilFeilutbetaltValutaFormÅpen, skjulFeilutbetaltValutaTabell } = useFeilutbetaltValutaTabellContext();

    const { mutate, isPending } = useSlettFeilutbetaltValuta({
        feilutbetaltValutaId: feilutbetaltValutaId,
        onSuccess: behandling => {
            settÅpenBehandling(byggSuksessRessurs(behandling));
            if (!erLeggTilFeilutbetaltValutaFormÅpen && behandling.feilutbetaltValuta.length === 0) {
                skjulFeilutbetaltValutaTabell();
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
                onClick={() => mutate({ behandlingId: behandling.behandlingId, feilutbetaltValutaId })}
                icon={<TrashIcon />}
                loading={isPending}
            />
        </Tooltip>
    );
}
