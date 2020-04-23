import React from 'react';
import { Label } from 'nav-frontend-skjema';
import { Datovelger as NavDatovelger, ISODateString } from 'nav-datovelger';
import 'nav-datovelger/lib/styles/datovelger';

interface IProps {
    disabled?: boolean;
    id: string;
    label: string;
    onChange: (dato?: ISODateString) => void;
    placeholder?: string;
    valgtDato?: string;
    className?: string;
}

const Datovelger: React.FC<IProps> = ({
    disabled,
    id,
    label,
    onChange,
    placeholder,
    valgtDato,
    className = '',
}) => {
    return (
        <div className={className}>
            <Label children={label} htmlFor={id} />
            <NavDatovelger
                disabled={disabled}
                id={id}
                visÅrVelger={true}
                input={{ name: id, id: `input_${id}`, placeholder }}
                locale={'nb'}
                valgtDato={valgtDato}
                onChange={onChange}
            />
        </div>
    );
};

export default Datovelger;
