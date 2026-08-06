import { hentEllerOpprettVedtaksbrevPdf } from '@api/hentEllerOpprettVedtaksbrevPdf';
import { renderHook, waitFor } from '@testing-library/react';
import { TestProviders } from '@testutils/testrender';
import { opprettPdfBlob } from '@utils/blob';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { useHentEllerOpprettVedtaksbrevPdf } from './useHentEllerOpprettVedtaksbrevPdf';

vi.mock('@api/hentEllerOpprettVedtaksbrevPdf');
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

describe('useHentEllerOpprettVedtaksbrevPdf', () => {
    test.each(['GET', 'POST'] as const)(
        'kaller hentEllerOpprettVedtaksbrevPdf med httpMethod %s og riktig vedtakId',
        async httpMethod => {
            // Arrange
            vi.mocked(hentEllerOpprettVedtaksbrevPdf).mockResolvedValue(bytes);
            vi.mocked(opprettPdfBlob).mockReturnValue(blob);

            const { result } = renderHook(() => useHentEllerOpprettVedtaksbrevPdf(), {
                wrapper: TestProviders,
            });

            // Act
            result.current.mutate({ vedtakId: 123, httpMethod });

            // Assert
            await waitFor(() => expect(result.current.isSuccess).toBe(true));
            expect(hentEllerOpprettVedtaksbrevPdf).toHaveBeenCalledWith(httpMethod, { vedtakId: 123 });
        }
    );

    test('oppretter en pdf-blob av bytene og returnerer en object-URL', async () => {
        // Arrange
        vi.mocked(hentEllerOpprettVedtaksbrevPdf).mockResolvedValue(bytes);
        vi.mocked(opprettPdfBlob).mockReturnValue(blob);

        const { result } = renderHook(() => useHentEllerOpprettVedtaksbrevPdf(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ vedtakId: 123, httpMethod: 'GET' });

        // Assert
        await waitFor(() => expect(result.current.isSuccess).toBe(true));
        expect(opprettPdfBlob).toHaveBeenCalledWith(bytes);
        expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
        expect(result.current.data).toBe(objectUrl);
    });

    test('kaller onSuccess-callback med object-URL ved vellykket mutasjon', async () => {
        // Arrange
        const onSuccess = vi.fn();
        vi.mocked(hentEllerOpprettVedtaksbrevPdf).mockResolvedValue(bytes);
        vi.mocked(opprettPdfBlob).mockReturnValue(blob);

        const { result } = renderHook(() => useHentEllerOpprettVedtaksbrevPdf({ onSuccess }), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ vedtakId: 123, httpMethod: 'POST' });

        // Assert
        await waitFor(() =>
            expect(onSuccess).toHaveBeenCalledWith(
                objectUrl,
                { vedtakId: 123, httpMethod: 'POST' },
                undefined,
                expect.any(Object)
            )
        );
    });

    test('Skal håndtere feil fra api-kallet', async () => {
        // Arrange
        vi.mocked(hentEllerOpprettVedtaksbrevPdf).mockRejectedValue(new Error('Noe gikk galt'));

        const { result } = renderHook(() => useHentEllerOpprettVedtaksbrevPdf(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ vedtakId: 123, httpMethod: 'GET' });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Noe gikk galt');
        expect(opprettPdfBlob).not.toHaveBeenCalled();
        expect(window.URL.createObjectURL).not.toHaveBeenCalled();
    });

    test('Skal håndtere feil ved oppretting av pdf-blob', async () => {
        // Arrange
        vi.mocked(hentEllerOpprettVedtaksbrevPdf).mockResolvedValue(bytes);
        vi.mocked(opprettPdfBlob).mockImplementation(() => {
            throw new Error('Ugyldig pdf');
        });

        const { result } = renderHook(() => useHentEllerOpprettVedtaksbrevPdf(), {
            wrapper: TestProviders,
        });

        // Act
        result.current.mutate({ vedtakId: 123, httpMethod: 'GET' });

        // Assert
        await waitFor(() => expect(result.current.isError).toBe(true));
        expect(result.current.error?.message).toBe('Ugyldig pdf');
        expect(window.URL.createObjectURL).not.toHaveBeenCalled();
    });
});
