import React from 'react';
import PennFylt from '../../../../ikoner/PennFylt';
import Penn from '../../../../ikoner/Penn';
import { randomUUID } from '../../../../utils/commons';

interface IProps {
    aktiv?: boolean;
    id: string;
    onClick: () => void;
}

const UtførKnapp: React.FC<IProps> = ({ aktiv, id, children, onClick }) => {
    return (
        <button
            id={id}
            aria-label={`utfør_${randomUUID()}`}
            className={'vilkårsvurdering__knapp-med-ikon'}
            onClick={onClick}
        >
            {children}
            {aktiv ? <PennFylt heigth={20} width={20} /> : <Penn heigth={20} width={20} />}
        </button>
    );
};

export default UtførKnapp;
