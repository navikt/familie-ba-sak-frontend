import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';

interface IProps {
    minimumOpplysning: boolean[];
}

const IngenOpplysningerValgt: React.FC<IProps> = ({ minimumOpplysning }) => {
    const harOpplysningerÅVise = minimumOpplysning.filter(Boolean);
    const { erLesevisning } = useBehandling();
    return erLesevisning() && harOpplysningerÅVise.length === 0 ? (
        <Normaltekst className={'skjemaelement'} children={'Ingen opplysninger valgt.'} />
    ) : null;
};

export default IngenOpplysningerValgt;
