import React from 'react';

import IkonMeldinger from '../ikoner/IkonMeldinger';
import Filterknapp from '../komponenter/Filterknapp';

interface IMeldingerknappProps {
    aktiv?: boolean;
    disabled: boolean;
    onClick: () => void;
}

const Meldingerknapp = ({ aktiv, disabled, onClick }: IMeldingerknappProps) => (
    <Filterknapp disabled={disabled} onClick={onClick} aktiv={aktiv}>
        <IkonMeldinger />
        Send brev
    </Filterknapp>
);

export default Meldingerknapp;
