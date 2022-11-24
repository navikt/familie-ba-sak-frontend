import { useEffect, useState } from 'react';

import {
    feil,
    type FeltState,
    ok,
    useFelt,
    useSkjema,
    Valideringsstatus,
} from '@navikt/familie-skjema';
import { byggHenterRessurs, type Ressurs, RessursStatus } from '@navikt/familie-typer';

import type { IBehandling } from '../../typer/behandling';
import type { IRestKorrigertVedtak } from '../../typer/vedtak';
import { isEmpty } from '../../utils/eøsValidators';
import { useBehandling } from '../behandlingContext/BehandlingContext';

interface IProps {
    onSuccess: () => void;
    behandlingId: number;
    korrigertVedtak?: IRestKorrigertVedtak;
}

const erVedtaksdatoGyldig = (felt: FeltState<string | undefined>): FeltState<string | undefined> =>
    !isEmpty(felt.verdi) ? ok(felt) : feil(felt, 'Dato for vedtaket med feil er påkrevd');

export const useKorrigerVedtakSkjemaContext = ({
    behandlingId,
    korrigertVedtak,
    onSuccess,
}: IProps) => {
    const { settÅpenBehandling } = useBehandling();
    const [restFeil, settRestFeil] = useState<string | undefined>(undefined);

    const {
        skjema,
        valideringErOk,
        kanSendeSkjema,
        settVisfeilmeldinger,
        onSubmit,
        nullstillSkjema,
        settSubmitRessurs,
        validerAlleSynligeFelter,
    } = useSkjema<
        {
            vedtaksdato: string | undefined;
            begrunnelse: string;
        },
        IBehandling
    >({
        felter: {
            vedtaksdato: useFelt<string | undefined>({
                verdi: korrigertVedtak?.vedtaksdato,
                valideringsfunksjon: erVedtaksdatoGyldig,
            }),
            begrunnelse: useFelt<string>({
                verdi: korrigertVedtak?.begrunnelse || '',
                valideringsfunksjon: (felt: FeltState<string>): FeltState<string> => ok(felt),
            }),
        },
        skjemanavn: 'korriger-vedtak-skjema',
    });

    useEffect(() => {
        nullstillSkjema();
    }, [korrigertVedtak?.vedtaksdato, korrigertVedtak?.begrunnelse]);

    const valideringsstatuser = [
        skjema.felter.vedtaksdato.valideringsstatus,
        skjema.felter.begrunnelse.valideringsstatus,
    ];

    useEffect(() => {
        if (
            valideringsstatuser.some(
                valideringsstatus => valideringsstatus === Valideringsstatus.IKKE_VALIDERT
            )
        ) {
            validerAlleSynligeFelter();
        }
    }, [valideringsstatuser]);

    const korrigertVedtakURL = `/familie-ba-sak/api/korrigertvedtak/behandling/${behandlingId}`;

    const lagreKorrigertVedtak = () => {
        if (kanSendeSkjema()) {
            settVisfeilmeldinger(false);
            settSubmitRessurs(byggHenterRessurs());
            onSubmit(
                {
                    method: 'POST',
                    data: {
                        vedtaksdato: skjema.felter.vedtaksdato.verdi,
                        begrunnelse: skjema.felter.begrunnelse.verdi,
                    },
                    url: korrigertVedtakURL,
                },
                (response: Ressurs<IBehandling>) => {
                    if (response.status === RessursStatus.SUKSESS) {
                        settRestFeil(undefined);
                        onSuccess();
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
                    onSuccess();
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
        nullstillSkjema,
        restFeil,
        angreKorrigering,
        settVisfeilmeldinger,
        settRestFeil,
    };
};
