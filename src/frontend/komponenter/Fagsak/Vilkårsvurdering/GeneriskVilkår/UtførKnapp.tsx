import React from 'react';
import Advarsel from '../../../../ikoner/Advarsel';

interface IProps {
    aktiv: boolean;
    onClick: () => void;
}

const UtførKnapp: React.FC<IProps> = ({ aktiv, onClick }) => {
    return (
        <button className={'generisk-vilkår__utførknapp'} onClick={onClick}>
            Utfør
            {aktiv ? <Advarsel heigth={16} width={36} /> : <Advarsel heigth={16} width={16} />}
        </button>
    );
};

export default UtførKnapp;
