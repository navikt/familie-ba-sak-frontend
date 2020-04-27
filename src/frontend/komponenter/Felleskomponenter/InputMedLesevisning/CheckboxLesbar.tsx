import React from 'react';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import { useFagsakRessurser } from '../../../context/FagsakContext';

const CheckboxLesbar: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
    const { erLesevisning } = useFagsakRessurser();
    return erLesevisning() ? (
        checked && <Normaltekst className={'skjemaelement lese-felt'} children={label} />
    ) : (
        <Checkbox label={label} checked={checked} onChange={onChange} />
    );
};

export default CheckboxLesbar;
