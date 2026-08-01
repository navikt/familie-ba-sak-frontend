import type { PropsWithChildren } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { DeployetBranch } from './DeployetBranch';

const { erPreprodMock, hentFrontendVersjonsinfoMock, hentBackendVersjonsinfoMock } = vi.hoisted(() => ({
    erPreprodMock: vi.fn(),
    hentFrontendVersjonsinfoMock: vi.fn(),
    hentBackendVersjonsinfoMock: vi.fn(),
}));

vi.mock('@utils/miljø', () => ({ erPreprod: erPreprodMock }));

vi.mock('@api/hentVersjonsinfo', () => ({
    hentFrontendVersjonsinfo: hentFrontendVersjonsinfoMock,
    hentBackendVersjonsinfo: hentBackendVersjonsinfoMock,
}));

const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe('DeployetBranch', () => {
    test('viser ingenting utenfor preprod', () => {
        // Arrange
        erPreprodMock.mockReturnValue(false);

        // Act
        const { container } = render(<DeployetBranch />, { wrapper });

        // Assert
        expect(container).toBeEmptyDOMElement();
        expect(hentFrontendVersjonsinfoMock).not.toHaveBeenCalled();
        expect(hentBackendVersjonsinfoMock).not.toHaveBeenCalled();
    });

    test('viser deployet branch for frontend og backend i preprod', async () => {
        // Arrange
        erPreprodMock.mockReturnValue(true);
        hentFrontendVersjonsinfoMock.mockResolvedValue({ branch: 'min-frontend-branch', versjon: 'fe:1' });
        hentBackendVersjonsinfoMock.mockResolvedValue({ branch: 'min-backend-branch', versjon: 'be:1' });

        // Act
        render(<DeployetBranch />, { wrapper });

        // Assert
        expect(await screen.findByText('Frontend: min-frontend-branch')).toBeInTheDocument();
        expect(await screen.findByText('Backend: min-backend-branch')).toBeInTheDocument();
    });
});
