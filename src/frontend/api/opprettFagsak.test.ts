import { apiClient } from '@api/client/apiClient';
import { type OpprettFagsakPayload, opprettFagsak } from '@api/opprettFagsak';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { FagsakType } from '@typer/fagsak';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload: OpprettFagsakPayload = {
    personIdent: '12345678910',
    fagsakType: FagsakType.NORMAL,
    institusjon: null,
    skjermetBarnSøker: null,
};

describe('opprettFagsak', () => {
    test('skal sende forespørsel om opprettelse av fagsak', async () => {
        // Arrange
        const fagsak = lagFagsak();
        vi.mocked(apiClient.post).mockResolvedValueOnce(fagsak);

        // Act
        const svar = await opprettFagsak(payload);

        // Assert
        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/fagsaker',
            data: payload,
        });
        expect(svar).toEqual(fagsak);
    });

    test('skal håndtere feil', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        // Act & assert
        await expect(opprettFagsak(payload)).rejects.toThrow('Noe gikk galt');
    });
});
