import React from 'react';
import { randomUUID } from '../../../utils/commons';
import KnappBase from 'nav-frontend-knapper';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps {
    id: string;
    onClick: () => void;
}

const IkonKnapp: React.FC<IProps> = ({ id, children, onClick }) => {
    const { erLesevisning } = useFagsakRessurser();
    return !erLesevisning() ? (
        <KnappBase
            aria-label={`utfør_${randomUUID()}`}
            className={'ikon-knapp'}
            id={id}
            onClick={onClick}
            type="flat"
            kompakt={true}
        >
            {children}
        </KnappBase>
    ) : null;
};

export default IkonKnapp;
