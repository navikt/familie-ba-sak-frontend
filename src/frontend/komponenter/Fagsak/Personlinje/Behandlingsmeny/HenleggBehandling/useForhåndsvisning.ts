import { IBrevData } from '../../../../Felleskomponenter/Hendelsesoversikt/BrevModul/typer';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { AxiosError } from 'axios';
import React from 'react';
import { FamilieAxiosRequestConfig, useApp } from '../../../../../context/AppContext';

const useForhåndsvisning = () => {
    const { axiosRequest } = useApp();

    const [hentetForhåndsvisning, settHentetForhåndsvisning] = React.useState<Ressurs<string>>(
        byggTomRessurs()
    );

    const hentForhåndsvisning = (
        familieAxiosRequestConfig: FamilieAxiosRequestConfig<IBrevData>
    ) => {
        settHentetForhåndsvisning(byggHenterRessurs());
        axiosRequest<string, IBrevData>(familieAxiosRequestConfig)
            .then((response: Ressurs<string>) => {
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

    return { hentForhåndsvisning, hentetForhåndsvisning };
};

export default useForhåndsvisning;
