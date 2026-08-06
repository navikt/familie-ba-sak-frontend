import { hentEllerOpprettVedtaksbrevPdf } from '@api/hentEllerOpprettVedtaksbrevPdf';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { opprettPdfBlob } from '@utils/blob';

interface Parameters {
    vedtakId: number;
    httpMethod: 'GET' | 'POST';
}

type Options = Omit<UseMutationOptions<string, DefaultError, Parameters>, 'mutationFn'>;

export function useHentEllerOpprettVedtaksbrevPdf(options?: Options) {
    return useMutation({
        mutationFn: async (parameters: Parameters) => {
            const { httpMethod, vedtakId } = parameters;
            const bytes = await hentEllerOpprettVedtaksbrevPdf(httpMethod, { vedtakId });
            const blob = opprettPdfBlob(bytes);
            return window.URL.createObjectURL(blob);
        },
        ...options,
    });
}
