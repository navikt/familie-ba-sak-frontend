import { useEffect, useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useBehandlingContext } from '../../../../../context/behandlingContext/BehandlingContext';
import type { IBehandling } from '../../../../../typer/behandling';
import type { IRestEndreBehandlendeEnhet } from '../../../../../typer/enhet';

const useEndreBehandlendeEnhet = (lukkModal: () => void) => {
    const { request } = useHttp();
    const { behandling, settÅpenBehandling } = useBehandlingContext();

    const [enhetId, settEnhetId] = useState<string | undefined>(undefined);
    const [begrunnelse, settBegrunnelse] = useState('');

    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());

    useEffect(() => {
        settEnhetId(behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId);
        settBegrunnelse('');
        settSubmitRessurs(byggTomRessurs());
    }, [behandling]);

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
        settEnhetId(behandling.arbeidsfordelingPåBehandling.behandlendeEnhetId);
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
