import React from 'react';
import { Input, InputProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';
import { Normaltekst } from 'nav-frontend-typografi';
import { useFagsakRessurser } from '../../../context/FagsakContext';

const InputLesbar: React.FC<InputProps> = ({
    label,
    bredde,
    value,
    placeholder,
    onChange,
    children,
}) => {
    const { erLesevisning } = useFagsakRessurser();
    return erLesevisning() ? (
        value == '' ? (
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

export default InputLesbar;
