import React from 'react';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';
import { Normaltekst } from 'nav-frontend-typografi';
import { useFagsakRessurser } from '../../../context/FagsakContext';

const FamilieTextarea: React.FC<TextareaProps> = ({ name, label, value, onChange, children }) => {
    const { erLesevisning } = useFagsakRessurser();

    return erLesevisning() ? (
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
};

export default FamilieTextarea;
