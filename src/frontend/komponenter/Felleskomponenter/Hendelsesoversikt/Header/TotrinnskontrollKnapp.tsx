import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import IkonMeldinger from '../ikoner/IkonMeldinger';
import Filterknapp from '../komponenter/Filterknapp';

interface ITotrinnskontrollKnappProps {
    aktiv?: boolean;
    onClick: () => void;
}

const TotrinnskontrollKnapp = ({ aktiv, onClick }: ITotrinnskontrollKnappProps) => (
    <Filterknapp disabled={false} onClick={onClick} aktiv={aktiv}>
        <IkonMeldinger />
        <Normaltekst>Totrinnskontroll</Normaltekst>
    </Filterknapp>
);

export default TotrinnskontrollKnapp;
