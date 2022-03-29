import { useState } from 'react';

import { useHistory } from 'react-router';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';
import type { Ressurs } from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../typer/behandling';
import { BehandlingResultat, BehandlingÅrsak, Behandlingstype } from '../../typer/behandling';
import { defaultFunksjonellFeil } from '../../typer/feilmeldinger';
import { useApp } from '../AppContext';

const useBehandlingssteg = (
    oppdaterBehandling: (behandling: Ressurs<IBehandling>) => void,
    behandling?: IBehandling
) => {
    const { request } = useHttp();
    const { innloggetSaksbehandler } = useApp();
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

                    history.push(`/fagsak/${fagsakId}/${behandling.behandlingId}/tilkjent-ytelse`);
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

    const minstEnPeriodeharBegrunnetelseEllerFritekst = (): boolean => {
        const vedtaksperioderMedBegrunnelser =
            behandling?.vedtak?.vedtaksperioderMedBegrunnelser ?? [];
        return vedtaksperioderMedBegrunnelser.some(
            vedtaksperioderMedBegrunnelse =>
                vedtaksperioderMedBegrunnelse.begrunnelser.length !== 0 ||
                vedtaksperioderMedBegrunnelse.fritekster.length !== 0
        );
    };

    const kanSendeinnVedtak = () =>
        minstEnPeriodeharBegrunnetelseEllerFritekst() ||
        behandling?.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
        behandling?.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
        behandling?.årsak === BehandlingÅrsak.DØDSFALL_BRUKER ||
        behandling?.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const sendTilBeslutterNesteOnClick = (settVisModal: (visModal: boolean) => void) => {
        if (kanSendeinnVedtak()) {
            settSubmitRessurs(byggHenterRessurs());
            request<void, IBehandling>({
                method: 'POST',
                url: `/familie-ba-sak/api/behandlinger/${
                    behandling?.behandlingId
                }/steg/send-til-beslutter?behandlendeEnhet=${
                    innloggetSaksbehandler?.enhet ?? '9999'
                }`,
            }).then((response: Ressurs<IBehandling>) => {
                settSubmitRessurs(response);

                if (response.status === RessursStatus.SUKSESS) {
                    settVisModal(true);
                    oppdaterBehandling(response);
                } else if (response.status === RessursStatus.FEILET) {
                    settSubmitRessurs(byggFeiletRessurs(defaultFunksjonellFeil));
                }
            });
        } else {
            settSubmitRessurs(
                byggFeiletRessurs(
                    'Vedtaksbrevet mangler begrunnelse. Du må legge til minst én begrunnelse.'
                )
            );
        }
    };

    return {
        submitRessurs,
        vilkårsvurderingNesteOnClick,
        behandlingresultatNesteOnClick,
        sendTilBeslutterNesteOnClick,
        settSubmitRessurs,
    };
};

export default useBehandlingssteg;
