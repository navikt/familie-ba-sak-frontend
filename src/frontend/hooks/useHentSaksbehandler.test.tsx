import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import { useHentSaksbehandler } from './useHentSaksbehandler';
import { hentSaksbehandler } from '../api/hentSaksbehandler';
import { lagSaksbehandler } from '../testutils/testdata/saksbehandlerTestdata';

vi.mock('../api/hentSaksbehandler', () => ({
    hentSaksbehandler: vi.fn(),
}));

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

describe('useHentSaksbehandler', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('skal hente saksbehandler', async () => {
        // Arrange
        const saksbehandler = lagSaksbehandler();
        vi.mocked(hentSaksbehandler).mockResolvedValueOnce(saksbehandler);

        const queryClient = createTestQueryClient();
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );

        // Act
        const { result } = renderHook(() => useHentSaksbehandler(), { wrapper });

        // Assert
        expect(result.current.isPending).toBe(true);
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(result.current.data).toBe(saksbehandler);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe(null);
        expect(hentSaksbehandler).toHaveBeenCalledTimes(1);
    });

    it('skal håndtere feil ved API-kallet', async () => {
        // Arrange
        const networkError = new Error('Nettverksfeil');
        vi.mocked(hentSaksbehandler).mockRejectedValueOnce(networkError);

        const queryClient = createTestQueryClient();
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );

        // Suppress console.error for clean test output (React Query logs errors to console)
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

        // Act
        const { result } = renderHook(() => useHentSaksbehandler(), { wrapper });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.data).toBe(undefined);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe(networkError);

        // Cleanup
        consoleSpy.mockRestore();
    });

    it('skal kunne sette initialData', () => {
        // Arrange
        const saksbehandler = lagSaksbehandler();
        const queryClient = createTestQueryClient();
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        );

        // Act
        const { result } = renderHook(() => useHentSaksbehandler({ initialData: saksbehandler }), { wrapper });

        // Assert
        expect(result.current.data).toBe(saksbehandler);
        expect(result.current.isPending).toBe(false);
        expect(result.current.error).toBe(null);
    });
});
