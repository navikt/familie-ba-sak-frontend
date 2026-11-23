import { korrigerEtterbetaling } from '@api/korrigerEtterbetaling';
import { useKorrigerEtterbetaling } from '@hooks/useKorrigerEtterbetaling';
import { renderHook, waitFor } from '@testing-library/react';
import { lagKorrigertEtterbetaling } from '@testutils/testdata/korrigertEtterbetalingTestdata';
import { TestProviders } from '@testutils/testrender';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/korrigerEtterbetaling');

afterEach(() => {
    vi.clearAllMocks();
});

const behandlingId = 1;
const korrigertEtterbetaling = lagKorrigertEtterbetaling();

const payload = {
    årsak: 'FEIL_TIDLIGERE_UTBETALT_BELØP',
    beløp: 1000,
    begrunnelse: 'En begrunnelse',
};

const parameters = { ...payload, behandlingId };

describe('useKorrigerEtterbetaling', () => {
    test('kaller korrigerEtterbetaling med riktig payload', async () => {
        // Arrange
        vi.mocked(korrigerEtterbetaling).mockResolvedValue(korrigertEtterbetaling);

        const { result } = renderHook(() => useKorrigerEtterbetaling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(korrigerEtterbetaling).toHaveBeenCalledWith(payload, behandlingId);
        expect(result.current.data).toEqual(korrigertEtterbetaling);
    });

    test('skal kalle onSuccess-callback ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(korrigerEtterbetaling).mockResolvedValue(korrigertEtterbetaling);

        const { result } = renderHook(() => useKorrigerEtterbetaling({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(onSuccess).toHaveBeenCalledWith(korrigertEtterbetaling, parameters, undefined, expect.any(Object));
    });

    test('skal sette isError dersom korrigerEtterbetaling feiler', async () => {
        // Arrange
        vi.mocked(korrigerEtterbetaling).mockRejectedValueOnce(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useKorrigerEtterbetaling(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parameters);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
