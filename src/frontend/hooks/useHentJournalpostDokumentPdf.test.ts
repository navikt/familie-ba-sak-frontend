import { hentJournalpostDokumentPdf } from '@api/hentJournalpostDokumentPdf';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { opprettPdfBlob } from '@utils/blob';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { useHentJournalpostDokumentPdf } from './useHentJournalpostDokumentPdf';

vi.mock('@api/hentJournalpostDokumentPdf');
vi.mock('@utils/blob');

const bytes = 'JVBERi0xLjQK'; // base64-encodet "%PDF-1.4"
const blob = new Blob([bytes], { type: 'application/pdf' });
const objectUrl = 'blob:http://localhost/abc-123';

beforeEach(() => {
    // jsdom implementerer ikke createObjectURL, så den må stubbes
    window.URL.createObjectURL = vi.fn().mockReturnValue(objectUrl);
});

afterEach(() => {
    vi.clearAllMocks();
});

describe('useHentJournalpostDokumentPdf', () => {
    test('kaller hentJournalpostDokumentPdf med riktig journalpostId og dokumentId', async () => {
        // Arrange
        vi.mocked(hentJournalpostDokumentPdf).mockResolvedValue(bytes);
        vi.mocked(opprettPdfBlob).mockReturnValue(blob);

        const { result } = renderHook(() => useHentJournalpostDokumentPdf(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ journalpostId: '123', dokumentId: '456' });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(hentJournalpostDokumentPdf).toHaveBeenCalledWith('123', '456');
    });

    test('oppretter en pdf-blob av base64-strengen og returnerer en object-URL', async () => {
        // Arrange
        vi.mocked(hentJournalpostDokumentPdf).mockResolvedValue(bytes);
        vi.mocked(opprettPdfBlob).mockReturnValue(blob);

        const { result } = renderHook(() => useHentJournalpostDokumentPdf(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ journalpostId: '123', dokumentId: '456' });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettPdfBlob).toHaveBeenCalledWith(bytes);
        expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
        expect(result.current.data).toBe(objectUrl);
    });

    test('kaller onSuccess-callback med object-URL ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(hentJournalpostDokumentPdf).mockResolvedValue(bytes);
        vi.mocked(opprettPdfBlob).mockReturnValue(blob);

        const { result } = renderHook(() => useHentJournalpostDokumentPdf({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ journalpostId: '123', dokumentId: '456' });

        // Assert
        await waitFor(() =>
            expect(onSuccess).toHaveBeenCalledWith(
                objectUrl,
                { journalpostId: '123', dokumentId: '456' },
                undefined,
                expect.any(Object)
            )
        );
    });

    test('Skal håndtere feil fra api-kallet', async () => {
        // Arrange
        vi.mocked(hentJournalpostDokumentPdf).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentJournalpostDokumentPdf(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ journalpostId: 'journalpostId', dokumentId: 'dokumentId' });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
        expect(opprettPdfBlob).not.toHaveBeenCalled();
        expect(window.URL.createObjectURL).not.toHaveBeenCalled();
    });

    test('Skal håndtere feil ved oppretting av pdf-blob', async () => {
        // Arrange
        vi.mocked(hentJournalpostDokumentPdf).mockResolvedValue(bytes);
        vi.mocked(opprettPdfBlob).mockImplementation(() => {
            throw new Error('Ugyldig pdf');
        });

        const { result } = renderHook(() => useHentJournalpostDokumentPdf(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ journalpostId: 'journalpostId', dokumentId: 'dokumentId' });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Ugyldig pdf');
        expect(window.URL.createObjectURL).not.toHaveBeenCalled();
    });
});
