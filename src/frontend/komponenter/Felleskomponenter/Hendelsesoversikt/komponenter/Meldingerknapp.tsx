import React from 'react';

import IkonMeldinger from '../ikoner/IkonMeldinger';
import Filterknapp from './Filterknapp';

interface IMeldingerknappProps {
    onClick: () => void;
    aktiv?: boolean;
}

const Meldingerknapp = ({ aktiv, onClick }: IMeldingerknappProps) => (
    <Filterknapp onClick={onClick} aktiv={aktiv}>
        <IkonMeldinger />
    </Filterknapp>
);

export default Meldingerknapp;
