import React from 'react';
import { Route, Switch, useParams } from 'react-router';
import { SøknadProvider } from '../../context/SøknadContext';
import { VilkårsvurderingProvider } from '../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { IFagsak } from '../../typer/fagsak';
import RegistrerSøknad from './Søknad/RegistrerSøknad';
import TilkjentYtelse from './TilkjentYtelse/TilkjentYtelse';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';
import Vilkårsvurdering from './Vilkårsvurdering/Vilkårsvurdering';
import { useBehandling } from '../../context/BehandlingContext';

interface IProps {
    fagsak: IFagsak;
}

const BehandlingContainer: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { behandlingId } = useParams();
    const { bestemÅpenBehandling } = useBehandling();
    React.useEffect(() => {
        bestemÅpenBehandling(behandlingId);
    }, [fagsak.status, behandlingId]);

    return (
        <Switch>
            <Route
                exact={true}
                path="/fagsak/:fagsakId/:behandlingId/registrer-soknad"
                render={() => {
                    return (
                        <SøknadProvider>
                            <RegistrerSøknad />
                        </SøknadProvider>
                    );
                }}
            />
            <Route
                exact={true}
                path="/fagsak/:fagsakId/:behandlingId/vilkaarsvurdering"
                render={() => {
                    return (
                        <VilkårsvurderingProvider>
                            <Vilkårsvurdering fagsak={fagsak} />
                        </VilkårsvurderingProvider>
                    );
                }}
            />
            <Route
                exact={true}
                path="/fagsak/:fagsakId/:behandlingId/tilkjent-ytelse"
                render={() => {
                    return <TilkjentYtelse fagsak={fagsak} />;
                }}
            />
            <Route
                exact={true}
                path="/fagsak/:fagsakId/:behandlingId/vedtak"
                render={() => {
                    return <OppsummeringVedtak fagsak={fagsak} />;
                }}
            />
        </Switch>
    );
};

export default BehandlingContainer;
