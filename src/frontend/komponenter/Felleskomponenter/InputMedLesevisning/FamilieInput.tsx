import { Input, InputProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import Lesefelt from './Lesefelt';

interface IFamilieInputProps extends InputProps {
    erLesevisning?: boolean;
}

const FamilieInput: React.FC<IFamilieInputProps> = ({
    erLesevisning = false,
    label,
    bredde,
    value,
    placeholder,
    onChange,
    children,
}) => {
    return erLesevisning ? (
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
