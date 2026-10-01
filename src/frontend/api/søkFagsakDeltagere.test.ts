import { apiClient } from '@api/client/apiClient';
import { søkFagsakDeltagere } from '@api/søkFagsakDeltagere';
import { FagsakDeltagerRolle, type IFagsakDeltager } from '@typer/fagsakdeltager';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('søkFagsakDeltagere', () => {
    test('skal sende søk med personident til riktig URL', async () => {
        // Arrange
        const fagsakDeltagere: IFagsakDeltager[] = [
            { ident: '12345678903', rolle: FagsakDeltagerRolle.Forelder, harTilgang: true, erEgenAnsatt: false },
        ];
        vi.mocked(apiClient.post).mockResolvedValueOnce(fagsakDeltagere);

        // Act
        const svar = await søkFagsakDeltagere('12345678903');

        // Assert
        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/fagsaker/sok',
            data: { personIdent: '12345678903' },
        });
        expect(svar).toEqual(fagsakDeltagere);
    });

    test('skal kaste feil når kallet feiler', async () => {
        // Arrange
        vi.mocked(apiClient.post).mockRejectedValueOnce(new Error('Noe gikk galt'));

        // Act & Assert
        await expect(søkFagsakDeltagere('12345678903')).rejects.toThrow('Noe gikk galt');
    });
});
