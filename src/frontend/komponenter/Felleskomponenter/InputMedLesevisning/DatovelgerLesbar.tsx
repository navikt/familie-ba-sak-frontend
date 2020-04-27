import React from 'react';
import Lesefelt from './Lesefelt';
import Datovelger, { DatovelgerProps } from '../Datovelger/Datovelger';
import { useFagsakRessurser } from '../../../context/FagsakContext';

const DatovelgerLesbar: React.FC<DatovelgerProps> = ({
    id,
    label,
    placeholder,
    onChange,
    valgtDato,
}) => {
    const { erLesevisning } = useFagsakRessurser();
    return erLesevisning() ? (
        <Lesefelt label={label} verdi={valgtDato} />
    ) : (
        <Datovelger
            id={id}
            label={label}
            placeholder={placeholder}
            onChange={onChange}
            valgtDato={valgtDato}
        />
    );
};
export default DatovelgerLesbar;
