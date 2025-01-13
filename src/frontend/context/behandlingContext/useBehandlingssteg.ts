import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    RessursStatus,
} from '@navikt/familie-typer';

import useSakOgBehandlingParams from '../../hooks/useSakOgBehandlingParams';
import type { IBehandling } from '../../typer/behandling';
import { BehandlingResultat, Behandlingstype, BehandlingÅrsak } from '../../typer/behandling';
import { defaultFunksjonellFeil } from '../../typer/feilmeldinger';
import type { IVedtaksperiodeMedBegrunnelser } from '../../typer/vedtaksperiode';
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

    const minstEnPeriodeharBegrunnelseEllerFritekst = (
        vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[]
    ): boolean => {
        return vedtaksperioderMedBegrunnelser.some(
            vedtaksperioderMedBegrunnelse =>
                vedtaksperioderMedBegrunnelse.begrunnelser.length !== 0 ||
                vedtaksperioderMedBegrunnelse.fritekster.length !== 0
        );
    };

    const kanSendeInnVedtak = (vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[]) =>
        minstEnPeriodeharBegrunnelseEllerFritekst(vedtaksperioderMedBegrunnelser) ||
        behandling?.årsak === BehandlingÅrsak.TEKNISK_ENDRING ||
        behandling?.årsak === BehandlingÅrsak.KORREKSJON_VEDTAKSBREV ||
        behandling?.årsak === BehandlingÅrsak.DØDSFALL_BRUKER ||
        behandling?.årsak === BehandlingÅrsak.IVERKSETTE_KA_VEDTAK ||
        behandling?.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const sendTilBeslutterNesteOnClick = (
        settVisModal: (visModal: boolean) => void,
        erUlagretNyFeilutbetaltValuta: boolean,
        erUlagretNyRefusjonEøs: boolean,
        vedtaksperioderMedBegrunnelserRessurs: Ressurs<IVedtaksperiodeMedBegrunnelser[]>,
        erSammensattKontrollsak: boolean
    ) => {
        if (erUlagretNyFeilutbetaltValuta) {
            settSubmitRessurs(
                byggFeiletRessurs(
                    'Det er lagt til en ny periode med feilutbetalt valuta. Fyll ut periode og beløp, eller fjern perioden.'
                )
            );
        } else if (erUlagretNyRefusjonEøs) {
            settSubmitRessurs(
                byggFeiletRessurs(
                    'Det er lagt til en ny periode med refusjon EØS. Fyll ut periode og refusjonsbeløp, eller fjern perioden.'
                )
            );
        } else if (vedtaksperioderMedBegrunnelserRessurs.status !== RessursStatus.SUKSESS) {
            settSubmitRessurs(
                byggFeiletRessurs(
                    'Det har skjedd en feil, og behandlingen ble ikke sendt til beslutter. ' +
                        'Prøv igjen eller kontakt brukerstøtte hvis problemet vedvarer.'
                )
            );
        } else if (
            !kanSendeInnVedtak(vedtaksperioderMedBegrunnelserRessurs.data) &&
            !erSammensattKontrollsak
        ) {
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
    };
};

export default useBehandlingssteg;
