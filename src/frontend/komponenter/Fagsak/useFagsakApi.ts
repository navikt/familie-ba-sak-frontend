import { useState } from 'react';
import { useHistory } from 'react-router';
import { useFagsakDispatch, actions as fagsakActions } from '../FagsakProvider';
import { apiOpprettBehandling, IOpprettBehandlingData } from '../../api/fagsak';
import { Ressurs, RessursStatus } from '../../typer/ressurs';
import { IFagsak } from '../../typer/fagsak';
import { useOpprettBehandlingContext } from './Opprett/OpprettBehandlingProvider';
import { Valideringsstatus } from '../../typer/felt';

const useFagsakApi = (
    settVisFeilmeldinger: (visFeilmeldinger: boolean) => void,
    settFeilmelding: (feilmelding: string) => void
) => {
    const history = useHistory();
    const [senderInn, settSenderInn] = useState(false);

    const fagsakDispatcher = useFagsakDispatch();
    const context = useOpprettBehandlingContext();

    const opprettBehandling = (data: IOpprettBehandlingData, redirect: string) => {
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

    return {
        opprettBehandling,
        senderInn,
    };
};

export default useFagsakApi;
