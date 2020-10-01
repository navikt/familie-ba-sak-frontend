import { Undertittel } from 'nav-frontend-typografi';
import * as React from 'react';
import { useHistory } from 'react-router';
import { IFagsak } from '../../../typer/fagsak';
import Skjemasteg from '../../Felleskomponenter/Skjemasteg/Skjemasteg';
import { Oppsummeringsrad, OppsummeringsradHeader } from './Oppsummeringsrad';
import { IBehandling } from '../../../typer/behandling';
import TilkjentYtelseTidslinje from './TilkjentYtelseTidslinje';
import { TidslinjeProvider } from '../../../context/TidslinjeContext';

interface ITilkjentYtelseProps {
    fagsak: IFagsak;
    åpenBehandling: IBehandling;
}

const TilkjentYtelse: React.FunctionComponent<ITilkjentYtelseProps> = ({
    fagsak,
    åpenBehandling,
}) => {
    const history = useHistory();

    const nesteOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vedtak`);
    };

    const forrigeOnClick = () => {
        history.push(`/fagsak/${fagsak.id}/${åpenBehandling?.behandlingId}/vilkaarsvurdering`);
    };

    return (
        <Skjemasteg
            senderInn={false}
            tittel="Behandlingsresultat"
            className="tilkjentytelse"
            forrigeOnClick={forrigeOnClick}
            nesteOnClick={nesteOnClick}
            maxWidthStyle={'80rem'}
        >
            <TidslinjeProvider>
                <TilkjentYtelseTidslinje />
            </TidslinjeProvider>
            {åpenBehandling.beregningOversikt.length > 0 ? (
                <div role="table">
                    <OppsummeringsradHeader />
                    {åpenBehandling.beregningOversikt
                        .slice()
                        .reverse()
                        .map((beregning, index) => {
                            return <Oppsummeringsrad beregning={beregning} key={index} />;
                        })}
                </div>
            ) : (
                <div className="tilkjentytelse-informasjon">
                    <Undertittel>Vilkårene for barnetrygd er ikke oppfylt.</Undertittel>
                </div>
            )}
        </Skjemasteg>
    );
};

export default TilkjentYtelse;
