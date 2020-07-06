import * as React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { RessursStatus } from '@navikt/familie-typer';
import { IFagsak } from '../../../typer/fagsak';
import Behandlingskort from '../Behandlingskort/Behandlingskort';
import Totrinnskontroll from '../Totrinnskontroll/Totrinnskontroll';
import Logg from './Logg';

interface IProps {
    fagsak: IFagsak;
}

const Høyremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const { åpenBehandling } = useBehandling();

    return åpenBehandling.status === RessursStatus.SUKSESS ? (
        <div className={'høyremeny'}>
            <Behandlingskort fagsak={fagsak} åpenBehandling={åpenBehandling.data} />
            <Totrinnskontroll åpenBehandling={åpenBehandling.data} fagsak={fagsak} />
            <Logg åpenBehandling={åpenBehandling.data} />
        </div>
    ) : null;
};

export default Høyremeny;
