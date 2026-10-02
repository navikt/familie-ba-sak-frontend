import { hentEndringstidspunkt } from '@api/hentEndringstidspunkt';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { HentEndringstidspunktQueryKeyFactory, useHentEndringstidspunkt } from './useHentEndringstidspunkt';

vi.mock('@api/hentEndringstidspunkt');

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentEndringstidspunkt', () => {
    test('henter endringstidspunktet for behandlingId', async () => {
        const endringstidspunkt = '2025-01-01';
        vi.mocked(hentEndringstidspunkt).mockResolvedValue(endringstidspunkt);

        const { result } = renderHook(() => useHentEndringstidspunkt(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentEndringstidspunkt).toHaveBeenCalledWith(123);
        expect(result.current.data).toBe(endringstidspunkt);
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(hentEndringstidspunkt).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentEndringstidspunkt(123), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });

    test('lager query key med behandlingId', () => {
        expect(HentEndringstidspunktQueryKeyFactory.endringstidspunkt(123)).toEqual(['endringstidspunkt', 123]);
    });
});
