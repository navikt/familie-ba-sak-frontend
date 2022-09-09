import React from 'react';

import { BodyShort } from '@navikt/ds-react';

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
            <BodyShort>Prøv å last siden på nytt</BodyShort>
        </UIModalWrapper>
    );
};

export default UgyldigSesjon;
