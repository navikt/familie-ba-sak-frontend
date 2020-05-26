import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import Datovelger, { DatovelgerProps } from '../Datovelger/Datovelger';
import Lesefelt from './Lesefelt';

const FamilieDatovelger: React.FC<DatovelgerProps> = ({
    id,
    label,
    placeholder,
    onChange,
    valgtDato,
}) => {
    const { erLesevisning } = useBehandling();
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
export default FamilieDatovelger;
