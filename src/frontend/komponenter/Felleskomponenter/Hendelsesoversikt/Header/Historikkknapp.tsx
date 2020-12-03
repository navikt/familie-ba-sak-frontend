import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import IkonHistorikk from '../ikoner/IkonHistorikk';
import Filterknapp from '../komponenter/Filterknapp';

interface IHistorikkknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Historikkknapp = ({ aktiv, onClick }: IHistorikkknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonHistorikk />
        <Normaltekst>Historikk</Normaltekst>
    </Filterknapp>
);

export default Historikkknapp;
