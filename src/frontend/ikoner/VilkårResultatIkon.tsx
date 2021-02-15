import React from 'react';

import { Resultat } from '../typer/vilkår';
import Advarsel from './Advarsel';
import IkkeOppfylt from './IkkeOppfylt';
import Oppfylt from './Oppfylt';

interface IVilkårResultatIkon {
    className?: string;
    heigth?: number;
    resultat: Resultat;
    width?: number;
}

const VilkårResultatIkon: React.FC<IVilkårResultatIkon> = ({
    className,
    heigth,
    resultat,
    width,
}) => {
    switch (resultat) {
        case Resultat.OPPFYLT:
            return <Oppfylt heigth={heigth} className={className} width={width} />;
        case Resultat.IKKE_OPPFYLT:
        case Resultat.AVSLÅTT:
            return <IkkeOppfylt heigth={heigth} className={className} width={width} />;
        case Resultat.IKKE_VURDERT:
            return <Advarsel heigth={heigth} className={className} width={width} />;
    }
};

export default VilkårResultatIkon;
