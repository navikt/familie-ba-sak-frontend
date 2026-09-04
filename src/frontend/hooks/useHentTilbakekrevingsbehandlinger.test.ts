import { hentTilbakekrevingsbehandlinger } from '@api/hentTilbakekrevingsbehandlinger';
import { renderHook, waitFor } from '@testing-library/react';
import { lagTilbakekrevingbehandling } from '@testutils/testdata/tilbakekrevingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { useHentTilbakekrevingsbehandlinger } from './useHentTilbakekrevingsbehandlinger';

vi.mock('@api/hentTilbakekrevingsbehandlinger');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentTilbakekrevingsbehandlinger', () => {
    test('kaller hentTilbakekrevingsbehandlinger med fagsakId', async () => {
        const tilbakekrevingsbehandlinger = [lagTilbakekrevingbehandling()];
        vi.mocked(hentTilbakekrevingsbehandlinger).mockResolvedValue(tilbakekrevingsbehandlinger);

        const { result } = renderHook(() => useHentTilbakekrevingsbehandlinger(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentTilbakekrevingsbehandlinger).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(tilbakekrevingsbehandlinger);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentTilbakekrevingsbehandlinger).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentTilbakekrevingsbehandlinger(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
