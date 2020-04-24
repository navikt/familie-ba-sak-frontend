import * as React from 'react';
import { BehandlerRolle, BehandlingStatus, IBehandling } from '../../../typer/behandling';
import { Systemtittel } from 'nav-frontend-typografi';
import { IFagsak } from '../../../typer/fagsak';
import {
    byggFeiletRessurs,
    byggHenterRessurs,
    byggTomRessurs,
    Ressurs,
    RessursStatus,
} from '../../../typer/ressurs';
import { useApp } from '../../../context/AppContext';
import { useFagsakRessurser } from '../../../context/FagsakContext';
import { AxiosError } from 'axios';
import Totrinnskontrollskjema from './Totrinnskontrollskjema';
import { ITotrinnskontrollData, TotrinnskontrollBeslutning } from '../../../typer/totrinnskontroll';
import Info from '../../../ikoner/Info';
import UIModalWrapper from '../../Felleskomponenter/Modal/UIModalWrapper';
import { Knapp } from 'nav-frontend-knapper';
import { useHistory } from 'react-router';
import TotrinnskontrollModalInnhold from './TotrinnskontrollModalInnhold';

interface IProps {
    aktivBehandling: IBehandling | undefined;
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

const Totrinnskontroll: React.FunctionComponent<IProps> = ({ aktivBehandling, fagsak }) => {
    const { axiosRequest, hentSaksbehandlerRolle } = useApp();
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
        aktivBehandling?.status === BehandlingStatus.SENDT_TIL_BESLUTTER;

    const sendInnVedtak = (totrinnskontrollData: ITotrinnskontrollData) => {
        settInnsendtVedtak(byggHenterRessurs());
        settModalVerdi({ ...modalVerdi, beslutning: totrinnskontrollData.beslutning });
        const manglerBegrunnelse =
            totrinnskontrollData.beslutning === TotrinnskontrollBeslutning.UNDERKJENT &&
            !totrinnskontrollData.begrunnelse;
        if (totrinnskontrollData.beslutning === TotrinnskontrollBeslutning.IKKE_VURDERT) {
            settInnsendtVedtak(byggFeiletRessurs('Du må gjøre et valg'));
        } else if (manglerBegrunnelse) {
            settInnsendtVedtak(byggFeiletRessurs('Mangler begrunnelse'));
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
            {skalViseSkjema && (
                <div className="totrinnskontroll">
                    <div className="totrinnskontroll-tittel">
                        <Info className="ikon" />
                        <Systemtittel>Totrinnskontroll</Systemtittel>
                    </div>
                    <Totrinnskontrollskjema
                        sendInnVedtak={sendInnVedtak}
                        innsendtVedtak={innsendtVedtak}
                    />
                </div>
            )}
            {modalVerdi && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Totrinnsvurdering',
                        content: (
                            <TotrinnskontrollModalInnhold beslutning={modalVerdi.beslutning} />
                        ),
                        lukkKnapp: false,
                        visModal: modalVerdi.skalVises,
                        actions: [
                            <Knapp
                                mini={true}
                                onClick={() => {
                                    settModalVerdi(initiellModalVerdi);
                                    history.push(`/fagsak/${fagsak.id}/saksoversikt`);
                                }}
                                children={'Gå til saksoversikten'}
                            />,
                            <Knapp
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
                />
            )}
        </div>
    );
};

export default Totrinnskontroll;
