import { opprettManueltBrevPdf } from '@api/opprettManueltBrevPdf';
import { Brevmal } from '@sider/Fagsak/Behandling/Høyremeny/Brev/typer';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import type { IManueltBrevRequestPåBehandling } from '@typer/dokument';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useOpprettManueltBrevPdf } from './useOpprettManueltBrevPdf';

vi.mock('@api/opprettManueltBrevPdf');
vi.mock('@utils/blob', () => ({
    opprettPdfBlob: vi.fn().mockReturnValue(new Blob(['pdf'], { type: 'application/pdf' })),
}));

window.URL.createObjectURL = vi.fn().mockReturnValue('blob:mock-url');
window.URL.revokeObjectURL = vi.fn();

afterEach(() => {
    vi.clearAllMocks();
});

const payload: IManueltBrevRequestPåBehandling = {
    multiselectVerdier: [],
    brevmal: Brevmal.HENLEGGE_TRUKKET_SØKNAD,
    barnIBrev: [],
};

describe('useOpprettManueltBrevPdf', () => {
    test('returnerer object URL ved vellykket forhåndsvisning', async () => {
        vi.mocked(opprettManueltBrevPdf).mockResolvedValue('base64-pdf-innhold');

        const { result } = renderHook(() => useOpprettManueltBrevPdf(), {
            wrapper: TestProviders,
        });

        result.current.mutate({ behandlingId: 1, payload });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettManueltBrevPdf).toHaveBeenCalledWith({ behandlingId: 1 }, payload);
        expect(result.current.data).toBe('blob:mock-url');
    });

    test('kaller onSuccess-callback med object URL', async () => {
        vi.mocked(opprettManueltBrevPdf).mockResolvedValue('base64-pdf-innhold');
        const onSuccess = vi.fn();

        const { result } = renderHook(() => useOpprettManueltBrevPdf({ onSuccess }), {
            wrapper: TestProviders,
        });

        result.current.mutate({ behandlingId: 1, payload });

        await waitFor(() =>
            expect(onSuccess).toHaveBeenCalledWith(
                'blob:mock-url',
                { behandlingId: 1, payload },
                undefined,
                expect.any(Object)
            )
        );
    });

    test('setter isError ved feil fra api-funksjon', async () => {
        vi.mocked(opprettManueltBrevPdf).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOpprettManueltBrevPdf(), {
            wrapper: TestProviders,
        });

        result.current.mutate({ behandlingId: 1, payload });

        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
    });
});
