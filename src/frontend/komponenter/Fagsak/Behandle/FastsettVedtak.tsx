import * as moment from 'moment';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Nesteknapp } from 'nav-frontend-ikonknapper';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { axiosRequest } from '../../../api/axios';
import { IBehandling, IFagsak } from '../../../typer/fagsak';
import { Valideringsstatus } from '../../../typer/felt';
import { Ressurs, RessursStatus } from '../../../typer/ressurs';
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

    const aktivBehandling = fagsak.behandlinger.find(
        (behandling: IBehandling) => behandling.aktiv === true
    );

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
            {aktivBehandling.vedtakForBehandling.length > 0 && (
                <AlertStripeAdvarsel>
                    <Normaltekst>{`OBS! På denne behandlingen finnes det allerede et vedtak. Siste vedtak ble opprettet ${
                        aktivBehandling.vedtakForBehandling.filter(vedtak => vedtak.aktiv)[0]
                            .vedtaksdato
                    }.`}</Normaltekst>
                </AlertStripeAdvarsel>
            )}

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
                        axiosRequest<IFagsak>({
                            data: {
                                barnasBeregning: context.barnasBeregning.map(barnBeregning => ({
                                    beløp: barnBeregning.verdi.beløp,
                                    fødselsnummer: barnBeregning.verdi.barn,
                                    stønadFom: moment(
                                        barnBeregning.verdi.startDato,
                                        'DD.MM.YY'
                                    ).toISOString(),
                                })),
                                sakstype: context.sakstype,
                            },
                            method: 'POST',
                            url: `/familie-ba-sak/api/fagsak/${fagsak.id}/nytt-vedtak`,
                        })
                            .then((response: Ressurs<any>) => {
                                dispatch({ type: actions.SETT_SENDER_INN, payload: false });

                                if (response.status === RessursStatus.SUKSESS) {
                                    history.push(`/fagsak/${fagsak.id}/vedtak`);
                                } else if (response.status === RessursStatus.FEILET) {
                                    settOpprettelseFeilmelding(response.melding);
                                } else {
                                    settOpprettelseFeilmelding('Opprettelse av vedtak feilet');
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
