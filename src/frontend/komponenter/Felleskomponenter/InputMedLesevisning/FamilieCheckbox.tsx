import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';

const FamilieCheckbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    const { erLesevisning } = useBehandling();
    return erLesevisning() ? (
        checked ? (
            <Normaltekst className={'skjemaelement lese-felt'} children={label} />
        ) : null
    ) : (
        <Checkbox label={label} checked={checked} onChange={onChange} />
    );
};

export default FamilieCheckbox;
