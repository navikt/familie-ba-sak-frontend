import { queryKeys } from '@hooks/keys/queryKeys';
import { useBehandlingId } from '@hooks/useBehandlingId';
import { useKorrigerVedtak } from '@hooks/useKorrigerVedtak';
import { useKorrigertVedtakContext } from '@sider/Fagsak/Behandling/Sider/Vedtak/KorrigerVedtak/KorrigertVedtakContext';
import { useQueryClient } from '@tanstack/react-query';
import { dateTilIsoDatoString, type IsoDatoString } from '@utils/dato';
import { useForm } from 'react-hook-form';

export const KORRIGER_VEDTAK_FORM_ID = 'korriger_vedtak_form_id';

export enum KorrigerVedtakFelt {
    VEDTAKSDATO = 'vedtaksdato',
    BEGRUNNELSE = 'begrunnelse',
}

export interface KorrigerVedtakFormValues {
    [KorrigerVedtakFelt.VEDTAKSDATO]: IsoDatoString | null;
    [KorrigerVedtakFelt.BEGRUNNELSE]: string;
}

type TransformedKorrigerVedtakFormValues = {
    [KorrigerVedtakFelt.VEDTAKSDATO]: IsoDatoString;
    [KorrigerVedtakFelt.BEGRUNNELSE]: string;
};

interface Props {
    lukkModal: () => void;
}

export function useKorrigerVedtakSkjema({ lukkModal }: Props) {
    const queryClient = useQueryClient();
    const behandlingId = useBehandlingId();
    const { korrigertVedtak } = useKorrigertVedtakContext();

    const { mutateAsync: korrigerVedtak } = useKorrigerVedtak({
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: queryKeys.korrigertVedtak(behandlingId) });
            queryClient.invalidateQueries({ queryKey: queryKeys.historikkinnslag(behandlingId) });
            lukkModal();
        },
    });

    const form = useForm<KorrigerVedtakFormValues, unknown, TransformedKorrigerVedtakFormValues>({
        values: {
            [KorrigerVedtakFelt.VEDTAKSDATO]: korrigertVedtak?.vedtaksdato
                ? dateTilIsoDatoString(new Date(korrigertVedtak.vedtaksdato))
                : null,
            [KorrigerVedtakFelt.BEGRUNNELSE]: korrigertVedtak?.begrunnelse ?? '',
        },
    });

    const { setError } = form;

    async function onSubmit(values: TransformedKorrigerVedtakFormValues) {
        const { vedtaksdato, begrunnelse } = values;
        const korrigerVedtakParameters = { vedtaksdato, begrunnelse, behandlingId };
        try {
            await korrigerVedtak(korrigerVedtakParameters);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Teknisk feil ved lagring av korrigert vedtak.';
            setError('root', { message });
        }
    }

    return { form, onSubmit };
}
