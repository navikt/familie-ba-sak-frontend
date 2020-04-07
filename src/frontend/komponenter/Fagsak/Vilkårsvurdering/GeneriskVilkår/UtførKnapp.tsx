import React from 'react';
import PennFylt from '../../../../ikoner/PennFylt';
import Penn from '../../../../ikoner/Penn';
import { randomUUID } from '../../../../utils/commons';

interface IProps {
    aktiv: boolean;
    onClick: () => void;
}

const UtførKnapp: React.FC<IProps> = ({ aktiv, onClick }) => {
    return (
        <button
            id={`utfør_${randomUUID()}`}
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
