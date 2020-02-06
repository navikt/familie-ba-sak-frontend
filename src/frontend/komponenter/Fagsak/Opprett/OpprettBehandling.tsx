import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { axiosRequest } from '../../../api/axios';
import { IFagsak } from '../../../typer/fagsak';
import { Valideringsstatus } from '../../../typer/felt';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { actions as fagsakActions, useFagsakDispatch } from '../../FagsakProvider';
import {
    actions,
    useOpprettBehandlingContext,
    useOpprettBehandlingDispatch,
} from './OpprettBehandlingProvider';
import OpprettBehandlingSkjema from './OpprettBehandlingSkjema';

const OpprettBehandling: React.FunctionComponent = () => {
    const fagsakDispatcher = useFagsakDispatch();

    const history = useHistory();
    const context = useOpprettBehandlingContext();
    const dispatch = useOpprettBehandlingDispatch();
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    return (
        <div className={'opprett'}>
            <Systemtittel children={'Opprett behandling'} />

            <OpprettBehandlingSkjema
                opprettelseFeilmelding={opprettelseFeilmelding}
                visFeilmeldinger={visFeilmeldinger}
            />

            <div className={'opprett__navigering'}>
                <Knapp
                    type={'hoved'}
                    spinner={context.senderInn}
                    onClick={() => {
                        if (
                            process.env.NODE_ENV === 'development' ||
                            (context.søkersFødselsnummer.valideringsstatus ===
                                Valideringsstatus.OK &&
                                context.barnasFødselsnummer.find(
                                    barnFødselsnummer =>
                                        barnFødselsnummer.valideringsstatus !== Valideringsstatus.OK
                                ) === undefined)
                        ) {
                            dispatch({ type: actions.SETT_SENDER_INN, payload: true });
                            axiosRequest<IFagsak>({
                                data: {
                                    barnasFødselsnummer: context.barnasFødselsnummer.map(
                                        barnFødselsnummer => barnFødselsnummer.verdi
                                    ),
                                    behandlingType: context.behandlingstype,
                                    fødselsnummer: context.søkersFødselsnummer.verdi,
                                    journalpostID: '1234',
                                },
                                method: 'POST',
                                url: '/familie-ba-sak/api/behandling/opprett',
                            })
                                .then((response: Ressurs<IFagsak>) => {
                                    dispatch({ type: actions.SETT_SENDER_INN, payload: false });
                                    if (response.status === RessursStatus.SUKSESS) {
                                        fagsakDispatcher({
                                            payload: response,
                                            type: fagsakActions.SETT_FAGSAK,
                                        });
                                        history.push(`/fagsak/${response.data.id}/behandle`);
                                    } else if (response.status === RessursStatus.FEILET) {
                                        settVisFeilmeldinger(true);
                                        settOpprettelseFeilmelding(response.melding);
                                    } else {
                                        settVisFeilmeldinger(true);
                                        settOpprettelseFeilmelding(
                                            'Opprettelse av behandling feilet'
                                        );
                                    }
                                })
                                .catch(() => {
                                    dispatch({ type: actions.SETT_SENDER_INN, payload: false });
                                    settVisFeilmeldinger(true);
                                    settOpprettelseFeilmelding('Opprettelse av behandling feilet');
                                });
                        } else {
                            settVisFeilmeldinger(true);
                        }
                    }}
                    children={'Neste'}
                />
            </div>
        </div>
    );
};

export default OpprettBehandling;
