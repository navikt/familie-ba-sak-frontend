import { useAngreKorrigertVedtak } from '@hooks/useAngreKorrigertVedtak';
import { useKorrigerVedtak } from '@hooks/useKorrigerVedtak';
import type { IRestKorrigertVedtak } from '@typer/vedtak';
import { dateTilIsoDatoString, type IsoDatoString } from '@utils/dato';
import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useBehandlingContext } from '../../../context/BehandlingContext';

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
    behandlingId: number;
    korrigertVedtak?: IRestKorrigertVedtak;
}

export const useKorrigerVedtakSkjema = ({ behandlingId, korrigertVedtak, lukkModal }: Props) => {
    const { settÅpenBehandling } = useBehandlingContext();
    const { mutateAsync: korrigerVedtak } = useKorrigerVedtak();
    const { mutateAsync: angreKorrigertVedtak } = useAngreKorrigertVedtak();

    const form = useForm<KorrigerVedtakFormValues, unknown, TransformedKorrigerVedtakFormValues>({
        values: {
            [KorrigerVedtakFelt.VEDTAKSDATO]: korrigertVedtak?.vedtaksdato
                ? dateTilIsoDatoString(new Date(korrigertVedtak.vedtaksdato))
                : null,
            [KorrigerVedtakFelt.BEGRUNNELSE]: '',
        },
    });

    const { setError } = form;

    const onKorrigerVedtak = async (values: TransformedKorrigerVedtakFormValues) => {
        const { vedtaksdato, begrunnelse } = values;

        const korrigerVedtakParameters = {
            vedtaksdato,
            begrunnelse,
            behandlingId,
        };

        return korrigerVedtak(korrigerVedtakParameters)
            .then(behandling => {
                settÅpenBehandling(byggSuksessRessurs(behandling));
                lukkModal();
            })
            .catch((e: unknown) => {
                setError('root', {
                    message: e instanceof Error ? e.message : 'Teknisk feil ved lagring av korrigert vedtak.',
                });
            });
    };

    const onAngreKorrigertVedtak = async () => {
        return angreKorrigertVedtak(behandlingId)
            .then(behandling => {
                settÅpenBehandling(byggSuksessRessurs(behandling));
                lukkModal();
            })
            .catch((e: unknown) => {
                setError('root', {
                    message: e instanceof Error ? e.message : 'Teknisk feil ved fjerning av korrigert vedtak.',
                });
            });
    };

    return {
        form,
        onKorrigerVedtak,
        onAngreKorrigertVedtak,
    };
};
