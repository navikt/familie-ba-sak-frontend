import * as React from 'react';

import { IFagsak } from '../../../typer/fagsak';
import { hentAktivBehandlingPåFagsak } from '../../../utils/fagsak';
import Logg from './Logg';
import Totrinnskontroll from "../Totrinnskontroll/Totrinnskontroll";


interface IProps {
    fagsak: IFagsak;
}

const Høyremeny: React.FunctionComponent<IProps> = ({ fagsak }) => {
    const aktivBehandling = hentAktivBehandlingPåFagsak(fagsak);

    return (
        <div className={'høyremeny'}>
            <Totrinnskontroll aktivBehandling={aktivBehandling} fagsak={fagsak}/>
            <Logg aktivBehandling={aktivBehandling} />
        </div>
    );
};

export default Høyremeny;
