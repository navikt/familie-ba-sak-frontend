import { Input, InputProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';

const InputMedLabelTilVenstre: React.FunctionComponent<InputProps> = ({
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
