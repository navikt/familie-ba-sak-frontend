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

import { FamilieAxiosRequestConfig } from '../../../context/AppContext';
import { IBrevData } from '../Hendelsesoversikt/BrevModul/typer';

const useForhåndsvisning = () => {
    const { request } = useHttp();

    const [visForhåndsvisningModal, settVisForhåndsviningModal] = useState<boolean>(false);

    const [hentetForhåndsvisning, settHentetForhåndsvisning] = React.useState<Ressurs<string>>(
        byggTomRessurs()
    );

    const nullstillHentetForhåndsvisning = () => {
        settHentetForhåndsvisning(byggTomRessurs);
    };

    const hentForhåndsvisning = <D>(familieAxiosRequestConfig: FamilieAxiosRequestConfig<D>) => {
        settHentetForhåndsvisning(byggHenterRessurs());
        request<IBrevData, string>(familieAxiosRequestConfig)
            .then((response: Ressurs<string>) => {
                settVisForhåndsviningModal(true);
                if (response.status === RessursStatus.SUKSESS) {
                    settHentetForhåndsvisning(
                        byggDataRessurs(`data:application/pdf;base64,${response.data}`)
                    );
                } else if (
                    [
                        RessursStatus.FEILET,
                        RessursStatus.FUNKSJONELL_FEIL,
                        RessursStatus.IKKE_TILGANG,
                    ].includes(response.status)
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
                    byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning. 🚨')
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
