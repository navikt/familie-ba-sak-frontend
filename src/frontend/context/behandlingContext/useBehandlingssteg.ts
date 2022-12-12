import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

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

    const navigate = useNavigate();

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

                    navigate(`/fagsak/${fagsakId}/${behandling.behandlingId}/tilkjent-ytelse`);
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
                        navigate(`/fagsak/${fagsakId}/${behandlingId}/simulering`);
                    } else {
                        navigate(`/fagsak/${fagsakId}/${behandlingId}/vedtak`);
                    }
                }
            })
            .catch(() => {
                settSubmitRessurs(byggFeiletRessurs(defaultFunksjonellFeil));
            });
    };

    const minstEnPeriodeharBegrunnelseEllerFritekst = (): boolean => {
        const vedtaksperioderMedBegrunnelser =
            behandling?.vedtak?.vedtaksperioderMedBegrunnelser ?? [];
        return vedtaksperioderMedBegrunnelser.some(
            vedtaksperioderMedBegrunnelse =>
                vedtaksperioderMedBegrunnelse.begrunnelser.length !== 0 ||
                vedtaksperioderMedBegrunnelse.fritekster.length !== 0
        );
    };

    const kanSendeinnVedtak = () =>
        minstEnPeriodeharBegrunnelseEllerFritekst() ||
        behandling?.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
        behandling?.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
        behandling?.årsak === BehandlingÅrsak.DØDSFALL_BRUKER ||
        behandling?.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const sendTilBeslutterNesteOnClick = (
        settVisModal: (visModal: boolean) => void,
        erUlagretNyTrekkILøpendeUtbetaling: boolean
    ) => {
        if (erUlagretNyTrekkILøpendeUtbetaling) {
            settSubmitRessurs(
                byggFeiletRessurs(
                    'Det er lagt til panel for trekk i løpende utbetaling. Fyll ut periode og beløp, eller fjern panelet.'
                )
            );
        } else if (!kanSendeinnVedtak) {
            settSubmitRessurs(
                byggFeiletRessurs(
                    'Vedtaksbrevet mangler begrunnelse. Du må legge til minst én begrunnelse.'
                )
            );
        } else {
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
