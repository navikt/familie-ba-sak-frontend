import { useState } from 'react';

import { useHttp } from '@navikt/familie-http';
import type { Ressurs } from '@navikt/familie-typer';
import { byggFeiletRessurs, byggHenterRessurs, byggTomRessurs, RessursStatus } from '@navikt/familie-typer';

import { useSaksbehandler } from '../../../../hooks/useSaksbehandler';
import { Behandlingstype, BehandlingÅrsak, type IBehandling } from '../../../../typer/behandling';
import { defaultFunksjonellFeil } from '../../../../typer/feilmeldinger';
import type { IVedtaksperiodeMedBegrunnelser } from '../../../../typer/vedtaksperiode';

const useBehandlingssteg = (
    oppdaterBehandling: (behandling: Ressurs<IBehandling>) => void,
    behandling: IBehandling
) => {
    const { request } = useHttp();
    const saksbehandler = useSaksbehandler();

    const [submitRessurs, settSubmitRessurs] = useState<Ressurs<IBehandling>>(byggTomRessurs());

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
        behandling?.årsak === BehandlingÅrsak.FALSK_IDENTITET ||
        behandling?.type === Behandlingstype.MIGRERING_FRA_INFOTRYGD;

    const sendTilBeslutterNesteOnClick = (
        settVisModal: (visModal: boolean) => void,
        erUlagretNyFeilutbetaltValuta: boolean,
        erUlagretNyRefusjonEøs: boolean,
        vedtaksperioderMedBegrunnelser: IVedtaksperiodeMedBegrunnelser[] | undefined,
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
        } else if (vedtaksperioderMedBegrunnelser === undefined) {
            settSubmitRessurs(
                byggFeiletRessurs(
                    'Det har skjedd en feil, og behandlingen ble ikke sendt til beslutter. ' +
                        'Prøv igjen eller kontakt brukerstøtte hvis problemet vedvarer.'
                )
            );
        } else if (!kanSendeInnVedtak(vedtaksperioderMedBegrunnelser) && !erSammensattKontrollsak) {
            settSubmitRessurs(
                byggFeiletRessurs('Vedtaksbrevet mangler begrunnelse. Du må legge til minst én begrunnelse.')
            );
        } else {
            settSubmitRessurs(byggHenterRessurs());
            request<void, IBehandling>({
                method: 'POST',
                url: `/familie-ba-sak/api/behandlinger/${
                    behandling?.behandlingId
                }/steg/send-til-beslutter?behandlendeEnhet=${saksbehandler.enhet ?? '9999'}`,
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
        sendTilBeslutterNesteOnClick,
    };
};

export default useBehandlingssteg;
