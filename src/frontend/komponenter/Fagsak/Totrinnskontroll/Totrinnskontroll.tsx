import * as React from 'react';
import { BehandlingStatus, IBehandling } from '../../../typer/behandling';
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

interface IProps {
    aktivBehandling: IBehandling | undefined;
    fagsak: IFagsak;
}

const Totrinnskontroll: React.FunctionComponent<IProps> = ({ aktivBehandling, fagsak }) => {
    const { axiosRequest } = useApp();
    const { settFagsak } = useFagsakRessurser();

    const [innsendtVedtak, settInnsendtVedtak] = React.useState<Ressurs<IFagsak>>(byggTomRessurs());
    const [skalViseModal, settSkalViseModal] = React.useState<boolean>(false);
    React.useEffect(() => {
        settSkalViseModal(innsendtVedtak.status === RessursStatus.SUKSESS);
    }, [innsendtVedtak.status]);

    const skalViseSkjema = aktivBehandling?.status === BehandlingStatus.SENDT_TIL_BESLUTTER;

    const sendInnVedtak = (totrinnskontrollData: ITotrinnskontrollData) => {
        settInnsendtVedtak(byggHenterRessurs());
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
                .catch((_error: AxiosError) => {
                    settInnsendtVedtak(byggFeiletRessurs('Ukjent feil, sende inn vedtak.', _error));
                });
        }
    };

    return (
        <div className="totrinnskontroll">
            {skalViseSkjema && (
                <>
                    <div className="totrinnskontroll-tittel">
                        <Info className="ikon" />
                        <Systemtittel>Totrinnskontroll</Systemtittel>
                    </div>
                    <Totrinnskontrollskjema
                        sendInnVedtak={sendInnVedtak}
                        innsendtVedtak={innsendtVedtak}
                    />
                </>
            )}
            {skalViseModal && (
                <UIModalWrapper
                    modal={{
                        tittel: 'Beslutning innsendt',
                        content: 'Din beslutning er innsendt',
                        lukkKnapp: true,
                        onClose: () => settSkalViseModal(false),
                        visModal: skalViseModal,
                    }}
                />
            )}
        </div>
    );
};

export default Totrinnskontroll;
