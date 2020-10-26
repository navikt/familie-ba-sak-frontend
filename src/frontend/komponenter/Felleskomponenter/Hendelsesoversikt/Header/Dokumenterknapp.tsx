import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';

import IkonDokumenter from '../ikoner/IkonDokumenter';
import Filterknapp from '../komponenter/Filterknapp';

interface IDokumenterknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Dokumenterknapp = ({ aktiv, onClick }: IDokumenterknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonDokumenter />
        <Normaltekst>Dokumenter</Normaltekst>
    </Filterknapp>
);

export default Dokumenterknapp;
