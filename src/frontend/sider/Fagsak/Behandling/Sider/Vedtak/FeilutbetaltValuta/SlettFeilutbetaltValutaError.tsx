import { useState } from 'react';

import { useMutationState } from '@tanstack/react-query';

import { Alert } from '@navikt/ds-react';

import { lagMutationKey } from '../../../../../../hooks/useSlettFeilutbetaltValuta';
import type { IRestFeilutbetaltValuta } from '../../../../../../typer/eøs-feilutbetalt-valuta';
import { isoDatoPeriodeTilFormatertString } from '../../../../../../utils/dato';

interface Props {
    feilutbetaltValuta: IRestFeilutbetaltValuta;
}

export function SlettFeilutbetaltValutaError({ feilutbetaltValuta }: Props) {
    const states = useMutationState({
        filters: { mutationKey: lagMutationKey(feilutbetaltValuta.id) },
    });

    const state = states[states.length - 1];

    const [forrigeErrorState, settForrigeErrorState] = useState(state);
    const [visAlert, settVisAlert] = useState(state !== forrigeErrorState);

    if (!state || !state.error) {
        return null;
    }

    if (state !== forrigeErrorState) {
        settForrigeErrorState(state);
        settVisAlert(true);
    }

    if (!visAlert) {
        return null;
    }

    const dato = isoDatoPeriodeTilFormatertString({
        fom: feilutbetaltValuta.fom,
        tom: feilutbetaltValuta.tom,
    });

    return (
        <Alert variant={'error'} size={'small'} closeButton={true} onClose={() => settVisAlert(false)}>
            En teknisk feil oppstod ved sletting av perioden {dato}: {state.error?.message ?? 'En ukjent feil oppstod.'}
        </Alert>
    );
}
