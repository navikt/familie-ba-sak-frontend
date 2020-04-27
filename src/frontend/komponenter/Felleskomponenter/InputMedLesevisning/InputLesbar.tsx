import React, { Component } from 'react';
import { Input, InputProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';
import { Normaltekst } from 'nav-frontend-typografi';

interface IProps extends InputProps {
    visLeseversjon: boolean;
}

class InputLesbar extends Component<IProps> {
    render() {
        const {
            visLeseversjon,
            label,
            bredde,
            value,
            placeholder,
            onChange,
            children,
        } = this.props;
        return visLeseversjon ? (
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
    }
}

export default InputLesbar;
