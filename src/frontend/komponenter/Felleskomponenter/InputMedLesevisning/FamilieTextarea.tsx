import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import Lesefelt from './Lesefelt';

const FamilieTextarea: React.FC<TextareaProps> = ({ name, label, value, onChange, children }) => {
    const { erLesevisning } = useBehandling();

    return erLesevisning() ? (
        value === '' ? (
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
