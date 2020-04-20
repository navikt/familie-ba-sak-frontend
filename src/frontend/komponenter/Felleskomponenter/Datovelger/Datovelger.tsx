import React from 'react';
import { Label } from 'nav-frontend-skjema';
import { Datovelger } from 'nav-datovelger';
import 'nav-datovelger/lib/styles/datovelger';

interface IProps {
    disabled?: boolean;
    id: string;
    label: string;
    onChange: (dato: any) => void;
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

export default Datovelger;
