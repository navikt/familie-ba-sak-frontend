import { act, renderHook } from '@testing-library/react';
import { lagBrevmottakerFagsak } from '@testutils/testdata/brevmottakerTestdata';
import type { PropsWithChildren } from 'react';
import { BrevmottakereFagsakProvider, useBrevmottakereFagsakContext } from './BrevmottakereFagsakContext';

function Provider({ children }: PropsWithChildren) {
    return <BrevmottakereFagsakProvider>{children}</BrevmottakereFagsakProvider>;
}

describe('BrevmottakereFagsakContext', () => {
    test('skal kaste feil om context hooken brukes uten en provider', () => {
        expect(() => {
            renderHook(() => useBrevmottakereFagsakContext());
        }).toThrow('useBrevmottakereFagsakContext må brukes innenfor en BrevmottakereFagsakProvider');
    });

    test('skal ha en tom liste med brevmottakere om ingen er satt manuelt', () => {
        const { result } = renderHook(() => useBrevmottakereFagsakContext(), {
            wrapper: Provider,
        });

        expect(result.current.brevmottakere).toHaveLength(0);
    });

    test('skal kunne legge til og slette brevmottakere på fagsak', () => {
        const brevmottaker = lagBrevmottakerFagsak();
        const { result } = renderHook(() => useBrevmottakereFagsakContext(), {
            wrapper: Provider,
        });

        act(() => result.current.leggTilBrevmottaker(brevmottaker));
        expect(result.current.brevmottakere).toEqual([brevmottaker]);

        act(() => result.current.slettBrevmottaker({ ...brevmottaker }));
        expect(result.current.brevmottakere).toEqual([]);
    });

    test('skal kunne slette alle brevmottakere på fagsak', () => {
        const { result } = renderHook(() => useBrevmottakereFagsakContext(), {
            wrapper: Provider,
        });

        act(() => result.current.leggTilBrevmottaker(lagBrevmottakerFagsak()));
        act(() => result.current.leggTilBrevmottaker(lagBrevmottakerFagsak()));
        expect(result.current.brevmottakere).toHaveLength(2);

        act(() => result.current.slettAlleBrevmottakere());
        expect(result.current.brevmottakere).toEqual([]);
    });
});
