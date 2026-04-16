import React, { useState } from 'react';

import { useMutationState } from '@tanstack/react-query';

import { LocalAlert } from '@navikt/ds-react';

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
        fom: refusjonEøs.fom,
        tom: refusjonEøs.tom,
    });

    return (
        <LocalAlert status="error" size={'small'}>
            <LocalAlert.Header>
                <LocalAlert.Title>En teknisk feil oppstod ved sletting av perioden {dato}</LocalAlert.Title>
                <LocalAlert.CloseButton onClick={() => settVisAlert(false)} />
            </LocalAlert.Header>
            <LocalAlert.Content>{state.error?.message ?? 'En ukjent feil oppstod.'}</LocalAlert.Content>
        </LocalAlert>
    );
}
