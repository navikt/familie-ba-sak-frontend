import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

import UIModalWrapper from './UIModalWrapper';

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
