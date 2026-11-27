import { apiClient } from '@api/client/apiClient';
import { lagSamhandler } from '@testutils/testdata/samhandlerTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { hentSamhandler } from './hentSamhandler';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const samhandler = lagSamhandler();

describe('hentSamhandler', () => {
    test('skal hente samhandler på orgnr og returnere den', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockResolvedValueOnce(samhandler);

        // Act
        const svar = await hentSamhandler(samhandler.orgNummer);

        // Assert
        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/samhandler/orgnr/${samhandler.orgNummer}`,
        });
        expect(svar).toEqual(samhandler);
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        // Arrange
        const feil = new Error('Kunne ikke hente samhandler');
        vi.mocked(apiClient.get).mockRejectedValueOnce(feil);

        // Act & assert
        await expect(hentSamhandler(samhandler.orgNummer)).rejects.toBe(feil);
    });
});
