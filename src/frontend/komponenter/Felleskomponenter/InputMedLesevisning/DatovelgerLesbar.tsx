import React, { Component } from 'react';
import Lesefelt from './Lesefelt';
import { DatovelgerProps } from '../Datovelger/Datovelger';
import Datovelger from '../Datovelger/Datovelger';

interface IProps extends DatovelgerProps {
    visLeseversjon: boolean;
}

class DatovelgerLesbar extends Component<IProps> {
    render() {
        const { visLeseversjon, id, label, placeholder, onChange, valgtDato } = this.props;
        return visLeseversjon ? (
            <Lesefelt label={label} verdi={valgtDato} />
        ) : (
            <Datovelger
                id={id}
                label={label}
                placeholder={placeholder}
                onChange={onChange}
                valgtDato={valgtDato}
            />
        );
    }
}
export default DatovelgerLesbar;
