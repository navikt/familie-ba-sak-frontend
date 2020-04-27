import React from 'react';
import { Element, Normaltekst } from 'nav-frontend-typografi';

interface IProps {
    label?: string;
    verdi: string;
}

const Lesefelt: React.FC<IProps> = ({ label, verdi }) => {
    return (
        <div className={'lese-felt'}>
            {label !== undefined && <Element children={label} />}
            <Normaltekst className={'skjemaelement'} children={verdi} />
        </div>
    );
};

export default Lesefelt;
