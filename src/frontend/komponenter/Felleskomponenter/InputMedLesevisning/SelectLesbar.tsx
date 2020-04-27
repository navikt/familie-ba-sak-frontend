import React, { Component } from 'react';
import { Select, SelectProps } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';

interface IProps extends SelectProps {
    visLeseversjon: boolean;
}

class SelectLesbar extends Component<IProps> {
    render() {
        const { visLeseversjon, name, label, bredde, value, onChange, children } = this.props;
        return visLeseversjon ? (
            <Lesefelt label={label} verdi={value} />
        ) : (
            <Select name={name} label={label} bredde={bredde} value={value} onChange={onChange}>
                {children}
            </Select>
        );
    }
}

export default SelectLesbar;
