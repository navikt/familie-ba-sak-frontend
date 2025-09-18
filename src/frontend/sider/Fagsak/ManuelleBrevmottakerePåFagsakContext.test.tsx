import React, { type PropsWithChildren } from 'react';

import { act, renderHook } from '@testing-library/react';

import {
    ManuelleBrevmottakerePåFagsakProvider,
    useManuelleBrevmottakerePåFagsakContext,
} from './ManuelleBrevmottakerePåFagsakContext';
import { lagBrevmottaker } from '../../testdata/brevmottakerTestdata';

function Provider({ children }: PropsWithChildren) {
    return (
        <ManuelleBrevmottakerePåFagsakProvider>{children}</ManuelleBrevmottakerePåFagsakProvider>
    );
}

describe('ManuelleBrevmottakerePåFagsakContext', () => {
    test('skal kaste feil om context hooken brukes uten en provider', () => {
        // Act & expect
        expect(() => {
            renderHook(() => useManuelleBrevmottakerePåFagsakContext());
        }).toThrow(
            'useManuelleBrevmottakerePåFagsakContext må brukes innenfor en ManuelleBrevmottakerePåFagsakProvider'
        );
    });

    test('skal ha en tom liste med brevmottakere om ingen er satt manuelt', () => {
        // Act
        const { result } = renderHook(() => useManuelleBrevmottakerePåFagsakContext(), {
            wrapper: Provider,
        });

        // Expect
        expect(result.current.manuelleBrevmottakerePåFagsak).toHaveLength(0);
    });

    test('skal kunne sette brevmottakere på fagsak', () => {
        // Arrange
        const brevmottakere = [lagBrevmottaker()];
        const { result } = renderHook(() => useManuelleBrevmottakerePåFagsakContext(), {
            wrapper: Provider,
        });

        // Act
        act(() => result.current.settManuelleBrevmottakerePåFagsak(brevmottakere));

        // Expect
        expect(result.current.manuelleBrevmottakerePåFagsak).toBe(brevmottakere);
    });
});
