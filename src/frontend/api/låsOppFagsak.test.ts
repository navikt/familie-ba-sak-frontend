import { apiClient } from '@api/client/apiClient';
import { låsOppFagsak } from '@api/låsOppFagsak';
import { lagFagsak } from '@testutils/testdata/fagsakTestdata';
import { FagsakId } from '@typer/fagsak';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        patch: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('låsOppFagsak', () => {
    test('skal sende forespørsel om å låse opp fagsak', async () => {
        const payload = { begrunnelse: 'En begrunnelse' };
        const fagsak = lagFagsak();
        vi.mocked(apiClient.patch).mockResolvedValueOnce(fagsak);

        const svar = await låsOppFagsak(FagsakId.fra(123), payload);

        expect(apiClient.patch).toHaveBeenCalledTimes(1);
        expect(apiClient.patch).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/fagsaker/123/laas-opp',
            data: payload,
        });
        expect(svar).toEqual(fagsak);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.patch).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(låsOppFagsak(FagsakId.fra(123), { begrunnelse: 'En begrunnelse' })).rejects.toThrow(
            'Noe gikk galt'
        );
    });
});
