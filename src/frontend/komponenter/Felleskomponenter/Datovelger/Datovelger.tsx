import React from 'react';
import { Label } from 'nav-frontend-skjema';
import { Datovelger } from 'nav-datovelger';
import 'nav-datovelger/lib/styles/datovelger';

interface IProps {
    id: string;
    label: string;
    onChange: (dato: any) => void;
    valgtDato: string;
}

const Datovegler: React.FC<IProps> = ({ id, label, onChange, valgtDato }) => {
    return (
        <div>
            <Label children={label} htmlFor={id} />
            <Datovelger
                id={id}
                input={{ name: id, id: `input_${id}` }}
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
