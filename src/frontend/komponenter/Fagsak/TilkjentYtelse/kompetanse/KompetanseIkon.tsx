import * as React from 'react';

import IkkeOppfylt from '../../../../ikoner/IkkeOppfylt';
import IkkeVurdert from '../../../../ikoner/IkkeVurdert';
import Oppfylt from '../../../../ikoner/Oppfylt';

interface IProps {
    vurdert?: boolean;
    heigth?: number;
    width?: number;
}

const KompetanseIkon: React.FC<IProps> = ({ vurdert, heigth, width }) => {
    switch (vurdert) {
        case true:
            return <Oppfylt heigth={heigth} width={width} />;
        case false:
            return <IkkeOppfylt heigth={heigth} width={width} />;
        default:
            return <IkkeVurdert heigth={heigth} width={width} />;
    }
};

export default KompetanseIkon;
