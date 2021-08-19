import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import IkonTotrinnskontroll from '../ikoner/IkonTotrinnskontroll';
import Filterknapp from '../komponenter/Filterknapp';

interface ITotrinnskontrollKnappProps {
    aktiv?: boolean;
    onClick: () => void;
}

const TotrinnskontrollKnapp = ({ aktiv, onClick }: ITotrinnskontrollKnappProps) => (
    <Filterknapp disabled={false} onClick={onClick} aktiv={aktiv}>
        <IkonTotrinnskontroll />
        <Normaltekst>Totrinnskontroll</Normaltekst>
    </Filterknapp>
);

export default TotrinnskontrollKnapp;
