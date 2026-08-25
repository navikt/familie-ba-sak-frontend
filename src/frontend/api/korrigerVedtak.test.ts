import { apiClient } from '@api/client/apiClient';
import { korrigerVedtak, type KorrigerVedtakPayload } from '@api/korrigerVedtak';
import { lagBehandling } from '@testutils/testdata/behandlingTestdata';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        post: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const payload: KorrigerVedtakPayload = {
    vedtaksdato: '2024-01-01',
    begrunnelse: 'Begrunnelse for korrigering',
};

const behandling = lagBehandling();
const behandlingId = behandling.behandlingId;

describe('korrigerVedtak', () => {
    test('skal sende forespørsel om å korrigere vedtak', async () => {
        vi.mocked(apiClient.post).mockResolvedValueOnce(behandling);

        const svar = await korrigerVedtak(payload, behandlingId);

        expect(apiClient.post).toHaveBeenCalledTimes(1);
        expect(apiClient.post).toHaveBeenCalledWith({
            data: payload,
            url: `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`,
        });
        expect(svar).toEqual(behandling);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.post).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(korrigerVedtak(payload, behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
