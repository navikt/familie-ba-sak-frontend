import { useKorrigerVedtak } from '@hooks/useKorrigerVedtak';
import { byggSuksessRessurs } from '@navikt/familie-typer';
import { dateTilIsoDatoString, type IsoDatoString } from '@utils/dato';
import { useForm } from 'react-hook-form';

import { useBehandlingContext } from '../../../context/BehandlingContext';

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
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const korrigertVedtak = behandling.korrigertVedtak;

    const { mutateAsync: korrigerVedtak } = useKorrigerVedtak({
        onSuccess: behandling => {
            settÅpenBehandling(byggSuksessRessurs(behandling));
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
        const korrigerVedtakParameters = { vedtaksdato, begrunnelse, behandlingId: behandling.behandlingId };
        try {
            await korrigerVedtak(korrigerVedtakParameters);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : 'Teknisk feil ved lagring av korrigert vedtak.';
            setError('root', { message });
        }
    }

    return { form, onSubmit };
}
