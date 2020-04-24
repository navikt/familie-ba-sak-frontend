import React, { Component } from 'react';
import { RadioGruppe } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';
import { SkjemaGruppeProps } from 'nav-frontend-skjema/src/skjema-gruppe';
import { vilkårResultatFeilmeldingId } from '../../Fagsak/Vilkårsvurdering/GeneriskVilkår/GeneriskVilkår';

interface IProps extends SkjemaGruppeProps {
    visLeseversjon: boolean;
    verdi?: string;
}

class RadioGruppeFelt extends Component<IProps> {
    render() {
        const { visLeseversjon, verdi, legend, feil, feilmeldingId, children } = this.props;
        return visLeseversjon ? (
            <Lesefelt label={legend} verdi={verdi} />
        ) : (
            <RadioGruppe
                legend={legend}
                feil={feil}
                feilmeldingId={vilkårResultatFeilmeldingId(feilmeldingId)}
            >
                {children}
            </RadioGruppe>
        );
    }
}

export default RadioGruppeFelt;
