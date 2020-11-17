import React from 'react';
import { Resultat } from '../typer/vilkår';
import Oppfylt from './Oppfylt';
import IkkeOppfylt from './IkkeOppfylt';
import Advarsel from './Advarsel';

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
            return <IkkeOppfylt heigth={heigth} className={className} width={width} />;
        case Resultat.IKKE_VURDERT:
            return <Advarsel heigth={heigth} className={className} width={width} />;
    }
};

export default VilkårResultatIkon;
