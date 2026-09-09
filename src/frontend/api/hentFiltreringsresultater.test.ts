import { apiClient } from '@api/client/apiClient';
import { hentFiltreringsresultater } from '@api/hentFiltreringsresultater';
import { Filtreringsregel, type IFødselshendelsefiltreringResultat } from '@typer/fødselshendelser';
import { Resultat } from '@typer/vilkår';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@api/client/apiClient', () => ({
    apiClient: {
        get: vi.fn(),
    },
}));

afterEach(() => {
    vi.clearAllMocks();
});

const behandlingId = 1;

const filtreringsresultater: IFødselshendelsefiltreringResultat[] = [
    {
        filtreringsregel: Filtreringsregel.MOR_LEVER,
        resultat: Resultat.OPPFYLT,
        begrunnelse: 'Mor lever',
    },
];

describe('hentFiltreringsresultater', () => {
    test('skal hente filtreringsresultater for behandlingen', async () => {
        vi.mocked(apiClient.get).mockResolvedValueOnce(filtreringsresultater);

        const svar = await hentFiltreringsresultater(behandlingId);

        expect(apiClient.get).toHaveBeenCalledTimes(1);
        expect(apiClient.get).toHaveBeenCalledWith({
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/filtreringsresultater`,
        });
        expect(svar).toEqual(filtreringsresultater);
    });

    test('skal håndtere feil', async () => {
        vi.mocked(apiClient.get).mockRejectedValue(new Error('Noe gikk galt'));

        await expect(hentFiltreringsresultater(behandlingId)).rejects.toThrow('Noe gikk galt');
    });
});
