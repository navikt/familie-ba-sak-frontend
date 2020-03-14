import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';

import { IBehandling } from '../../../typer/behandling';
import { IFagsak } from '../../../typer/fagsak';
import { IVedtakForBehandling } from '../../../typer/vedtak';
import { datoformat } from '../../../utils/formatter';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import { actions, useBeregningContext, useBeregningDispatch } from './BeregningProvider';
import BeregningSkjema from './BeregningSkjema';

import moment = require('moment');
import { IFelt } from '../../../typer/felt';
import { IPersonBeregning } from '../../../typer/behandle';

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
            aktivVedtak.personBeregninger.map((personBeregning, index) => {
                dispatch({
                    payload: {
                        index,
                        oppdatertPersonBeregning: {
                            ...personBeregning,
                            stønadFom: moment(personBeregning.stønadFom).format(datoformat.MÅNED),
                            stønadTom: moment(personBeregning.stønadTom).format(datoformat.MÅNED),
                        },
                    },
                    type: actions.SETT_PERSON_BEREGNINGER,
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
                {aktivVedtak && aktivVedtak.personBeregninger.length !== 0 && (
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
