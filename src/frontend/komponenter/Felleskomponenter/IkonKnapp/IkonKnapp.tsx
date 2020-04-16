import React from 'react';
import { randomUUID } from '../../../utils/commons';
import KnappBase from 'nav-frontend-knapper';

interface IProps {
    id: string;
    onClick: () => void;
}

const IkonKnapp: React.FC<IProps> = ({ id, children, onClick }) => {
    return (
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
    );
};

export default IkonKnapp;
