import { useState } from 'react';
import { useHistory } from 'react-router';
import { useFagsakDispatch, actions as fagsakActions } from '../FagsakProvider';
import { apiOpprettBehandling, IOpprettBehandlingData, apiOpprettVedtak } from '../../api/fagsak';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { IFagsak, VedtakResultat } from '../../typer/fagsak';
import { IState as IOpprettBehandlingState } from './Opprett/OpprettBehandlingProvider';
import { IState as IBehandleVilkårState } from './Vilkår/BehandleVilkårProvider';
import { Valideringsstatus } from '../../typer/felt';

const useFagsakApi = (
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void,
    settFeilmelding: (feilmelding: string) => void
) => {
    const history = useHistory();
    const [senderInn, settSenderInn] = useState(false);

    const fagsakDispatcher = useFagsakDispatch();

    const opprettBehandling = (
        context: IOpprettBehandlingState,
        data: IOpprettBehandlingData,
        redirect: string
    ) => {
        if (
            process.env.NODE_ENV === 'development' ||
            (context.søkersFødselsnummer.valideringsstatus === Valideringsstatus.OK &&
                context.barnasFødselsnummer.find(
                    barnFødselsnummer =>
                        barnFødselsnummer.valideringsstatus !== Valideringsstatus.OK
                ) === undefined)
        ) {
            settSenderInn(true);
            apiOpprettBehandling(data)
                .then((response: Ressurs<IFagsak>) => {
                    settSenderInn(false);
                    if (response.status === RessursStatus.SUKSESS) {
                        fagsakDispatcher({
                            payload: response,
                            type: fagsakActions.SETT_FAGSAK,
                        });
                        history.push(`/fagsak/${response.data.id}/${redirect}`);
                        return;
                    } else if (response.status === RessursStatus.FEILET) {
                        settVisFeilmeldinger(true);
                        settFeilmelding(response.melding);
                    } else {
                        settVisFeilmeldinger(true);
                        settFeilmelding('Opprettelse av behandling feilet');
                    }
                })
                .catch(() => {
                    settSenderInn(false);
                    settVisFeilmeldinger(true);
                    settFeilmelding('Opprettelse av behandling feilet');
                });
        } else {
            settVisFeilmeldinger(true);
        }
    };

    const opprettVedtak = (context: IBehandleVilkårState, fagsak: IFagsak) => {
        settSenderInn(true);
        apiOpprettVedtak(fagsak.id, { resultat: context.vedtakResultat })
            .then((response: Ressurs<any>) => {
                settSenderInn(false);
                if (response.status === RessursStatus.SUKSESS) {
                    fagsakDispatcher({
                        payload: response,
                        type: fagsakActions.SETT_FAGSAK,
                    });

                    if (context.vedtakResultat == VedtakResultat.INNVILGET) {
                        history.push(`/fagsak/${fagsak.id}/behandle`);
                    } else if (context.vedtakResultat == VedtakResultat.AVSLÅTT) {
                        history.push(`/fagsak/${fagsak.id}/vedtak`);
                    } else {
                        settFeilmelding('Internal error: invalid vedtak result');
                        settVisFeilmeldinger(true);
                    }
                } else if (response.status === RessursStatus.FEILET) {
                    settFeilmelding(response.melding);
                    settVisFeilmeldinger(true);
                } else {
                    settFeilmelding('Opprettelse av vedtak feilet');
                    settVisFeilmeldinger(true);
                }
            })
            .catch(() => {
                settSenderInn(false);
                settFeilmelding('Opprettelse av vedtak feilet');
            });
    };

    return {
        opprettBehandling,
        opprettVedtak,
        senderInn,
    };
};

export default useFagsakApi;
