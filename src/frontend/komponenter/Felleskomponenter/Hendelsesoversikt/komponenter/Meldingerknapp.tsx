import React from 'react';

import IkonMeldinger from '../ikoner/IkonMeldinger';
import Filterknapp from './Filterknapp';

interface IMeldingerknappProps {
    aktiv?: boolean;
    disabled: boolean;
    onClick: () => void;
}

const Meldingerknapp = ({ aktiv, disabled, onClick }: IMeldingerknappProps) => (
    <Filterknapp disabled={disabled} onClick={onClick} aktiv={aktiv}>
        <IkonMeldinger />
    </Filterknapp>
);

export default Meldingerknapp;
