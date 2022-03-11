import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    type Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../typer/behandling';
import type { IRestEndreBehandlendeEnhet } from '../../../../../typer/enhet';

const useEndreBehandlendeEnhet = (lukkModal: () => void) => {
    const { request } = useHttp();
    const { åpenBehandling, settÅpenBehandling } = useBehandling();

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

            request<IRestEndreBehandlendeEnhet, IBehandling>({
                method: 'PUT',
                data: {
                    enhetId,
                    begrunnelse,
                },
                url: `/familie-ba-sak/api/arbeidsfordeling/${behandlingId}`,
            }).then((oppdatertBehandling: Ressurs<IBehandling>) => {
                if (oppdatertBehandling.status === RessursStatus.SUKSESS) {
                    settÅpenBehandling(oppdatertBehandling);
                    settSubmitRessurs(byggTomRessurs());
                    settBegrunnelse('');
                    lukkModal();
                    return;
                }

                settSubmitRessurs(oppdatertBehandling);
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
