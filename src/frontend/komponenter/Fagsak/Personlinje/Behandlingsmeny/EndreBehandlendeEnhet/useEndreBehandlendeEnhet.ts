import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/BehandlingContext';
import { useFagsakRessurser } from '../../../../../context/FagsakContext';
import { IRestEndreBehandlendeEnhet } from '../../../../../typer/enhet';
import { IFagsak } from '../../../../../typer/fagsak';

const useEndreBehandlendeEnhet = (lukkModal: () => void) => {
    const { request } = useHttp();
    const { settFagsak } = useFagsakRessurser();
    const { åpenBehandling } = useBehandling();

    const [enhetId, settEnhetId] = useState<string | undefined>(undefined);
    const [begrunnelse, settBegrunnelse] = useState('');

    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());

    useEffect(() => {
        if (åpenBehandling.status === RessursStatus.SUKSESS) {
            settEnhetId(åpenBehandling.data.arbeidsfordelingPåBehandling.behandlendeEnhetId);
            settBegrunnelse('');
            settSubmitRessurs(byggTomRessurs());
        }
    }, [åpenBehandling]);

    const endreEnhet = (behandlingId: number) => {
        if (begrunnelse === '') {
            settSubmitRessurs(
                byggFeiletRessurs('Du må skrive en begrunnelse for endring av enhet')
            );
            return;
        }

        if (enhetId !== undefined) {
            settSubmitRessurs(byggHenterRessurs());

            request<IRestEndreBehandlendeEnhet, IFagsak>({
                method: 'PUT',
                data: {
                    enhetId,
                    begrunnelse,
                },
                url: `/familie-ba-sak/api/arbeidsfordeling/${behandlingId}`,
            }).then((oppdatertFagsak: Ressurs<IFagsak>) => {
                if (oppdatertFagsak.status === RessursStatus.SUKSESS) {
                    settFagsak(oppdatertFagsak);
                    settSubmitRessurs(byggTomRessurs());
                    settBegrunnelse('');
                    lukkModal();
                } else if (oppdatertFagsak.status === RessursStatus.FEILET) {
                    settSubmitRessurs(byggFeiletRessurs(oppdatertFagsak.frontendFeilmelding));
                }
            });
        }
    };

    const fjernState = () => {
        settEnhetId(
            åpenBehandling.status === RessursStatus.SUKSESS
                ? åpenBehandling.data.arbeidsfordelingPåBehandling.behandlendeEnhetId
                : undefined
        );
        settBegrunnelse('');
        settSubmitRessurs(byggTomRessurs());
    };

    return {
        begrunnelse,
        endreEnhet,
        enhetId,
        fjernState,
        settBegrunnelse,
        settEnhetId,
        settSubmitRessurs,
        submitRessurs,
    };
};

export default useEndreBehandlendeEnhet;
