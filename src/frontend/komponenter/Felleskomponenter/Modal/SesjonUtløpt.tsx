import React from 'react';
import UIModalWrapper from './UIModalWrapper';
import { Normaltekst } from 'nav-frontend-typografi';

const UgyldigSesjon: React.FC = () => {
    return (
        <UIModalWrapper
            modal={{
                tittel: 'Ugyldig sesjon',
                lukkKnapp: false,
                visModal: true,
            }}
        >
            <Normaltekst>Prøv å last siden på nytt</Normaltekst>
        </UIModalWrapper>
    );
};

export default UgyldigSesjon;
