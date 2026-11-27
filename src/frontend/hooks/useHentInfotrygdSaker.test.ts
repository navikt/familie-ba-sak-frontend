import { hentInfotrygdSaker } from '@api/hentInfotrygdSaker';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import type { IInfotrygdsaker } from '@typer/infotrygd';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useHentInfotrygdSaker } from './useHentInfotrygdSaker';

vi.mock('@api/hentInfotrygdSaker');

afterEach(() => {
    vi.clearAllMocks();
});

const infotrygdsaker: IInfotrygdsaker = {
    harTilgang: true,
    saker: [{ saksnr: '01', saksblokk: 'A' }],
};

describe('useHentInfotrygdSaker', () => {
    test('skal hente infotrygdsaker for ident', async () => {
        // Arrange
        vi.mocked(hentInfotrygdSaker).mockResolvedValueOnce(infotrygdsaker);

        // Act
        const { result } = renderHook(() => useHentInfotrygdSaker('12345678903'), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentInfotrygdSaker).toHaveBeenCalledTimes(1);
        expect(hentInfotrygdSaker).toHaveBeenCalledWith('12345678903');
        expect(result.current.data).toEqual(infotrygdsaker);
    });

    test('skal hente på nytt når ident endres', async () => {
        // Arrange
        const andreInfotrygdsaker: IInfotrygdsaker = { harTilgang: true, saker: [] };
        vi.mocked(hentInfotrygdSaker).mockResolvedValueOnce(infotrygdsaker).mockResolvedValueOnce(andreInfotrygdsaker);

        let ident = '12345678903';

        const { result, rerender } = renderHook(() => useHentInfotrygdSaker(ident), {
            wrapper: TestProviders,
        });

        await waitFor(() => expect(result.current.data).toEqual(infotrygdsaker));

        ident = '98765432100';

        // Act
        rerender();

        // Assert
        await waitFor(() => expect(result.current.data).toEqual(andreInfotrygdsaker));
        expect(hentInfotrygdSaker).toHaveBeenCalledTimes(2);
        expect(hentInfotrygdSaker).toHaveBeenLastCalledWith('98765432100');
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        // Arrange
        const feil = new Error('Kunne ikke hente infotrygdsaker');
        vi.mocked(hentInfotrygdSaker).mockRejectedValueOnce(feil);

        // Act
        const { result } = renderHook(() => useHentInfotrygdSaker('12345678903'), {
            wrapper: TestProviders,
        });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error).toBe(feil);
    });
});
