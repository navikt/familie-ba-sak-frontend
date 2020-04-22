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
import { ITotrinnskontrollData, TotrinnskontrollStatus } from '../../../typer/totrinnskontroll';
import Info from '../../../ikoner/Info';

interface IProps {
    aktivBehandling: IBehandling | undefined;
    fagsak: IFagsak;
}

const Totrinnskontroll: React.FunctionComponent<IProps> = ({ aktivBehandling, fagsak }) => {
    const { axiosRequest } = useApp();
    const { settFagsak } = useFagsakRessurser();

    const [innsendtVedtak, settInnsendtVedtak] = React.useState<Ressurs<IFagsak>>(byggTomRessurs());

    const skalViseSkjema = aktivBehandling?.status === BehandlingStatus.SENDT_TIL_BESLUTTER;

    const sendInnVedtak = (totrinnskontrollData: ITotrinnskontrollData) => {
        settInnsendtVedtak(byggHenterRessurs());
        const manglerBegrunnelse =
            totrinnskontrollData.status === TotrinnskontrollStatus.UNDERKJENT &&
            !totrinnskontrollData.begrunnelse;
        if (totrinnskontrollData.status === TotrinnskontrollStatus.IKKE_VURDERT) {
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
            <div className="totrinnskontroll-tittel">
                <Info className="ikon" />
                <Systemtittel>Totrinnskontroll</Systemtittel>
            </div>
            {skalViseSkjema && (
                <Totrinnskontrollskjema
                    sendInnVedtak={sendInnVedtak}
                    innsendtVedtak={innsendtVedtak}
                />
            )}
        </div>
    );
};

export default Totrinnskontroll;
