import { TextareaControlled, TextareaControlledProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import { FamilieLesefelt } from '@navikt/familie-form-elements';

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
    const { erLesevisning } = useBehandling();

    return erLesevisning() ? (
        value === '' ? (
            <Normaltekst className={'skjemaelement'} children={'Ingen opplysninger oppgitt.'} />
        ) : (
            <FamilieLesefelt label={label} verdi={value} />
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
