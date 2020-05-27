import { Input, InputProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import Lesefelt from './Lesefelt';

const FamilieInput: React.FC<InputProps> = ({
    label,
    bredde,
    value,
    placeholder,
    onChange,
    children,
}) => {
    const { erLesevisning } = useBehandling();
    return erLesevisning() ? (
        value === '' ? (
            <Normaltekst className={'skjemaelement'} children={'Ingen opplysninger oppgitt.'} />
        ) : (
            <Lesefelt label={label} verdi={value} />
        )
    ) : (
        <Input
            label={label}
            bredde={bredde}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        >
            {children}
        </Input>
    );
};

export default FamilieInput;
