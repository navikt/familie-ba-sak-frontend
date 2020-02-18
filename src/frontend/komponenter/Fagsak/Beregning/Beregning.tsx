import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { IBehandling, IFagsak, IVedtakForBehandling } from '../../../typer/fagsak';
import { useBeregningContext, useBeregningDispatch, actions } from './BeregningProvider';
import BeregningSkjema from './BeregningSkjema';
import useFagsakApi from '../useFagsakApi';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import moment = require('moment');
import { useHistory } from 'react-router';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { datoformat } from '../../../utils/formatter';

interface IProps {
    fagsak: IFagsak;
}

const Beregning: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const history = useHistory();
    const context = useBeregningContext();
    const dispatch = useBeregningDispatch();
    const [skjemaetHarEndringer, settSkjemaetHarEndringer] = React.useState(false);

    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');

    const { opprettBeregning, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

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
                            stønadFom: moment(barnBeregning.stønadFom).format(datoformat.MÅNED),
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
        <div className={'beregning'}>
            <Skjemasteg
                tittel={'Beregning'}
                forrigeOnClick={() => {
                    history.push(`/fagsak/${fagsak.id}/vilkår`);
                }}
                nesteOnClick={() => {
                    opprettBeregning(context, skjemaetHarEndringer, fagsak);
                }}
                nesteKnappTittel={skjemaetHarEndringer ? 'Lagre og gå neste' : 'Neste'}
                senderInn={senderInn}
            >
                {aktivVedtak?.barnasBeregning.length !== 0 && (
                    <>
                        <br />
                        <AlertStripeAdvarsel
                            children={
                                'Det finnes allerede en beregning på behandlingen. Vi har fylt ut gjeldende beregning.'
                            }
                        />
                        <br />
                    </>
                )}

                <BeregningSkjema
                    aktivVedtak={aktivVedtak}
                    opprettelseFeilmelding={opprettelseFeilmelding}
                    settSkjemaetHarEndringer={settSkjemaetHarEndringer}
                    visFeilmeldinger={visFeilmeldinger}
                />
            </Skjemasteg>
        </div>
    );
};

export default Beregning;
