import React from 'react';
import VilkårResultatIkon from '../../../ikoner/VilkårResultatIkon';
import { Resultat } from '../../../typer/vilkår';

interface StatuslinjeProps {
    resultat: Resultat;
}

const Statuslinje: React.FC<StatuslinjeProps> = ({ resultat }) => (
    <div className={'opplysningsplikt__statuslinje'}>
        <VilkårResultatIkon resultat={resultat} width={20} heigth={20} />
        <span className={'opplysningsplikt__statuslinje__linje'} />
    </div>
);

export default Statuslinje;
