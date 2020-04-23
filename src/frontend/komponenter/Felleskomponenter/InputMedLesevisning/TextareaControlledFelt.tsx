import React, { Component } from 'react';
import { TextareaControlled, TextareaControlledProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';

interface IProps extends TextareaControlledProps {
    visLeseversjon: boolean;
}

class TextareaControlledFelt extends Component<IProps> {
    render() {
        const {
            visLeseversjon,
            defaultValue,
            id,
            label,
            placeholder,
            textareaClass,
            value,
            feil,
            onBlur,
        } = this.props;
        return visLeseversjon ? (
            value !== '' && <Lesefelt label={label} verdi={value} /> // TODO: Håndtering av feilmeldinger
        ) : (
            <TextareaControlled
                defaultValue={defaultValue}
                id={id}
                label={label}
                placeholder={placeholder}
                textareaClass={textareaClass}
                value={value}
                feil={feil}
                onBlur={onBlur}
            />
        );
    }
}

export default TextareaControlledFelt;
