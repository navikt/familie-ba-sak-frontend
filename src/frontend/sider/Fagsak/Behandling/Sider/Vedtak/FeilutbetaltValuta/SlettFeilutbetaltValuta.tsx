import { useErLesevisning } from '@hooks/useErLesevisning';
import { useSlettFeilutbetaltValuta } from '@hooks/useSlettFeilutbetaltValuta';

import { TrashIcon } from '@navikt/aksel-icons';
import { Button, Tooltip } from '@navikt/ds-react';
import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useFeilutbetaltValutaTabellContext } from './FeilutbetaltValutaTabellContext';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface Props {
    feilutbetaltValutaId: number;
}

export function SlettFeilutbetaltValuta({ feilutbetaltValutaId }: Props) {
    const { behandling, settÅpenBehandling } = useBehandlingContext();
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

    const erLesevisning = useErLesevisning();

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
