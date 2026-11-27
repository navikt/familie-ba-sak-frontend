import { renderHook } from '@testing-library/react';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { type BrevmottakerBehandling, Brevmottakertype } from '@typer/brevmottaker';
import type { PropsWithChildren } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { BrevmottakereBehandlingProvider, useBrevmottakereBehandling } from './BrevmottakereBehandlingContext';

interface WrapperProps extends PropsWithChildren {
    brevmottakere: BrevmottakerBehandling[];
}

function Wrapper({ brevmottakere, children }: WrapperProps) {
    return <BrevmottakereBehandlingProvider brevmottakere={brevmottakere}>{children}</BrevmottakereBehandlingProvider>;
}

describe('BrevmottakereBehandlingContext', () => {
    test('skal returnere brevmottakerne fra provideren', () => {
        // Arrange
        const brevmottakere = [
            lagBrevmottakerBehandling({ id: 1, type: Brevmottakertype.FULLMEKTIG }),
            lagBrevmottakerBehandling({ id: 2, type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, landkode: 'SE' }),
        ];

        // Act
        const { result } = renderHook(() => useBrevmottakereBehandling(), {
            wrapper: ({ children }) => <Wrapper brevmottakere={brevmottakere}>{children}</Wrapper>,
        });

        // Assert
        expect(result.current).toBe(brevmottakere);
    });

    test('skal kaste feil når hooken brukes utenfor BrevmottakereBehandlingProvider', () => {
        // Arrange
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Act & assert
        expect(() => renderHook(() => useBrevmottakereBehandling())).toThrow(
            'useBrevmottakereBehandling må brukes innenfor en BrevmottakereBehandlingProvider'
        );

        // Cleanup
        consoleSpy.mockRestore();
    });
});
