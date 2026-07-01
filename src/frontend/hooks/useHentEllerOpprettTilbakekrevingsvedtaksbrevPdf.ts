import { hentEllerOpprettTilbakekrevingsvedtaksbrev } from '@api/hentEllerOpprettTilbakekrevingsvedtaksbrev';
import { type DefaultError, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { opprettPdfBlob } from '@utils/blob';

interface Parameters {
    behandlingId: number;
    httpMethod: 'GET' | 'POST';
}

type Options = Omit<UseMutationOptions<string, DefaultError, Parameters>, 'mutationFn'>;

export function useHentEllerOpprettTilbakekrevingsvedtaksbrevPdf(options?: Options) {
    return useMutation({
        mutationFn: async (parameters: Parameters) => {
            const { httpMethod, behandlingId } = parameters;
            const bytes = await hentEllerOpprettTilbakekrevingsvedtaksbrev(httpMethod, { behandlingId });
            const blob = opprettPdfBlob(bytes);
            return window.URL.createObjectURL(blob);
        },
        ...options,
    });
}
