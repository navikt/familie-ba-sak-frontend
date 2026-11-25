import { genererAInntektUrl } from '@api/genererAInntektUrl';
import { useGenererAInntektUrl } from '@hooks/useGenererAInntektUrl';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/genererAInntektUrl');

afterEach(() => {
    vi.clearAllMocks();
});

const parameters = { ident: '12345678910' };
const url = 'https://a-inntekt.nav.no';

describe('useGenererAInntektUrl', () => {
    test('skal kalle genererAInntektUrl med ident og returnere generert URL', async () => {
        vi.mocked(genererAInntektUrl).mockResolvedValueOnce(url);

        const { result } = renderHook(() => useGenererAInntektUrl(), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(genererAInntektUrl).toHaveBeenCalledExactlyOnceWith(parameters);
        expect(result.current.data).toBe(url);
    });

    test('skal kalle onSuccess med generert URL ved vellykket mutasjon', async () => {
        const onSuccess = vi.fn();
        vi.mocked(genererAInntektUrl).mockResolvedValueOnce(url);

        const { result } = renderHook(() => useGenererAInntektUrl({ onSuccess }), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledExactlyOnceWith(url, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError og kalle onError dersom kallet feiler', async () => {
        const feil = new Error('Noe gikk galt');
        const onError = vi.fn();
        vi.mocked(genererAInntektUrl).mockRejectedValueOnce(feil);

        const { result } = renderHook(() => useGenererAInntektUrl({ onError }), {
            wrapper: TestProviders,
        });

        result.current.mutate(parameters);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBe(feil);
        expect(onError).toHaveBeenCalledExactlyOnceWith(feil, parameters, undefined, expect.any(Object));
    });
});
