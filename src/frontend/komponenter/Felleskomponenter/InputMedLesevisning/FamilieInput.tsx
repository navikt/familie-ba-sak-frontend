import { Input, InputProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { FamilieLesefelt } from '@navikt/familie-form-elements';

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
            <FamilieLesefelt label={label} verdi={value} />
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
