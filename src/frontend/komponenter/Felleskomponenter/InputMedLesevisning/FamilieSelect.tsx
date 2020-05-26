import { Select, SelectProps } from 'nav-frontend-skjema';
import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import Lesefelt from './Lesefelt';

const FamilieSelect: React.FC<SelectProps> = ({
    name,
    label,
    bredde,
    value,
    onChange,
    children,
}) => {
    const { erLesevisning } = useBehandling();

    return erLesevisning() ? (
        <Lesefelt label={label} verdi={value} />
    ) : (
        <Select name={name} label={label} bredde={bredde} value={value} onChange={onChange}>
            {children}
        </Select>
    );
};

export default FamilieSelect;
