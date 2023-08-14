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

const VilkårResultatIkon: React.FC<IVilkårResultatIkon> = ({ resultat, resultatBegrunnelse }) => {
    if (resultatBegrunnelse && resultat === Resultat.OPPFYLT) {
        return <StatusIkon status={Status.INFO} />;
    }
    switch (resultat) {
        case Resultat.OPPFYLT:
            return <StatusIkon status={Status.OK} />;
        case Resultat.IKKE_OPPFYLT:
            return <StatusIkon status={Status.FEIL} />;
        case Resultat.IKKE_VURDERT:
            return <StatusIkon status={Status.ADVARSEL} />;
    }
};

export default VilkårResultatIkon;
