import { Select, SelectProps } from 'nav-frontend-skjema';
import React from 'react';
import Lesefelt from './Lesefelt';

interface IFamilieSelectProps extends SelectProps {
    erLesevisning?: boolean;
}

const FamilieSelect: React.FC<IFamilieSelectProps> = ({
    bredde,
    children,
    erLesevisning = false,
    label,
    name,
    onChange,
    value,
}) => {
    return erLesevisning ? (
        <Lesefelt label={label} verdi={value} />
    ) : (
        <Select name={name} label={label} bredde={bredde} value={value} onChange={onChange}>
            {children}
        </Select>
    );
};

export default FamilieSelect;
