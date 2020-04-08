import React from 'react';
import PennFylt from '../../../../ikoner/PennFylt';
import Penn from '../../../../ikoner/Penn';
import { randomUUID } from '../../../../utils/commons';
import { IVilkårResultat } from '../../../../typer/vilkår';
import { vilkårFeilmeldingId } from './GeneriskVilkår';

interface IProps {
    aktiv: boolean;
    onClick: () => void;
    vilkårResultat: IVilkårResultat;
}

const UtførKnapp: React.FC<IProps> = ({ aktiv, onClick, vilkårResultat }) => {
    return (
        <button
            id={vilkårFeilmeldingId(vilkårResultat)}
            aria-label={`utfør_${randomUUID()}`}
            className={'generisk-vilkår__utførknapp'}
            onClick={onClick}
        >
            Utfør
            {aktiv ? <PennFylt heigth={20} width={20} /> : <Penn heigth={20} width={20} />}
        </button>
    );
};

export default UtførKnapp;
