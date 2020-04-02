import React from 'react';
import PennFylt from '../../../../ikoner/PennFylt';
import Penn from '../../../../ikoner/Penn';

interface IProps {
    aktiv: boolean;
    onClick: () => void;
}

const UtførKnapp: React.FC<IProps> = ({ aktiv, onClick }) => {
    return (
        <button className={'generisk-vilkår__utførknapp'} onClick={onClick}>
            Utfør
            {aktiv ? <PennFylt heigth={20} width={20} /> : <Penn heigth={20} width={20} />}
        </button>
    );
};

export default UtførKnapp;
