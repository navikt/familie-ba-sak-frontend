import { tømPersonopplysningerCacheITestmiljø } from '@api/tømPersonopplysningerCacheITestmiljø';
import axios from 'axios';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('axios');

afterEach(() => {
    vi.clearAllMocks();
});

describe('tømPersonopplysningerCacheITestmiljø', () => {
    test('skal sende POST-forespørsel til preprod-endepunktet og returnere svaret', async () => {
        vi.mocked(axios.post).mockResolvedValueOnce({ data: 'Personopplysninger-cache er tømt' });

        const svar = await tømPersonopplysningerCacheITestmiljø();

        expect(axios.post).toHaveBeenCalledTimes(1);
        expect(axios.post).toHaveBeenCalledWith('/familie-ba-sak/api/preprod/clear-personopplysninger-cache');
        expect(svar).toEqual('Personopplysninger-cache er tømt');
    });

    test('skal kaste videre feilen dersom kallet feiler', async () => {
        vi.mocked(axios.post).mockRejectedValueOnce(new Error('Noe gikk galt'));

        await expect(tømPersonopplysningerCacheITestmiljø()).rejects.toThrow('Noe gikk galt');
    });
});
