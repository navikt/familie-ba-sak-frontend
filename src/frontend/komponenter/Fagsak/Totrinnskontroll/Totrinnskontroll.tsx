import * as React from 'react';

import { AxiosError } from 'axios';
import { useHistory } from 'react-router';

import { Knapp } from 'nav-frontend-knapper';

import { useHttp } from '@navikt/familie-http';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '@navikt/familie-typer';

import { useApp } from '../../../context/AppContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { BehandlerRolle, BehandlingStatus, IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { ITotrinnskontrollData, TotrinnskontrollBeslutning } from '../../../typer/totrinnskontroll';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import TotrinnskontrollModalInnhold from './TotrinnskontrollModalInnhold';
import TotrinnskontrollSendtTilBeslutterSkjema from './TotrinnskontrollSendtTilBeslutterSkjema';
import Totrinnskontrollskjema from './Totrinnskontrollskjema';

interface IProps {
    åpenBehandling: IBehandling | undefined;
    fagsak: IFagsak;
}

interface IModalVerdier {
    skalVises: boolean;
    beslutning: TotrinnskontrollBeslutning;
}

const initiellModalVerdi = {
    skalVises: false,
    beslutning: TotrinnskontrollBeslutning.IKKE_VURDERT,
};

const Totrinnskontroll: React.FunctionComponent<IProps> = ({ åpenBehandling, fagsak }) => {
    const { hentSaksbehandlerRolle, innloggetSaksbehandler } = useApp();
    const { request } = useHttp();
    const { settFagsak } = useFagsakRessurser();
    const history = useHistory();

    const [innsendtVedtak, settInnsendtVedtak] = React.useState<Ressurs<IFagsak>>(byggTomRessurs());
    const [modalVerdi, settModalVerdi] = React.useState<IModalVerdier>(initiellModalVerdi);
    React.useEffect(() => {
        settModalVerdi({
            ...modalVerdi,
            skalVises: innsendtVedtak.status === RessursStatus.SUKSESS,
        });
    }, [innsendtVedtak.status]);

    const skalViseSkjema =
        BehandlerRolle.BESLUTTER === hentSaksbehandlerRolle() &&
        åpenBehandling?.status === BehandlingStatus.FATTER_VEDTAK &&
        history.location.pathname.includes('vedtak');

    const kanBeslutte = innloggetSaksbehandler?.email !== åpenBehandling?.endretAv ?? false;

    const sendInnVedtak = (totrinnskontrollData: ITotrinnskontrollData) => {
        settInnsendtVedtak(byggHenterRessurs());
        settModalVerdi({ ...modalVerdi, beslutning: totrinnskontrollData.beslutning });
        const manglerBegrunnelse =
            totrinnskontrollData.beslutning === TotrinnskontrollBeslutning.UNDERKJENT &&
            !totrinnskontrollData.begrunnelse;
        if (totrinnskontrollData.beslutning === TotrinnskontrollBeslutning.IKKE_VURDERT) {
            settInnsendtVedtak(byggFeiletRessurs('Totrinnskontroll ikke vurdert ved innsending'));
        } else if (manglerBegrunnelse) {
            settInnsendtVedtak(byggFeiletRessurs('Mangler begrunnelse ved innsending'));
        } else {
            request<ITotrinnskontrollData, IFagsak>({
                method: 'POST',
                data: totrinnskontrollData,
                url: `/familie-ba-sak/api/fagsaker/${fagsak.id}/iverksett-vedtak`,
            })
                .then((response: Ressurs<IFagsak>) => {
                    settInnsendtVedtak(response);
                    if (response.status === RessursStatus.SUKSESS) {
                        settFagsak(response);
                    }
                })
                .catch((_error: AxiosError) => {
                    settInnsendtVedtak(byggFeiletRessurs('Ukjent feil, sende inn vedtak.'));
                });
        }
    };

    return (
        <>
            {skalViseSkjema &&
                (kanBeslutte ? (
                    <Totrinnskontrollskjema
                        sendInnVedtak={sendInnVedtak}
                        innsendtVedtak={innsendtVedtak}
                    />
                ) : (
                    <TotrinnskontrollSendtTilBeslutterSkjema åpenBehandling={åpenBehandling} />
                ))}
            {modalVerdi && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Totrinnskontroll',
                        lukkKnapp: false,
                        visModal: modalVerdi.skalVises,
                        actions: [
                            <Knapp
                                key={'saksoversikt'}
                                mini={true}
                                onClick={() => {
                                    settModalVerdi(initiellModalVerdi);
                                    history.push(`/fagsak/${fagsak.id}/saksoversikt`);
                                }}
                                children={'Gå til saksoversikten'}
                            />,
                            <Knapp
                                key={'oppgavebenk'}
                                type={'hoved'}
                                mini={true}
                                onClick={() => {
                                    settModalVerdi(initiellModalVerdi);
                                    history.push('/oppgaver');
                                }}
                                children={'Gå til oppgavebenken'}
                            />,
                        ],
                    }}
                >
                    <TotrinnskontrollModalInnhold beslutning={modalVerdi.beslutning} />
                </UIModalWrapper>
            )}
        </>
    );
};

export default Totrinnskontroll;
