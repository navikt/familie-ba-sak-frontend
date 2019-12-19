import * as moment from 'moment';
import { Nesteknapp } from 'nav-frontend-ikonknapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';

import { axiosRequest } from '../../../api/axios';
import { IBehandling, IFagsak, IVedtakForBehandling } from '../../../typer/fagsak';
import { Valideringsstatus } from '../../../typer/felt';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
import {
    actions as fagsakActions,
    useFagsakContext,
    useFagsakDispatch,
} from '../../FagsakProvider';
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
    const fagsakDispatch = useFagsakDispatch();
    const fagsakContext = useFagsakContext().fagsak;
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const aktivBehandling = fagsak.behandlinger.find(
        (behandling: IBehandling) => behandling.aktiv === true
    );

    React.useEffect(() => {
        if (aktivBehandling) {
            const aktivVedtak = aktivBehandling.vedtakForBehandling.find(
                (vedtak: IVedtakForBehandling) => vedtak.aktiv === true
            );

            if (aktivVedtak) {
                aktivVedtak.barnasBeregning?.map((barnBeregning, index) => {
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
        }
    }, [aktivBehandling]);

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
                opprettelseFeilmelding={opprettelseFeilmelding}
                visFeilmeldinger={visFeilmeldinger}
            />

            <Nesteknapp
                spinner={context.senderInn}
                onClick={() => {
                    if (
                        context.barnasBeregning.find(
                            barnBeregning =>
                                barnBeregning.valideringsstatus !== Valideringsstatus.OK
                        ) === undefined
                    ) {
                        dispatch({ type: actions.SETT_SENDER_INN, payload: true });
                        axiosRequest<IVedtakForBehandling>({
                            data: {
                                barnasBeregning: context.barnasBeregning.map(barnBeregning => ({
                                    beløp: barnBeregning.verdi.beløp,
                                    fødselsnummer: barnBeregning.verdi.barn,
                                    stønadFom: moment(
                                        barnBeregning.verdi.stønadFom,
                                        'DD.MM.YY',
                                        true
                                    ).format('YYYY-MM-DD'),
                                })),
                                sakstype: context.sakstype,
                            },
                            method: 'POST',
                            url: `/familie-ba-sak/api/fagsak/${fagsak.id}/nytt-vedtak`,
                        })
                            .then((response: Ressurs<IVedtakForBehandling>) => {
                                dispatch({ type: actions.SETT_SENDER_INN, payload: false });
                                if (response.status === RessursStatus.SUKSESS) {
                                    fagsakDispatch({
                                        payload: {
                                            ...fagsakContext,
                                            data: {
                                                ...fagsakContext.data,
                                                behandlinger: fagsak.behandlinger.map(b => {
                                                    return !b.aktiv
                                                        ? b
                                                        : {
                                                              ...b,
                                                              vedtakForBehandling: [
                                                                  ...b.vedtakForBehandling,
                                                                  {
                                                                      aktiv: response.data.aktiv,
                                                                      ansvarligSaksbehandler:
                                                                          response.data
                                                                              .ansvarligSaksbehandler,
                                                                      barnasBeregning: [], // not included in the response
                                                                      stønadFom:
                                                                          response.data.stønadFom,
                                                                      stønadTom:
                                                                          response.data.stønadTom,
                                                                      vedtaksdato:
                                                                          response.data.vedtaksdato,
                                                                  },
                                                              ],
                                                          };
                                                }),
                                            },
                                        },
                                        type: fagsakActions.SETT_FAGSAK,
                                    });
                                    history.push(`/fagsak/${fagsak.id}/vedtak`);
                                } else if (response.status === RessursStatus.FEILET) {
                                    settOpprettelseFeilmelding(response.melding);
                                    settVisFeilmeldinger(true);
                                } else {
                                    settOpprettelseFeilmelding('Opprettelse av vedtak feilet');
                                    settVisFeilmeldinger(true);
                                }
                            })
                            .catch(() => {
                                dispatch({ type: actions.SETT_SENDER_INN, payload: false });
                                settOpprettelseFeilmelding('Opprettelse av vedtak feilet');
                            });
                    } else {
                        settVisFeilmeldinger(true);
                    }
                }}
            />
        </div>
    );
};

export default FastsettVedtak;
