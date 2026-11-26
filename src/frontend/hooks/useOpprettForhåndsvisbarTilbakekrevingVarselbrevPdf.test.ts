import { opprettForhåndsvisbarTilbakekrevingVarselbrev } from '@api/opprettForhåndsvisbarTilbakekrevingVarselbrev';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { opprettPdfBlob } from '@utils/blob';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf } from './useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf';

vi.mock('@api/opprettForhåndsvisbarTilbakekrevingVarselbrev');
vi.mock('@utils/blob');

const bytes = 'JVBERi0xLjQK'; // base64-encodet "%PDF-1.4"
const blob = new Blob([bytes], { type: 'application/pdf' });
const parametere = { behandlingId: 123, payload: { fritekst: 'Fritekst' } };

afterEach(() => {
    vi.clearAllMocks();
});

describe('useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf', () => {
    test('kaller api med behandlingId og payload, og returnerer en pdf-blob', async () => {
        // Arrange
        vi.mocked(opprettForhåndsvisbarTilbakekrevingVarselbrev).mockResolvedValue(bytes);
        vi.mocked(opprettPdfBlob).mockReturnValue(blob);

        const { result } = renderHook(() => useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parametere);

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettForhåndsvisbarTilbakekrevingVarselbrev).toHaveBeenCalledWith(123, { fritekst: 'Fritekst' });
        expect(opprettPdfBlob).toHaveBeenCalledWith(bytes);
        expect(result.current.data).toBe(blob);
    });

    test('kaller onSuccess-callback med blob ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(opprettForhåndsvisbarTilbakekrevingVarselbrev).mockResolvedValue(bytes);
        vi.mocked(opprettPdfBlob).mockReturnValue(blob);

        const { result } = renderHook(() => useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parametere);

        // Assert
        await waitFor(() => expect(onSuccess).toHaveBeenCalledWith(blob, parametere, undefined, expect.any(Object)));
    });

    test('Skal håndtere feil fra api-kallet', async () => {
        // Arrange
        vi.mocked(opprettForhåndsvisbarTilbakekrevingVarselbrev).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parametere);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
        expect(opprettPdfBlob).not.toHaveBeenCalled();
    });

    test('Skal håndtere feil ved oppretting av pdf-blob', async () => {
        // Arrange
        vi.mocked(opprettForhåndsvisbarTilbakekrevingVarselbrev).mockResolvedValue(bytes);
        vi.mocked(opprettPdfBlob).mockImplementation(() => {
            throw new Error('Ugyldig pdf');
        });

        const { result } = renderHook(() => useOpprettForhåndsvisbarTilbakekrevingVarselbrevPdf(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate(parametere);

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Ugyldig pdf');
    });
});
