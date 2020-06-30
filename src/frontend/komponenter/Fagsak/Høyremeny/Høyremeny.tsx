import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { IFagsak } from '../../../typer/fagsak';
import { RessursStatus } from '../../../typer/ressurs';
import Totrinnskontroll from '../Totrinnskontroll/Totrinnskontroll';
import Behandlingskort from '../Behandlingskort/Behandlingskort';
import Logg from './Logg';

interface IProps {
    fagsak: IFagsak;
}

const Høyremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { åpenBehandling } = useBehandling();

    return åpenBehandling.status === RessursStatus.SUKSESS ? (
        <div className={'høyremeny'}>
            <Behandlingskort fagsak={fagsak} />
            <Totrinnskontroll åpenBehandling={åpenBehandling.data} fagsak={fagsak} />
            <Logg åpenBehandling={åpenBehandling.data} />
        </div>
    ) : null;
};

export default Høyremeny;
