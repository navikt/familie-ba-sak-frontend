import React, { useState } from 'react';

import { AxiosError } from 'axios';

import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { FamilieAxiosRequestConfig, useApp } from '../../../context/AppContext';
import { IBrevData } from '../Hendelsesoversikt/BrevModul/typer';

const useForhåndsvisning = () => {
    const { axiosRequest } = useApp();

    const [visForhåndsvisningModal, settVisForhåndsviningModal] = useState<boolean>(false);

    const [hentetForhåndsvisning, settHentetForhåndsvisning] = React.useState<Ressurs<string>>(
        byggTomRessurs()
    );

    const nullstillHentetForhåndsvisning = () => {
        settHentetForhåndsvisning(byggTomRessurs);
    };

    const hentForhåndsvisning = <D>(familieAxiosRequestConfig: FamilieAxiosRequestConfig<D>) => {
        settHentetForhåndsvisning(byggHenterRessurs());
        axiosRequest<string, IBrevData>(familieAxiosRequestConfig)
            .then((response: Ressurs<string>) => {
                settVisForhåndsviningModal(true);
                if (response.status === RessursStatus.SUKSESS) {
                    settHentetForhåndsvisning(
                        byggDataRessurs(`data:application/pdf;base64,${response.data}`)
                    );
                } else if (response.status === RessursStatus.FEILET) {
                    settHentetForhåndsvisning(response);
                } else {
                    settHentetForhåndsvisning(
                        byggFeiletRessurs('Ukjent feil, kunne ikke generere forhåndsvisning.')
                    );
                }
            })
            .catch((_error: AxiosError) => {
                settHentetForhåndsvisning(
                    byggFeiletRessurs('Ukjent feil ved henting av forhåndsvisning.')
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
