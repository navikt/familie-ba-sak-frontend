import React, { Component } from 'react';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';

interface IProps extends CheckboxProps {
    visLeseversjon: boolean;
}

class CheckboxFelt extends Component<IProps> {
    render() {
        const { visLeseversjon, label, checked, onChange } = this.props;
        return visLeseversjon ? (
            checked && <Lesefelt verdi={label} />
        ) : (
            <Checkbox label={label} checked={checked} onChange={onChange} />
        );
    }
}

export default CheckboxFelt;
