import * as moment from 'moment';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { axiosRequest } from '../../../api/axios';
import { IBehandling, IFagsak, IVedtakForBehandling } from '../../../typer/fagsak';
import { Valideringsstatus } from '../../../typer/felt';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import { actions as fagsakActions, useFagsakDispatch } from '../../FagsakProvider';
import {
    actions,
    useFastsettVedtakContext,
    useFastsettVedtakDispatch,
} from './FastsettVedtakProvider';
import FastsettVedtakSkjema from './FastsettVedtakSkjema';

interface IProps {
    fagsak: IFagsak;
}

const FastsettVedtak: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const history = useHistory();
    const context = useFastsettVedtakContext();
    const dispatch = useFastsettVedtakDispatch();
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const [skjemaetHarEndringer, settSkjemaetHarEndringer] = React.useState(false);
    const fagsakDispatch = useFagsakDispatch();

    const aktivBehandling = fagsak.behandlinger.find(
        (behandling: IBehandling) => behandling.aktiv === true
    );

    const aktivVedtak = aktivBehandling
        ? aktivBehandling.vedtakForBehandling.find(
              (vedtak: IVedtakForBehandling) => vedtak.aktiv === true
          )
        : undefined;

    React.useEffect(() => {
        if (aktivVedtak) {
            aktivVedtak.barnasBeregning.map((barnBeregning, index) => {
                dispatch({
                    payload: {
                        index,
                        oppdatertBarnBeregning: {
                            ...barnBeregning,
                            stønadFom: moment(barnBeregning.stønadFom).format('DD.MM.YY'),
                        },
                    },
                    type: actions.SETT_BARNAS_BEREGNING,
                });
            });
        }
    }, []);

    if (!aktivBehandling) {
        return (
            <div>
                <Normaltekst>Ingen aktiv behandling</Normaltekst>
            </div>
        );
    }

    return (
        <div className={'fastsett'}>
            <Systemtittel children={'Behandle sak'} />

            <br />

            <Normaltekst children={`Søker: ${fagsak.søkerFødselsnummer}`} />
            {aktivBehandling.barnasFødselsnummer.map(barn => {
                return <Normaltekst key={barn} children={`Barn: ${barn}`} />;
            })}

            <FastsettVedtakSkjema
                aktivVedtak={aktivVedtak}
                opprettelseFeilmelding={opprettelseFeilmelding}
                settSkjemaetHarEndringer={settSkjemaetHarEndringer}
                visFeilmeldinger={visFeilmeldinger}
            />

            <div className={'fastsett__navigering'}>
                <Knapp
                    type={'hoved'}
                    onClick={() => {
                        history.push(`/fagsak/opprett`);
                    }}
                    children={'Tilbake'}
                />
                <Knapp
                    type={'hoved'}
                    spinner={context.senderInn}
                    onClick={() => {
                        if (
                            context.barnasBeregning.find(
                                barnBeregning =>
                                    barnBeregning.valideringsstatus !== Valideringsstatus.OK
                            ) === undefined
                        ) {
                            if (skjemaetHarEndringer) {
                                dispatch({ type: actions.SETT_SENDER_INN, payload: true });
                                axiosRequest<IFagsak>({
                                    data: {
                                        barnasBeregning: context.barnasBeregning.map(
                                            barnBeregning => ({
                                                beløp: barnBeregning.verdi.beløp,
                                                fødselsnummer: barnBeregning.verdi.barn,
                                                stønadFom: moment(
                                                    barnBeregning.verdi.stønadFom,
                                                    'DD.MM.YY',
                                                    true
                                                ).format('YYYY-MM-DD'),
                                            })
                                        ),
                                        sakstype: context.sakstype,
                                    },
                                    method: 'POST',
                                    url: `/familie-ba-sak/api/fagsak/${fagsak.id}/nytt-vedtak`,
                                })
                                    .then((response: Ressurs<any>) => {
                                        dispatch({ type: actions.SETT_SENDER_INN, payload: false });
                                        if (response.status === RessursStatus.SUKSESS) {
                                            fagsakDispatch({
                                                payload: response,
                                                type: fagsakActions.SETT_FAGSAK,
                                            });
                                            history.push(`/fagsak/${fagsak.id}/vedtak`);
                                        } else if (response.status === RessursStatus.FEILET) {
                                            settOpprettelseFeilmelding(response.melding);
                                            settVisFeilmeldinger(true);
                                        } else {
                                            settOpprettelseFeilmelding(
                                                'Opprettelse av vedtak feilet'
                                            );
                                            settVisFeilmeldinger(true);
                                        }
                                    })
                                    .catch(() => {
                                        dispatch({ type: actions.SETT_SENDER_INN, payload: false });
                                        settOpprettelseFeilmelding('Opprettelse av vedtak feilet');
                                    });
                            } else {
                                history.push(`/fagsak/${fagsak.id}/vedtak`);
                            }
                        } else {
                            settVisFeilmeldinger(true);
                        }
                    }}
                    children={skjemaetHarEndringer ? 'Lagre og gå neste' : 'Neste'}
                />
            </div>
        </div>
    );
};

export default FastsettVedtak;
