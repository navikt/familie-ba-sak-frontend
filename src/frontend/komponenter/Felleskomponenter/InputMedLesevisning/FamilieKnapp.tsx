import React from 'react';
import { Knapp, KnappBaseProps } from 'nav-frontend-knapper';
import { useFagsakRessurser } from '../../../context/FagsakContext';

const FamilieKnapp: React.FC<KnappBaseProps> = ({ onClick, mini, type, spinner, children }) => {
    const { erLesevisning } = useFagsakRessurser();
    return !erLesevisning() ? (
        <Knapp onClick={onClick} mini={mini} type={type} spinner={spinner}>
            {children}
        </Knapp>
    ) : null;
};

export default FamilieKnapp;
