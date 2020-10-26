import { Normaltekst } from 'nav-frontend-typografi';
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
        <Normaltekst>Send brev</Normaltekst>
    </Filterknapp>
);

export default Meldingerknapp;
