import { useState } from 'react';

import { useHistory } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import { IBehandling, BehandlingResultat } from '../../typer/behandling';
import { defaultFunksjonellFeil } from '../../typer/feilmeldinger';

const useBehandlingssteg = (oppdaterBehandling: (behandling: Ressurs<IBehandling>) => void) => {
    const { request } = useHttp();
    const { fagsakId, behandlingId } = useSakOgBehandlingParams();

    const history = useHistory();

    const [submitRessurs, settSubmitRessurs] = useState(byggTomRessurs());

    const vilkårsvurderingNesteOnClick = () => {
        settSubmitRessurs(byggHenterRessurs());

        request<void, IBehandling>({
            method: 'POST',
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/vilkårsvurdering`,
        })
            .then((response: Ressurs<IBehandling>) => {
                settSubmitRessurs(response);
                if (response.status === RessursStatus.SUKSESS) {
                    const behandling = response.data;
                    oppdaterBehandling(response);

                    if (behandling.resultat !== BehandlingResultat.AVSLÅTT) {
                        history.push(
                            `/fagsak/${fagsakId}/${behandling.behandlingId}/tilkjent-ytelse`
                        );
                    } else {
                        history.push(`/fagsak/${fagsakId}/${behandling.behandlingId}/vedtak`);
                    }
                }
            })
            .catch(() => {
                settSubmitRessurs(byggFeiletRessurs(defaultFunksjonellFeil));
            });
    };

    const behandlingresultatNesteOnClick = () => {
        settSubmitRessurs(byggHenterRessurs());

        request<void, IBehandling>({
            method: 'POST',
            url: `/familie-ba-sak/api/behandlinger/${behandlingId}/steg/behandlingsresultat`,
        })
            .then((response: Ressurs<IBehandling>) => {
                settSubmitRessurs(response);

                if (response.status === RessursStatus.SUKSESS) {
                    const behandling = response.data;
                    oppdaterBehandling(response);

                    if (behandling.resultat !== BehandlingResultat.AVSLÅTT) {
                        history.push(`/fagsak/${fagsakId}/${behandlingId}/simulering`);
                    } else {
                        history.push(`/fagsak/${fagsakId}/${behandlingId}/vedtak`);
                    }
                }
            })
            .catch(() => {
                settSubmitRessurs(byggFeiletRessurs(defaultFunksjonellFeil));
            });
    };

    return {
        submitRessurs,
        vilkårsvurderingNesteOnClick,
        behandlingresultatNesteOnClick,
    };
};

export default useBehandlingssteg;
