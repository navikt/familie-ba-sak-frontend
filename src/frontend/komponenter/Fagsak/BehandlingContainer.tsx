import React from 'react';
import { Route, Switch } from 'react-router';
import { BehandlingProvider } from '../../context/BehandlingContext';
import { SøknadProvider } from '../../context/SøknadContext';
import { VilkårsvurderingProvider } from '../../context/Vilkårsvurdering/VilkårsvurderingContext';
import { IFagsak } from '../../typer/fagsak';
import RegistrerSøknad from './Søknad/RegistrerSøknad';
import TilkjentYtelse from './TilkjentYtelse/TilkjentYtelse';
import OppsummeringVedtak from './Vedtak/OppsummeringVedtak';
import Vilkårsvurdering from './Vilkårsvurdering/Vilkårsvurdering';

interface IProps {
    fagsak: IFagsak;
}

const BehandlingContainer: React.FunctionComponent<IProps> = ({ fagsak }) => {
    return (
        <BehandlingProvider>
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
        </BehandlingProvider>
    );
};

export default BehandlingContainer;
