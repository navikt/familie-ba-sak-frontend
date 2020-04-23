import React, { Component } from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';

interface IProps extends TextareaProps {
    visLeseversjon: boolean;
}

class TextareaFelt extends Component<IProps> {
    render() {
        const { visLeseversjon, name, label, value, onChange, children } = this.props;
        return visLeseversjon ? (
            value !== '' && <Lesefelt label={label} verdi={value} /> // TODO: Eller bør man vise "Ingen tilleggsopplysninger oppgitt"?
        ) : (
            <Textarea name={name} label={label} value={value} onChange={onChange}>
                {children}
            </Textarea>
        );
    }
}

export default TextareaFelt;
