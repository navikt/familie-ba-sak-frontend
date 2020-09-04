import React from 'react';
import { randomUUID } from '../../../utils/commons';
import KnappBase from 'nav-frontend-knapper';
import { useBehandling } from '../../../context/BehandlingContext';
import NavFrontendSpinner from 'nav-frontend-spinner';

interface IProps {
    id: string;
    ikon: React.ReactChild;
    label: string;
    mini?: boolean;
    onClick: () => void;
    spinner?: boolean;
}

const IkonKnapp: React.FC<IProps> = ({ id, ikon, mini, label, onClick, spinner }) => {
    const { erLesevisning } = useBehandling();
    return !erLesevisning() ? (
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
