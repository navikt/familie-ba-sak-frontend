import { apiClient } from '@api/client/apiClient';
import { hentBrevmottakere } from '@api/hentBrevmottakere';
import { lagBrevmottakerBehandling } from '@testutils/testdata/brevmottakerTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandlingId = 123;
const brevmottakere = [lagBrevmottakerBehandling()];

describe('hentBrevmottakere', () => {
    test('skal hente brevmottakere for behandlingen', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockResolvedValueOnce(brevmottakere);

        // Act
        const svar = await hentBrevmottakere(behandlingId);

        // Assert
        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/brevmottaker/${behandlingId}`,
        });
        expect(svar).toEqual(brevmottakere);
    });

    test('skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Noe gikk galt'));

        // Act & assert
        await expect(hentBrevmottakere(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
