import React from 'react';

import StatusIkon, { Status } from './StatusIkon';
import type { ResultatBegrunnelse } from '../typer/vilkår';
import { Resultat } from '../typer/vilkår';

interface IVilkårResultatIkon {
    height?: number;
    resultat: Resultat;
    width?: number;
    resultatBegrunnelse?: ResultatBegrunnelse | null;
}

const VilkårResultatIkon: React.FC<IVilkårResultatIkon> = ({
    height,
    resultat,
    width,
    resultatBegrunnelse,
}) => {
    if (resultatBegrunnelse && resultat === Resultat.OPPFYLT) {
        return <StatusIkon status={Status.INFO} height={height} width={width} />;
    }
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
