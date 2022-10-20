import * as React from 'react';

import type { InputProps } from 'nav-frontend-skjema';
import { Input } from 'nav-frontend-skjema';

import { BodyShort } from '@navikt/ds-react';

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
            label={<BodyShort className={'input-med-label-til-venstre__label'} children={label} />}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            value={value}
        />
    );
};

export default InputMedLabelTilVenstre;
