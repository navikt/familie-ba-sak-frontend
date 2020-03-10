import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';

import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import {
    actions, useBehandlingVilkårContext, useBehandlingVilkårDispatch
} from './BehandleVilkårProvider';
import BehandlingVilkårSkjema from './BehandleVilkårSkjema';

interface IProps {
    fagsak: IFagsak;
}

const BehandleVilkår: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const context = useBehandlingVilkårContext();
    const dispatch = useBehandlingVilkårDispatch();
    const [visFeilmeldinger, settVisFeilmeldinger] = React.useState(false);
    const [opprettelseFeilmelding, settOpprettelseFeilmelding] = React.useState('');
    const history = useHistory();
    const { opprettVedtak, senderInn } = useFagsakApi(
        settVisFeilmeldinger,
        settOpprettelseFeilmelding
    );

    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    React.useEffect(() => {
        if (aktivBehandling && aktivBehandling.samletVilkårResultat.length !== 0) {
            dispatch({
                type: actions.SETT_SAMLET_VILKÅRS_RESULTAT,
                payload: aktivBehandling.samletVilkårResultat,
            });
            dispatch({
                type: actions.SETT_RESULTAT,
                payload: aktivBehandling.resultat,
            });
            dispatch({
                type: actions.SETT_BEGRUNNELSE,
                payload: aktivBehandling.begrunnelse,
            });
        }
    }, [fagsak]);

    if (!aktivBehandling) {
        return (
            <div>
                <Normaltekst>Ingen aktiv behandling</Normaltekst>
            </div>
        );
    }

    if (context.samletVilkårResultat.length === 0) {
        return <div>Finner ingen vilkår på behandlingen. Det er sansynligvis noe feil.</div>;
    }

    return (
        <div className={'vilkår'}>
            <Skjemasteg
                tittel={'Vilkår'}
                forrigeOnClick={() => {
                    history.push(`/fagsak/${fagsak.id}/ny-behandling`);
                }}
                nesteOnClick={() => {
                    opprettVedtak(context, fagsak);
                }}
                senderInn={senderInn}
            >
                {aktivBehandling.samletVilkårResultat.length !== 0 && (
                    <>
                        <br />
                        <AlertStripeAdvarsel
                            children={
                                'Det finnes allerede en vilkårsvurdering på behandlingen. Vi har fylt ut gjeldende vurdering.'
                            }
                        />
                        <br />
                    </>
                )}

                <BehandlingVilkårSkjema
                    opprettelseFeilmelding={opprettelseFeilmelding}
                    visFeilmeldinger={visFeilmeldinger}
                    behandlingstype={aktivBehandling.type}
                />
            </Skjemasteg>
        </div>
    );
};

export default BehandleVilkår;
