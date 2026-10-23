import { apiClient } from '@api/client/apiClient';
import { registrerInstitusjon } from '@api/registrerInstitusjon';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import type { IRegistrerInstitusjon } from '@typer/institusjon';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandling = lagBehandling();

const payload: IRegistrerInstitusjon = {
    orgNummer: '889640782',
    tssEksternId: '80000123456',
};

describe('registrerInstitusjon', () => {
    test('skal sende forespørsel med institusjon', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        // Act
        const svar = await registrerInstitusjon({ behandlingId: behandling.behandlingId }, payload);

        // Assert
        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/behandlinger/${behandling.behandlingId}/steg/registrer-institusjon`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & Assert
        await expect(registrerInstitusjon({ behandlingId: behandling.behandlingId }, payload)).rejects.toThrow(
            'Noe gikk galt'
        );
    });
});
