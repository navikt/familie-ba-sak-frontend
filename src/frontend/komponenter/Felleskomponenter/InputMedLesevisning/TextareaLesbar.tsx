import React, { Component } from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';
import { Normaltekst } from 'nav-frontend-typografi';

interface IProps extends TextareaProps {
    visLeseversjon: boolean;
}

class TextareaLesbar extends Component<IProps> {
    render() {
        const { visLeseversjon, name, label, value, onChange, children } = this.props;
        return visLeseversjon ? (
            value == '' ? (
                <Normaltekst className={'skjemaelement'} children={'Ingen opplysninger oppgitt.'} />
            ) : (
                <Lesefelt label={label} verdi={value} />
            )
        ) : (
            <Textarea name={name} label={label} value={value} onChange={onChange}>
                {children}
            </Textarea>
        );
    }
}

export default TextareaLesbar;
