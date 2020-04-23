import React, { Component } from 'react';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import CheckTmp from '../../../ikoner/CheckTmp';

interface IProps extends CheckboxProps {
    visLeseversjon: boolean;
}

class CheckboxFelt extends Component<IProps> {
    render() {
        const { visLeseversjon, label, checked, onChange } = this.props;
        return visLeseversjon ? (
            checked && (
                <div>
                    <Normaltekst>
                        <CheckTmp heigth={25} /> {label}
                    </Normaltekst>
                </div>
            ) // TODO: Legg til X og V og ta med de som ikke er avhuka? Det vil også løse håndtering av "rar visning" når ingen er huka av
        ) : (
            <Checkbox label={label} checked={checked} onChange={onChange} />
        );
    }
}

export default CheckboxFelt;
