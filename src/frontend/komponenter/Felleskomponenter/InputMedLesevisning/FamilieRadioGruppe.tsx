import { RadioGruppe } from 'nav-frontend-skjema';
import { SkjemaGruppeProps } from 'nav-frontend-skjema/src/skjema-gruppe';
import React from 'react';
import { useBehandling } from '../../../context/BehandlingContext';
import Lesefelt from './Lesefelt';

interface IProps extends SkjemaGruppeProps {
    verdi?: string;
}
const FamilieRadioGruppe: React.FC<IProps> = ({ verdi, legend, feil, feilmeldingId, children }) => {
    const { erLesevisning } = useBehandling();
    return erLesevisning() ? (
        <Lesefelt label={legend} verdi={verdi} />
    ) : (
        <RadioGruppe legend={legend} feil={feil} feilmeldingId={feilmeldingId}>
            {children}
        </RadioGruppe>
    );
};

export default FamilieRadioGruppe;
