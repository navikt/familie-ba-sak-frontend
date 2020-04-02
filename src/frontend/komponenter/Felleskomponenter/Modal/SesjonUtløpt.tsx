import React from 'react';
import UIModalWrapper from './UIModalWrapper';

const UgyldigSesjon: React.FC = () => {
    return (
        <UIModalWrapper
            modal={{
                tittel: 'Ugyldig sesjon',
                content: 'Prøv å last siden på nytt',
                lukkKnapp: false,
                visModal: true,
            }}
        />
    );
};

export default UgyldigSesjon;
