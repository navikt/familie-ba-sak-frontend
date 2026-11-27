import { BrevmottakereBehandlingProvider } from '@sider/Fagsak/Behandling/BrevmottakereBehandlingContext';
import { renderHook } from '@testing-library/react';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { type BrevmottakerBehandling, Brevmottakertype } from '@typer/brevmottaker';
import type { PropsWithChildren } from 'react';
import { describe, expect, test } from 'vitest';
import { useHarBrevmottakerMedUtenlandskAdresse } from './useHarBrevmottakerMedUtenlandskAdresse';

interface WrapperProps extends PropsWithChildren {
    brevmottakere: BrevmottakerBehandling[];
}

function Wrapper({ brevmottakere, children }: WrapperProps) {
    return <BrevmottakereBehandlingProvider brevmottakere={brevmottakere}>{children}</BrevmottakereBehandlingProvider>;
}

describe('useHarBrevmottakerMedUtenlandskAdresse', () => {
    test('skal returnere false når det ikke finnes brevmottakere', () => {
        // Act
        const { result } = renderHook(() => useHarBrevmottakerMedUtenlandskAdresse(), {
            wrapper: ({ children }) => <Wrapper brevmottakere={[]}>{children}</Wrapper>,
        });

        // Assert
        expect(result.current).toBe(false);
    });

    test('skal returnere false når ingen brevmottakere er bruker med utenlandsk adresse', () => {
        // Arrange
        const brevmottakere = [lagBrevmottakerBehandling({ type: Brevmottakertype.VERGE })];

        // Act
        const { result } = renderHook(() => useHarBrevmottakerMedUtenlandskAdresse(), {
            wrapper: ({ children }) => <Wrapper brevmottakere={brevmottakere}>{children}</Wrapper>,
        });

        // Assert
        expect(result.current).toBe(false);
    });

    test('skal returnere true når bruker har utenlandsk adresse blant brevmottakere', () => {
        // Arrange
        const brevmottakere = [
            lagBrevmottakerBehandling({ type: Brevmottakertype.BRUKER_MED_UTENLANDSK_ADRESSE, landkode: 'SE' }),
        ];

        // Act
        const { result } = renderHook(() => useHarBrevmottakerMedUtenlandskAdresse(), {
            wrapper: ({ children }) => <Wrapper brevmottakere={brevmottakere}>{children}</Wrapper>,
        });

        // Assert
        expect(result.current).toBe(true);
    });
});
