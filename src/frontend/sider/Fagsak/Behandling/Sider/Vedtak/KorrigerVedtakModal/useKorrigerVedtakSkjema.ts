import { useAngreKorrigertVedtak } from '@hooks/useAngreKorrigertVedtak';
import { useKorrigerVedtak } from '@hooks/useKorrigerVedtak';
import type { IRestKorrigertVedtak } from '@typer/vedtak';
import { dateTilIsoDatoString } from '@utils/dato';
import { useForm } from 'react-hook-form';

import { byggSuksessRessurs } from '@navikt/familie-typer';

import { useBehandlingContext } from '../../../context/BehandlingContext';

export enum KorrigerVedtakFelt {
    VEDTAKSDATO = 'vedtaksdato',
    BEGRUNNELSE = 'begrunnelse',
}

export interface KorrigerVedtakFormValues {
    [KorrigerVedtakFelt.VEDTAKSDATO]: Date | null;
    [KorrigerVedtakFelt.BEGRUNNELSE]: string;
}

type TransformedKorrigerVedtakFormValues = {
    [KorrigerVedtakFelt.VEDTAKSDATO]: Date;
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

    const opprinneligVedtaksdato = korrigertVedtak ? new Date(korrigertVedtak.vedtaksdato) : undefined;

    const form = useForm<KorrigerVedtakFormValues, unknown, TransformedKorrigerVedtakFormValues>({
        defaultValues: {
            [KorrigerVedtakFelt.VEDTAKSDATO]: opprinneligVedtaksdato, // TODO: sjekk om denne er riktig som defaultvalue
            [KorrigerVedtakFelt.BEGRUNNELSE]: '',
        },
    });

    const { setError } = form;

    const onKorrigerVedtak = async (values: TransformedKorrigerVedtakFormValues) => {
        const { vedtaksdato, begrunnelse } = values;

        const korrigerVedtakParameters = {
            vedtaksdato: dateTilIsoDatoString(vedtaksdato),
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
