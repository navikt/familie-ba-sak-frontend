import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps {
    minimumOpplysning: boolean[];
}

const IngenOpplysningerValgt: React.FC<IProps> = ({ minimumOpplysning }) => {
    const harOpplysningerÅVise = minimumOpplysning.filter(Boolean);
    const { erLesevisning } = useFagsakRessurser();
    return erLesevisning() && harOpplysningerÅVise.length === 0 ? (
        <Normaltekst className={'skjemaelement'} children={'Ingen opplysninger valgt.'} />
    ) : null;
};

export default IngenOpplysningerValgt;
