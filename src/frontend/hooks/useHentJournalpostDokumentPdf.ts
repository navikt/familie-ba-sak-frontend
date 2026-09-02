import { hentJournalpostDokumentPdf } from '@api/hentJournalpostDokumentPdf';
import { type DefaultError, type UseMutationOptions, useMutation } from '@tanstack/react-query';
import { opprettPdfBlob } from '@utils/blob';

interface HentJournalpostDokumentParameters {
    journalpostId: string;
    dokumentId: string;
}

type Options = Omit<UseMutationOptions<string, DefaultError, HentJournalpostDokumentParameters>, 'mutationFn'>;

export function useHentJournalpostDokumentPdf(options?: Options) {
    return useMutation({
        mutationFn: async ({ journalpostId, dokumentId }: HentJournalpostDokumentParameters) => {
            const base64 = await hentJournalpostDokumentPdf(journalpostId, dokumentId);
            const blob = opprettPdfBlob(base64);
            return window.URL.createObjectURL(blob);
        },
        ...options,
    });
}
