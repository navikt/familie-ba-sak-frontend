import { useMutationState } from '@tanstack/react-query';

import { Alert } from '@navikt/ds-react';

import { lagMutationKey } from '../../../../../../hooks/useSlettRefusjonEøs';
import type { IRestRefusjonEøs } from '../../../../../../typer/refusjon-eøs';
import { isoDatoPeriodeTilFormatertString } from '../../../../../../utils/dato';

interface Props {
    refusjonEøs: IRestRefusjonEøs;
}

export function SlettRefusjonEøsError({ refusjonEøs }: Props) {
    const states = useMutationState({
        filters: { mutationKey: lagMutationKey(refusjonEøs.id) },
    });

    const state = states[states.length - 1];

    if (!state || !state.error) {
        return null;
    }

    const dato = isoDatoPeriodeTilFormatertString({
        fom: refusjonEøs.fom,
        tom: refusjonEøs.tom,
    });

    return (
        <Alert variant={'error'} size={'small'}>
            En teknisk feil oppstod ved sletting av perioden {dato}: {state.error?.message ?? 'En ukjent feil oppstod.'}
        </Alert>
    );
}
