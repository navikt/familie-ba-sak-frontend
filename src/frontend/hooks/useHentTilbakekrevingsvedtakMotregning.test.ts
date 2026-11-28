import { hentTilbakekrevingsvedtakMotregning } from '@api/hentTilbakekrevingsvedtakMotregning';
import { renderHook, waitFor } from '@testing-library/react';
import { lagTilbakekrevingsvedtakMotregning } from '@testutils/testdata/tilbakekrevingsvedtakMotregningTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentTilbakekrevingsvedtakMotregning } from './useHentTilbakekrevingsvedtakMotregning';

vi.mock('@api/hentTilbakekrevingsvedtakMotregning');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentTilbakekrevingsvedtakMotregning', () => {
    test('henter tilbakekrevingsvedtak motregning for behandlingen', async () => {
        const tilbakekrevingsvedtakMotregning = lagTilbakekrevingsvedtakMotregning();
        vi.mocked(hentTilbakekrevingsvedtakMotregning).mockResolvedValue(tilbakekrevingsvedtakMotregning);

        const { result } = renderHook(() => useHentTilbakekrevingsvedtakMotregning(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentTilbakekrevingsvedtakMotregning).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(tilbakekrevingsvedtakMotregning);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentTilbakekrevingsvedtakMotregning).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentTilbakekrevingsvedtakMotregning(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
