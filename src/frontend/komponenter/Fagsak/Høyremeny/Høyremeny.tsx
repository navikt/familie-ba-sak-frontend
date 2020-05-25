import * as React from 'react';

import { IFagsak } from '../../../typer/fagsak';
import Logg from './Logg';
import Totrinnskontroll from '../Totrinnskontroll/Totrinnskontroll';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps {
    fagsak: IFagsak;
}

const Høyremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { åpenBehandling } = useFagsakRessurser();

    return (
        <div className={'høyremeny'}>
            <Totrinnskontroll åpenBehandling={åpenBehandling} fagsak={fagsak} />
            <Logg åpenBehandling={åpenBehandling} />
        </div>
    );
};

export default Høyremeny;
