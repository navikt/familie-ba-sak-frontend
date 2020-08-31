import { useApp } from '../../../context/AppContext';
import {
    byggDataRessurs,
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';
import { IBrevData } from '../BrevModul/typer';
import { AxiosError } from 'axios';
import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';

const useBrevApi = () => {
    const { axiosRequest } = useApp();
    const { åpenBehandling } = useBehandling();
    const [innsendtBrev, settInnsendtBrev] = React.useState<Ressurs<string>>(byggTomRessurs());
    const [hentetForhåndsvisning, settHentetForhåndsvisning] = React.useState<Ressurs<string>>(
        byggTomRessurs()
    );

    const behandlingId =
        åpenBehandling.status === RessursStatus.SUKSESS && åpenBehandling.data.behandlingId;

    const sendBrev = (brevData: IBrevData) => {
        settInnsendtBrev(byggHenterRessurs());
        axiosRequest<string, IBrevData>({
            method: 'POST',
            data: brevData,
            url: `/familie-ba-sak/api/dokument/send-brev/innhente-opplysninger/${behandlingId}`,
        })
            .then((response: Ressurs<string>) => {
                settInnsendtBrev(response);
            })
            .catch((_error: AxiosError) => {
                settInnsendtBrev(byggFeiletRessurs('Ukjent feil ved sending av brev.'));
            });
    };

    const hentForhåndsvisning = (brevData: IBrevData) => {
        settHentetForhåndsvisning(byggHenterRessurs());
        axiosRequest<string, IBrevData>({
            method: 'POST',
            data: brevData,
            url: `/familie-ba-sak/api/dokument/forhaandsvis-brev/innhente-opplysninger/${behandlingId}`,
        })
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

    return {
        sendBrev,
        hentForhåndsvisning,
        innsendtBrev,
        hentetForhåndsvisning,
    };
};

export default useBrevApi;
