import { forhåndsvisBrevPåFagsak } from '@api/forhåndsvisBrevPåFagsak';
import { Informasjonsbrev } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { Målform } from '@typer/søknad';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useForhåndsvisBrevPåFagsak } from './useForhåndsvisBrevPåFagsak';

vi.mock('@api/forhåndsvisBrevPåFagsak');
vi.mock('../utils/blob', () => ({
    opprettPdfBlob: vi.fn().mockReturnValue(new Blob(['pdf'], { type: 'application/pdf' })),
}));

window.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');
window.URL.revokeObjectURL = vi.fn();

afterEach(() => {
    vi.clearAllMocks();
});

const payload = {
    multiselectVerdier: [],
    barnIBrev: [],
    mottakerMålform: Målform.NB,
    brevmal: Informasjonsbrev.INFORMASJONSBREV_FØDSEL_GENERELL,
    manuelleBrevmottakere: [],
};

describe('useForhåndsvisBrevPåFagsak', () => {
    test('returnerer object URL ved vellykket forhåndsvisning', async () => {
        vi.mocked(forhåndsvisBrevPåFagsak).mockResolvedValue('base64-pdf-innhold');

        const { result } = renderHook(() => useForhåndsvisBrevPåFagsak(1), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(forhåndsvisBrevPåFagsak).toHaveBeenCalledWith(expect.any(Function), 1, payload);
        expect(result.current.data).toBe('blob:mock-url');
    });

    test('kaller onSuccess-callback med object URL', async () => {
        vi.mocked(forhåndsvisBrevPåFagsak).mockResolvedValue('base64-pdf-innhold');
        const onSuccess = vi.fn();

        const { result } = renderHook(() => useForhåndsvisBrevPåFagsak(1, { onSuccess }), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() =>
            expect(onSuccess).toHaveBeenCalledWith('blob:mock-url', payload, undefined, expect.any(Object))
        );
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(forhåndsvisBrevPåFagsak).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useForhåndsvisBrevPåFagsak(1), {
            wrapper: TestProviders,
        });

        result.current.mutate(payload);

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
