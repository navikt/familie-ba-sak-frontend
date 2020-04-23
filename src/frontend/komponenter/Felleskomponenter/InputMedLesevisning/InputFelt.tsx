import React, { Component } from 'react';
import { Input, InputProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';

interface IProps extends InputProps {
    visLeseversjon: boolean;
}

class InputFelt extends Component<IProps> {
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
            value !== '' && <Lesefelt label={label} verdi={value} /> // TODO: Eller bør man vise "Ingen tilleggsopplysninger oppgitt"?
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

export default InputFelt;
