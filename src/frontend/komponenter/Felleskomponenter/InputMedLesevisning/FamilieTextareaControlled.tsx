import React from 'react';
import { TextareaControlled, TextareaControlledProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';
import { Normaltekst } from 'nav-frontend-typografi';
import { useFagsakRessurser } from '../../../context/FagsakContext';

const FamilieTextareaControlled: React.FC<TextareaControlledProps> = ({
    defaultValue,
    id,
    label,
    placeholder,
    textareaClass,
    value,
    feil,
    onBlur,
}) => {
    const { erLesevisning } = useFagsakRessurser();

    return erLesevisning() ? (
        value == '' ? (
            <Normaltekst className={'skjemaelement'} children={'Ingen opplysninger oppgitt.'} />
        ) : (
            <Lesefelt label={label} verdi={value} />
        )
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
};

export default FamilieTextareaControlled;
