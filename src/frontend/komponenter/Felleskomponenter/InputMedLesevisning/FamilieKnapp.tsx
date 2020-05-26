import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';
import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';

const FamilieKnapp: React.FC<KnappBaseProps> = ({ onClick, mini, type, spinner, children }) => {
    const { erLesevisning } = useBehandling();
    return !erLesevisning() ? (
        <Knapp onClick={onClick} mini={mini} type={type} spinner={spinner}>
            {children}
        </Knapp>
    ) : null;
};

export default FamilieKnapp;
