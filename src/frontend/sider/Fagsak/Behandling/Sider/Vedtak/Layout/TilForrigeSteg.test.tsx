import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { TilForrigeSteg } from './TilForrigeSteg';

const { useBehandlingIdMock, useFagsakIdMock, useNavigateMock } = vi.hoisted(() => ({
    useBehandlingIdMock: vi.fn(),
    useFagsakIdMock: vi.fn(),
    useNavigateMock: vi.fn(),
}));

vi.mock('@hooks/useBehandlingId', () => ({ useBehandlingId: useBehandlingIdMock }));
vi.mock('@hooks/useFagsakId', () => ({ useFagsakId: useFagsakIdMock }));
vi.mock('react-router', () => ({ useNavigate: () => useNavigateMock }));

beforeEach(() => {
    vi.clearAllMocks();
    useFagsakIdMock.mockReturnValue('123');
    useBehandlingIdMock.mockReturnValue(456);
});

describe('TilForrigeSteg', () => {
    test('skal rendre knapp med tekst "Forrige steg"', () => {
        // Act
        render(<TilForrigeSteg />);

        // Assert
        expect(screen.getByRole('button', { name: 'Forrige steg' })).toBeInTheDocument();
    });

    test('skal navigere til simulering-siden for fagsak og behandling når knappen klikkes', async () => {
        // Arrange
        render(<TilForrigeSteg />);

        // Act
        await userEvent.click(screen.getByRole('button', { name: 'Forrige steg' }));

        // Assert
        expect(useNavigateMock).toHaveBeenCalledWith('/fagsak/123/456/simulering');
    });
});
