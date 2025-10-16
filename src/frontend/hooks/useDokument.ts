import React, { useState } from 'react';

import type { AxiosError } from 'axios';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import type { FamilieAxiosRequestConfig } from '../context/AppContext';
import type { Distribusjonskanal } from '../typer/dokument';

const useDokument = () => {
    const { request } = useHttp();

    const [visDokumentModal, settVisDokumentModal] = useState<boolean>(false);

    const [hentetDokument, settHentetDokument] = React.useState<Ressurs<string>>(byggTomRessurs());

    const [distribusjonskanal, settDistribusjonskanal] = React.useState<Ressurs<Distribusjonskanal>>(byggTomRessurs());

    const nullstillDokument = () => {
        settHentetDokument(byggTomRessurs);
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

    const hentDistribusjonskanal = (personIdent: string) => {
        settDistribusjonskanal(byggHenterRessurs());
        request<{ ident: string }, Distribusjonskanal>({
            method: 'POST',
            data: { ident: personIdent },
            url: `/familie-ba-sak/api/dokument/distribusjonskanal`,
        })
            .then((response: Ressurs<Distribusjonskanal>) => {
                settDistribusjonskanal(response);
            })
            .catch((_error: AxiosError) => {
                settDistribusjonskanal(byggFeiletRessurs('Ukjent feil, kunne ikke hente distribusjonskanal.'));
            });
    };
    const hentForhåndsvisning = <D>(familieAxiosRequestConfig: FamilieAxiosRequestConfig<D>) => {
        settHentetDokument(byggHenterRessurs());
        request<D, string>(familieAxiosRequestConfig)
            .then((response: Ressurs<string>) => {
                settVisDokumentModal(true);
                if (response.status === RessursStatus.SUKSESS) {
                    const blob = new Blob([base64ToArrayBuffer(response.data)], {
                        type: 'application/pdf',
                    });

                    settHentetDokument(byggDataRessurs(window.URL.createObjectURL(blob)));
                } else if (
                    response.status === RessursStatus.FEILET ||
                    response.status === RessursStatus.FUNKSJONELL_FEIL ||
                    response.status === RessursStatus.IKKE_TILGANG
                ) {
                    settHentetDokument(response);
                } else {
                    settHentetDokument(byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.'));
                }
            })
            .catch((_error: AxiosError) => {
                settHentetDokument(byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.'));
            });
    };

    return {
        hentForhåndsvisning,
        nullstillDokument,
        hentetDokument,
        settHentetDokument,
        visDokumentModal,
        settVisDokumentModal,
        distribusjonskanal,
        hentDistribusjonskanal,
    };
};

export default useDokument;
