import * as React from 'react';

import { IFagsak } from '../../../typer/fagsak';
import Logg from './Logg';
import Totrinnskontroll from '../Totrinnskontroll/Totrinnskontroll';
import { useBehandling } from '../../../context/BehandlingContext';
import { RessursStatus } from '../../../typer/ressurs';

interface IProps {
    fagsak: IFagsak;
}

const Høyremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { åpenBehandling } = useBehandling();

    return åpenBehandling.status === RessursStatus.SUKSESS ? (
        <div className={'høyremeny'}>
            <Totrinnskontroll åpenBehandling={åpenBehandling.data} fagsak={fagsak} />
            <Logg åpenBehandling={åpenBehandling.data} />
        </div>
    ) : null;
};

export default Høyremeny;
