import React, { Component } from 'react';
import { RadioGruppe } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';
import { SkjemaGruppeProps } from 'nav-frontend-skjema/src/skjema-gruppe';

interface IProps extends SkjemaGruppeProps {
    visLeseversjon: boolean;
    verdi?: string;
}

class RadioGruppeLesbar extends Component<IProps> {
    render() {
        const { visLeseversjon, verdi, legend, feil, feilmeldingId, children } = this.props;
        return visLeseversjon ? (
            <Lesefelt label={legend} verdi={verdi} />
        ) : (
            <RadioGruppe legend={legend} feil={feil} feilmeldingId={feilmeldingId}>
                {children}
            </RadioGruppe>
        );
    }
}

export default RadioGruppeLesbar;
