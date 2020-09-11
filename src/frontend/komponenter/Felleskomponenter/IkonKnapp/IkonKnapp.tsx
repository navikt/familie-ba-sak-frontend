import React from 'react';
import { randomUUID } from '../../../utils/commons';
import KnappBase from 'nav-frontend-knapper';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface IProps {
    id: string;
    ikon: React.ReactChild;
    label: string;
    mini?: boolean;
    onClick: () => void;
    spinner?: boolean;
    erLesevisning: boolean;
}

const IkonKnapp: React.FC<IProps> = ({
    erLesevisning,
    id,
    ikon,
    label,
    mini,
    onClick,
    spinner,
}) => {
    return !erLesevisning ? (
        <KnappBase
            aria-label={`utfør_${randomUUID()}`}
            className={'ikon-knapp'}
            id={id}
            onClick={onClick}
            type="flat"
            mini={mini}
            kompakt={true}
        >
            {label}
            {spinner ? <NavFrontendSpinner /> : ikon}
        </KnappBase>
    ) : null;
};

export default IkonKnapp;
