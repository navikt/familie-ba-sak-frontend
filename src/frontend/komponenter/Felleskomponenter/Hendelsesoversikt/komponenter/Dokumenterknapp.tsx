import React from 'react';

import IkonDokumenter from '../ikoner/IkonDokumenter';
import Filterknapp from './Filterknapp';

interface IDokumenterknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Dokumenterknapp = ({ aktiv, onClick }: IDokumenterknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonDokumenter />
    </Filterknapp>
);

export default Dokumenterknapp;
