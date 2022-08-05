import React from 'react';

import { Resultat } from '../typer/vilkår';
import StatusIkon, { Status } from './StatusIkon';

interface IVilkårResultatIkon {
    height?: number;
    resultat: Resultat;
    width?: number;
}

const VilkårResultatIkon: React.FC<IVilkårResultatIkon> = ({ height, resultat, width }) => {
    switch (resultat) {
        case Resultat.OPPFYLT:
            return <StatusIkon status={Status.OK} height={height} width={width} />;
        case Resultat.IKKE_OPPFYLT:
            return <StatusIkon status={Status.FEIL} height={height} width={width} />;
        case Resultat.IKKE_VURDERT:
            return <StatusIkon status={Status.ADVARSEL} height={height} width={width} />;
    }
};

export default VilkårResultatIkon;
