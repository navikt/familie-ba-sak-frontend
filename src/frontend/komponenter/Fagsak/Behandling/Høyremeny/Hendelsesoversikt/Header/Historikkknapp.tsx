import React from 'react';

import { BodyShort } from '@navikt/ds-react';

import IkonHistorikk from '../ikoner/IkonHistorikk';
import Filterknapp from '../komponenter/Filterknapp';

interface IHistorikkknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Historikkknapp = ({ aktiv, onClick }: IHistorikkknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonHistorikk />
        <BodyShort>Historikk</BodyShort>
    </Filterknapp>
);

export default Historikkknapp;
