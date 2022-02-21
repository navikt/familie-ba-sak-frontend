import * as React from 'react';

import IkkeOppfylt from '../../../../ikoner/IkkeOppfylt';
import IkkeVurdert from '../../../../ikoner/IkkeVurdert';
import Oppfylt from '../../../../ikoner/Oppfylt';
import { KompetanseStatus } from '../../../../typer/kompetanse';

interface IProps {
    status?: KompetanseStatus;
    heigth?: number;
    width?: number;
}

const KompetanseIkon: React.FC<IProps> = ({ status, heigth, width }) => {
    switch (status) {
        case KompetanseStatus.OK:
            return <Oppfylt heigth={heigth} width={width} />;
        case KompetanseStatus.UFULLSTENDIG:
            return <IkkeOppfylt heigth={heigth} width={width} />;
        case KompetanseStatus.IKKE_UTFYLT:
        default:
            return <IkkeVurdert heigth={heigth} width={width} />;
    }
};

export default KompetanseIkon;
