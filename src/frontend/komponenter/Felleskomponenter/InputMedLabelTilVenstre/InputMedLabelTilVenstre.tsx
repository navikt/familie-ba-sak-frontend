import * as React from 'react';
import { Input, InputProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';

const InputMedLabelTilVenstre: React.StatelessComponent<InputProps> = ({
    bredde,
    label,
    onChange,
    placeholder,
    type,
    value,
}) => {
    return (
        <Input
            bredde={bredde}
            className={'input-med-label-til-venstre'}
            inputClassName={'input-med-label-til-venstre__input'}
            label={
                <Normaltekst className={'input-med-label-til-venstre__label'} children={label} />
            }
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            value={value}
        />
    );
};

export default InputMedLabelTilVenstre;
