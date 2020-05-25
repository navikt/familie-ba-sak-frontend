import { AxiosError } from 'axios';
import { Knapp } from 'nav-frontend-knapper';
import * as React from 'react';
import { useHistory } from 'react-router';
import { useApp } from '../../../context/AppContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { BehandlerRolle, BehandlingStatus, IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '../../../typer/ressurs';
import { ITotrinnskontrollData, TotrinnskontrollBeslutning } from '../../../typer/totrinnskontroll';
import { hentAktivBehandlingPåFagsak, hentAktivVedtakPåBehandlig } from '../../../utils/fagsak';
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
    const { axiosRequest, hentSaksbehandlerRolle, innloggetSaksbehandler } = useApp();
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
        åpenBehandling?.status === BehandlingStatus.SENDT_TIL_BESLUTTER &&
        history.location.pathname.includes('vedtak');

    const kanBeslutte =
        innloggetSaksbehandler?.email !== hentAktivBehandlingPåFagsak(fagsak)?.endretAv ?? false;

    const ansvarligSaksbehandler = åpenBehandling
        ? hentAktivVedtakPåBehandlig(åpenBehandling)?.ansvarligSaksbehandler
        : 'UKJENT SAKSBEHANDLER';

    const opprettetTidspunkt = hentAktivBehandlingPåFagsak(fagsak)?.opprettetTidspunkt;

    const sendInnVedtak = (totrinnskontrollData: ITotrinnskontrollData) => {
        settInnsendtVedtak(byggHenterRessurs());
        settModalVerdi({ ...modalVerdi, beslutning: totrinnskontrollData.beslutning });
        const manglerBegrunnelse =
            totrinnskontrollData.beslutning === TotrinnskontrollBeslutning.UNDERKJENT &&
            !totrinnskontrollData.begrunnelse;
        if (totrinnskontrollData.beslutning === TotrinnskontrollBeslutning.IKKE_VURDERT) {
            settInnsendtVedtak(
                byggFeiletRessurs(
                    'Totrinnskontroll ikke vurdert ved innsending',
                    'Du må gjøre et valg'
                )
            );
        } else if (manglerBegrunnelse) {
            settInnsendtVedtak(
                byggFeiletRessurs('Mangler begrunnelse ved innsending', 'Mangler begrunnelse')
            );
        } else {
            axiosRequest<IFagsak, ITotrinnskontrollData>({
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
                .catch((error: AxiosError) => {
                    settInnsendtVedtak(byggFeiletRessurs('Ukjent feil, sende inn vedtak.', error));
                });
        }
    };

    return (
        <div>
            {skalViseSkjema &&
                (kanBeslutte ? (
                    <Totrinnskontrollskjema
                        sendInnVedtak={sendInnVedtak}
                        innsendtVedtak={innsendtVedtak}
                    />
                ) : (
                    <TotrinnskontrollSendtTilBeslutterSkjema
                        ansvarligSaksbehandler={ansvarligSaksbehandler}
                        opprettetTidspunkt={opprettetTidspunkt}
                    />
                ))}
            {modalVerdi && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Totrinnsvurdering',
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
                                children={'Gå til Oppgavebenken'}
                            />,
                        ],
                    }}
                >
                    <TotrinnskontrollModalInnhold beslutning={modalVerdi.beslutning} />
                </UIModalWrapper>
            )}
        </div>
    );
};

export default Totrinnskontroll;
