import React from 'react';

import IkonHistorikk from '../ikoner/IkonHistorikk';
import Filterknapp from './Filterknapp';

interface IHistorikkknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Historikkknapp = ({ aktiv, onClick }: IHistorikkknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonHistorikk />
    </Filterknapp>
);

export default Historikkknapp;
