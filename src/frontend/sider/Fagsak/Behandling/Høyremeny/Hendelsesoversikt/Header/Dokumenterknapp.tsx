import React from 'react';

import { BodyShort } from '@navikt/ds-react';

import IkonDokumenter from '../ikoner/IkonDokumenter';
import Filterknapp from '../komponenter/Filterknapp';

interface IDokumenterknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Dokumenterknapp = ({ aktiv, onClick }: IDokumenterknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonDokumenter />
        <BodyShort>Dokumenter</BodyShort>
    </Filterknapp>
);

export default Dokumenterknapp;
