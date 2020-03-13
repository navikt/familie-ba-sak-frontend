import * as React from 'react';

import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import Logg from './Logg';

interface IProps {
    fagsak: IFagsak;
}

const Høyremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    return (
        <div className={'høyremeny'}>
            <Logg aktivBehandling={aktivBehandling} />
        </div>
    );
};

export default Høyremeny;
