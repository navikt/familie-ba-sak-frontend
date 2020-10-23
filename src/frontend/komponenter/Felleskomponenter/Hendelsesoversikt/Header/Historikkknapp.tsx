import React from 'react';

import IkonHistorikk from '../ikoner/IkonHistorikk';
import Filterknapp from '../komponenter/Filterknapp';

interface IHistorikkknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Historikkknapp = ({ aktiv, onClick }: IHistorikkknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonHistorikk />
        Historikk
    </Filterknapp>
);

export default Historikkknapp;
