import { apiClient } from '@api/client/apiClient';
import type { IInfotrygdsaker } from '@typer/infotrygd';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentInfotrygdSaker } from './hentInfotrygdSaker';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const infotrygdsaker: IInfotrygdsaker = {
    harTilgang: true,
    saker: [{ saksnr: '01', saksblokk: 'A' }],
};

describe('hentInfotrygdSaker', () => {
    test('skal hente infotrygdsaker for ident og returnere dem', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockResolvedValueOnce(infotrygdsaker);

        // Act
        const svar = await hentInfotrygdSaker('12345678903');

        // Assert
        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/infotrygd/hent-infotrygdsaker-for-soker',
            data: { ident: '12345678903' },
        });
        expect(svar).toEqual(infotrygdsaker);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        // Arrange
        const feil = new Error('Kunne ikke hente infotrygdsaker');
        vi.mocked(apiClient.post).mockRejectedValueOnce(feil);

        // Act & assert
        await expect(hentInfotrygdSaker('12345678903')).rejects.toBe(feil);
    });
});
