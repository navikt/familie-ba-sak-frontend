import React from 'react';

import { BodyShort } from '@navikt/ds-react';

import IkonTotrinnskontroll from '../ikoner/IkonTotrinnskontroll';
import Filterknapp from '../komponenter/Filterknapp';

interface ITotrinnskontrollKnappProps {
    aktiv?: boolean;
    onClick: () => void;
}

const TotrinnskontrollKnapp = ({ aktiv, onClick }: ITotrinnskontrollKnappProps) => (
    <Filterknapp disabled={false} onClick={onClick} aktiv={aktiv}>
        <IkonTotrinnskontroll />
        <BodyShort>Totrinnskontroll</BodyShort>
    </Filterknapp>
);

export default TotrinnskontrollKnapp;
