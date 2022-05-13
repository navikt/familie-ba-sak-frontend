import React from 'react';

import { Resultat } from '../typer/vilkår';
import StatusIkon, { Status } from './StatusIkon';

interface IVilkårResultatIkon {
    heigth?: number;
    resultat: Resultat;
    width?: number;
}

const VilkårResultatIkon: React.FC<IVilkårResultatIkon> = ({ heigth, resultat, width }) => {
    switch (resultat) {
        case Resultat.OPPFYLT:
            return <StatusIkon status={Status.OK} heigth={heigth} width={width} />;
        case Resultat.IKKE_OPPFYLT:
            return <StatusIkon status={Status.FEIL} heigth={heigth} width={width} />;
        case Resultat.IKKE_VURDERT:
            return <StatusIkon status={Status.ADVARSEL} heigth={heigth} width={width} />;
    }
};

export default VilkårResultatIkon;
