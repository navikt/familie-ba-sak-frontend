import { useState } from 'react';

import type { FeltState } from '@navikt/familie-skjema';
import { ok, useFelt, useSkjema } from '@navikt/familie-skjema';
import type { Ressurs } from '@navikt/familie-typer';
import { byggHenterRessurs, RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../../../../../typer/behandling';
import type { IRestKorrigertVedtak } from '../../../../../../typer/vedtak';
import { dateTilIsoDatoString, validerGyldigDato } from '../../../../../../utils/dato';
import { useBehandlingContext } from '../../../context/BehandlingContext';

interface IProps {
    lukkModal: () => void;
    behandlingId: number;
    korrigertVedtak?: IRestKorrigertVedtak;
}

export const useKorrigerVedtakSkjema = ({ behandlingId, korrigertVedtak, lukkModal }: IProps) => {
    const { settÅpenBehandling } = useBehandlingContext();
    const [restFeil, settRestFeil] = useState<string | undefined>(undefined);

    const opprinneligVedtaksdato = korrigertVedtak
        ? new Date(korrigertVedtak.vedtaksdato)
        : undefined;

    const {
        skjema,
        valideringErOk,
        kanSendeSkjema,
        settVisfeilmeldinger,
        onSubmit,
        nullstillSkjema,
        settSubmitRessurs,
    } = useSkjema<
        {
            vedtaksdato: Date | undefined;
            begrunnelse: string;
        },
        IBehandling
    >({
        felter: {
            vedtaksdato: useFelt<Date | undefined>({
                verdi: opprinneligVedtaksdato,
                valideringsfunksjon: validerGyldigDato,
            }),
            begrunnelse: useFelt<string>({
                verdi: korrigertVedtak?.begrunnelse || '',
                valideringsfunksjon: (felt: FeltState<string>): FeltState<string> => ok(felt),
            }),
        },
        skjemanavn: 'korriger-vedtak-skjema',
    });

    const korrigertVedtakURL = `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`;

    const lagreKorrigertVedtak = () => {
        if (kanSendeSkjema()) {
            settVisfeilmeldinger(false);
            settSubmitRessurs(byggHenterRessurs());
            onSubmit<IRestKorrigertVedtak>(
                {
                    method: 'POST',
                    data: {
                        vedtaksdato: dateTilIsoDatoString(skjema.felter.vedtaksdato.verdi),
                        begrunnelse: skjema.felter.begrunnelse.verdi,
                    },
                    url: korrigertVedtakURL,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settRestFeil(undefined);
                        lukkModal();
                        nullstillSkjema();
                        settÅpenBehandling(response);
                    }
                },
                (error: Ressurs<IBehandling>) => {
                    if (
                        error.status === RessursStatus.FEILET ||
                        error.status === RessursStatus.FUNKSJONELL_FEIL
                    ) {
                        settRestFeil(error.frontendFeilmelding);
                    } else {
                        settRestFeil('Teknisk feil ved lagring av korrigert vedtak');
                    }
                }
            );
        } else {
            settVisfeilmeldinger(true);
        }
    };

    const angreKorrigering = () => {
        onSubmit(
            {
                method: 'PATCH',
                url: korrigertVedtakURL,
            },
            (response: Ressurs<IBehandling>) => {
                if (response.status === RessursStatus.SUKSESS) {
                    settRestFeil(undefined);
                    lukkModal();
                    nullstillSkjema();
                    settÅpenBehandling(response);
                }
            },
            () => {
                settRestFeil('Teknisk feil ved fjerning av korrigert vedtak');
            }
        );
    };

    return {
        skjema,
        valideringErOk,
        lagreKorrigertVedtak,
        restFeil,
        angreKorrigering,
    };
};
