import React from 'react';

import { BodyShort } from '@navikt/ds-react';

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
        <BodyShort>Send brev</BodyShort>
    </Filterknapp>
);

export default Meldingerknapp;
