import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi';

interface IIngenOpplysningerValgtProps {
    minimumOpplysning: boolean[];
    erLesevisning: boolean;
}

const IngenOpplysningerValgt: React.FC<IIngenOpplysningerValgtProps> = ({
    minimumOpplysning,
    erLesevisning,
}) => {
    const harOpplysningerÅVise = minimumOpplysning.filter(Boolean).length === 0;
    return erLesevisning && harOpplysningerÅVise ? (
        <Normaltekst className={'skjemaelement'} children={'Ingen opplysninger valgt.'} />
    ) : null;
};

export default IngenOpplysningerValgt;
