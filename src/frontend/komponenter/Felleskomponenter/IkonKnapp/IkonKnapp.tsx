import React from 'react';
import { randomUUID } from '../../../utils/commons';
import KnappBase from 'nav-frontend-knapper';
import { useBehandling } from '../../../context/BehandlingContext';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface IProps {
    id: string;
    onClick: () => void;
    spinner?: boolean;
    label: string;
    ikon: React.ReactChild;
}

const IkonKnapp: React.FC<IProps> = ({ id, ikon, label, onClick, spinner }) => {
    const { erLesevisning } = useBehandling();
    return !erLesevisning() ? (
        <KnappBase
            aria-label={`utfør_${randomUUID()}`}
            className={'ikon-knapp'}
            id={id}
            onClick={onClick}
            type="flat"
            kompakt={true}
        >
            {label}
            {spinner ? <NavFrontendSpinner /> : ikon}
        </KnappBase>
    ) : null;
};

export default IkonKnapp;
