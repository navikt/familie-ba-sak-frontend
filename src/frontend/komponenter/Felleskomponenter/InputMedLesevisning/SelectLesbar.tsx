import React from 'react';
import { Select, SelectProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';
import { useFagsakRessurser } from '../../../context/FagsakContext';

const SelectLesbar: React.FC<SelectProps> = ({
    name,
    label,
    bredde,
    value,
    onChange,
    children,
}) => {
    const { erLesevisning } = useFagsakRessurser();

    return erLesevisning() ? (
        <Lesefelt label={label} verdi={value} />
    ) : (
        <Select name={name} label={label} bredde={bredde} value={value} onChange={onChange}>
            {children}
        </Select>
    );
};

export default SelectLesbar;
