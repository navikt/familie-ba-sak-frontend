import React from 'react';
import { RadioGruppe } from 'nav-frontend-skjema';
import Lesefelt from './Lesefelt';
import { SkjemaGruppeProps } from 'nav-frontend-skjema/src/skjema-gruppe';
import { useFagsakRessurser } from '../../../context/FagsakContext';

interface IProps extends SkjemaGruppeProps {
    verdi?: string;
}
const RadioGruppeLesbar: React.FC<IProps> = ({ verdi, legend, feil, feilmeldingId, children }) => {
    const { erLesevisning } = useFagsakRessurser();
    return erLesevisning() ? (
        <Lesefelt label={legend} verdi={verdi} />
    ) : (
        <RadioGruppe legend={legend} feil={feil} feilmeldingId={feilmeldingId}>
            {children}
        </RadioGruppe>
    );
};

export default RadioGruppeLesbar;
