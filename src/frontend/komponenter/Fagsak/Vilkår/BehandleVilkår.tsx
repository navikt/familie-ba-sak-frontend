import * as React from 'react';
import { IFagsak, IBehandling, IVedtakForBehandling } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import useFagsakApi from '../useFagsakApi';
import {
    useBehandlingVilkårContext,
    useBehandlingVilkårDispatch,
    actions,
} from './BehandleVilkårProvider';
import BehandlingVilkårSkjema from './BehandleVilkårSkjema';
import { useHistory } from 'react-router';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';

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

    const aktivBehandling = fagsak.behandlinger.find((behandling: IBehandling) => behandling.aktiv);
    const aktivVedtak = aktivBehandling?.vedtakForBehandling?.find(
        (vedtak: IVedtakForBehandling) => vedtak.aktiv
    );

    React.useEffect(() => {
        if (aktivBehandling && aktivBehandling.samletVilkårResultat) {
            dispatch({
                type: actions.SETT_SAMLET_VILKÅRS_RESULTAT,
                payload: aktivBehandling.samletVilkårResultat,
            });
            dispatch({
                type: actions.SETT_RESULTAT,
                payload: aktivBehandling.vedtakForBehandling.find(
                    (vedtak: IVedtakForBehandling) => vedtak.aktiv
                )?.resultat,
            });
        }

        if (aktivVedtak && aktivVedtak.begrunnelse) {
            dispatch({
                type: actions.SETT_BEGRUNNELSE,
                payload: aktivVedtak.begrunnelse,
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
                    history.push(`/fagsak/opprett`);
                }}
                nesteOnClick={() => {
                    opprettVedtak(context, fagsak);
                }}
                senderInn={senderInn}
            >
                {aktivBehandling.samletVilkårResultat && (
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
                />
            </Skjemasteg>
        </div>
    );
};

export default BehandleVilkår;
