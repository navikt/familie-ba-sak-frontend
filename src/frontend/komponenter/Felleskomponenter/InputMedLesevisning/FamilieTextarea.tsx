import { FamilieLesefelt } from '@navikt/familie-form-elements';
import { Textarea, TextareaProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';

const FamilieTextarea: React.FC<TextareaProps> = ({ name, label, value, onChange, children }) => {
    const { erLesevisning } = useBehandling();

    return erLesevisning() ? (
        value === '' ? (
            <Normaltekst className={'skjemaelement'} children={'Ingen opplysninger oppgitt.'} />
        ) : (
            <FamilieLesefelt label={label} verdi={value} />
        )
    ) : (
        <Textarea name={name} label={label} value={value} onChange={onChange}>
            {children}
        </Textarea>
    );
};

export default FamilieTextarea;
