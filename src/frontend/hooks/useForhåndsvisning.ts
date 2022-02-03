import React, { useState } from 'react';

import { AxiosError } from 'axios';

import { useHttp } from '@navikt/familie-http';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { FamilieAxiosRequestConfig } from '../context/AppContext';

const useForhåndsvisning = () => {
    const { request } = useHttp();

    const [visForhåndsvisningModal, settVisForhåndsviningModal] = useState<boolean>(false);

    const [hentetForhåndsvisning, settHentetForhåndsvisning] = React.useState<Ressurs<string>>(
        byggTomRessurs()
    );

    const nullstillHentetForhåndsvisning = () => {
        settHentetForhåndsvisning(byggTomRessurs);
    };

    const base64ToArrayBuffer = (base64: string) => {
        const binaryString = window.atob(base64);
        const binaryLen = binaryString.length;
        const bytes = new Uint8Array(binaryLen);
        for (let i = 0; i < binaryLen; i++) {
            const ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    };

    const hentForhåndsvisning = <D>(familieAxiosRequestConfig: FamilieAxiosRequestConfig<D>) => {
        settHentetForhåndsvisning(byggHenterRessurs());
        request<D, string>(familieAxiosRequestConfig)
            .then((response: Ressurs<string>) => {
                settVisForhåndsviningModal(true);
                if (response.status === RessursStatus.SUKSESS) {
                    const blob = new Blob([base64ToArrayBuffer(response.data)], {
                        type: 'application/pdf',
                    });

                    settHentetForhåndsvisning(byggDataRessurs(window.URL.createObjectURL(blob)));
                } else if (
                    response.status === RessursStatus.FEILET ||
                    response.status === RessursStatus.FUNKSJONELL_FEIL ||
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
                    settHentetForhåndsvisning(response);
                } else {
                    settHentetForhåndsvisning(
                        byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.')
                    );
                }
            })
            .catch((_error: AxiosError) => {
                settHentetForhåndsvisning(
                    byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.')
                );
            });
    };

    return {
        hentForhåndsvisning,
        nullstillHentetForhåndsvisning,
        hentetForhåndsvisning,
        settHentetForhåndsvisning,
        visForhåndsvisningModal,
        settVisForhåndsviningModal,
    };
};

export default useForhåndsvisning;
