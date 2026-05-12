import type { UseQueryResult } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { SaksbehandlerProvider, useSaksbehandlerContext } from './SaksbehandlerContext';
import { useHentSaksbehandler } from '../hooks/useHentSaksbehandler';
import { lagSaksbehandler } from '../testutils/testdata/saksbehandlerTestdata';
import type { Saksbehandler } from '../typer/saksbehandler';

vi.mock('../hooks/useHentSaksbehandler', () => ({
    useHentSaksbehandler: vi.fn(),
}));

function TestConsumer() {
    const { saksbehandler } = useSaksbehandlerContext();
    return <div>Logget inn som: {saksbehandler.displayName}</div>;
}

describe('SaksbehandlerContext', () => {
    beforeEach(() => {
        vi.mocked(useHentSaksbehandler).mockReset();
    });

    it('skal vise systemet laster ved innlasting', () => {
        // Arrange
        const resultat = {
            data: undefined,
            isPending: true,
            error: null,
        } as UseQueryResult<Saksbehandler, Error>;

        vi.mocked(useHentSaksbehandler).mockReturnValue(resultat);

        // Act
        render(
            <SaksbehandlerProvider>
                <div>Should not be visible yet</div>
            </SaksbehandlerProvider>
        );

        // Assert
        expect(screen.queryByText('Should not be visible yet')).not.toBeInTheDocument();
        expect(screen.queryByText('Systemet laster')).toBeInTheDocument();
    });

    it('skal vise feilmelding hvis feil oppstår ved API-kallet', () => {
        // Arrange
        const resultat = {
            data: undefined,
            isPending: false,
            error: new Error('Nettverksfeil'),
        } as UseQueryResult<Saksbehandler, Error>;

        vi.mocked(useHentSaksbehandler).mockReturnValue(resultat);

        // Act
        render(
            <SaksbehandlerProvider>
                <div>Burde være usynlig</div>
            </SaksbehandlerProvider>
        );

        // Assert
        expect(screen.getByText('Feil oppstod ved innlasting av saksbehandler')).toBeInTheDocument();
        expect(screen.getByText('Nettverksfeil')).toBeInTheDocument();
        expect(screen.queryByText('Burde være usynlig')).not.toBeInTheDocument();
    });

    it('skal eksponere saksbehandler til children', () => {
        // Arrange
        const resultat = {
            data: lagSaksbehandler(),
            isPending: false,
            error: null,
        } as UseQueryResult<Saksbehandler, Error>;

        vi.mocked(useHentSaksbehandler).mockReturnValue(resultat);

        // Act
        render(
            <SaksbehandlerProvider>
                <TestConsumer />
            </SaksbehandlerProvider>
        );

        // Assert
        expect(screen.getByText('Logget inn som: Sak Behandler')).toBeInTheDocument();
    });

    it('skal kaste feil hvis useSaksbehandlerContext brukes utenfor SaksbehandlerProvider', () => {
        // Arrange
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Act & assert
        expect(() => render(<TestConsumer />)).toThrow(
            'useSaksbehandlerContext må brukes innenfor en SaksbehandlerProvider'
        );

        // Cleanup
        consoleSpy.mockRestore();
    });
});
