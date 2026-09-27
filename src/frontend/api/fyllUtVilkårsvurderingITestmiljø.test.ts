import { apiClient } from '@api/client/apiClient';
import { fyllUtVilkårsvurderingITestmiljø } from '@api/fyllUtVilkårsvurderingITestmiljø';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        put: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

describe('fyllUtVilkårsvurderingITestmiljø', () => {
    test('skal sende PUT-forespørsel til preprod-endepunktet for behandlingen', async () => {
        vi.mocked(apiClient.put).mockResolvedValueOnce('OK');

        const svar = await fyllUtVilkårsvurderingITestmiljø(123);

        expect(apiClient.put).toHaveBeenCalledTimes(1);

        expect(apiClient.put).toHaveBeenCalledWith({
            url: '/familie-ba-sak/api/preprod/123/fyll-ut-vilkarsvurdering',
        });
        expect(svar).toEqual('OK');
    });
});
