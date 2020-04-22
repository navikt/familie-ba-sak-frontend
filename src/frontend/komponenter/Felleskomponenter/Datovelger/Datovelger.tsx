import React from 'react';
import { Label } from 'nav-frontend-skjema';
import { Datovelger, ISODateString } from 'nav-datovelger';
import 'nav-datovelger/lib/styles/datovelger';

interface IProps {
    disabled?: boolean;
    id: string;
    label: string;
    onChange: (dato?: ISODateString) => void;
    placeholder?: string;
    valgtDato?: string;
}

const Datovegler: React.FC<IProps> = ({
    disabled,
    id,
    label,
    onChange,
    placeholder,
    valgtDato,
}) => {
    return (
        <div>
            <Label children={label} htmlFor={id} />
            <Datovelger
                disabled={disabled}
                id={id}
                input={{ name: id, id: `input_${id}`, placeholder }}
                locale={'nb'}
                valgtDato={valgtDato}
                onChange={onChange}
                avgrensninger={{
                    helgedagerIkkeTillatt: true,
                }}
            />
        </div>
    );
};

export default Datovegler;
