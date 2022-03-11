import * as React from 'react';

import styled from 'styled-components';

import { Radio } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieRadioGruppe } from '@navikt/familie-form-elements';
import type { Felt } from '@navikt/familie-skjema';

import { Målform, målform } from '../../typer/søknad';

const StyledFamilieRadioGruppe = styled(FamilieRadioGruppe)`
    margin: 2rem 0;
`;

const StyledRadio = styled(Radio)`
    padding-left: 1rem;
`;

interface IProps {
    målformFelt: Felt<Målform | undefined>;
    visFeilmeldinger: boolean;
    erLesevisning: boolean;
    Legend?: React.ReactNode;
}

const MålformVelger: React.FC<IProps> = ({
    målformFelt,
    visFeilmeldinger,
    erLesevisning,
    Legend = <Systemtittel children={'Målform'} />,
}) => {
    const radioOnChange = (målform: Målform) => {
        målformFelt.validerOgSettFelt(målform);
    };

    return (
        <StyledFamilieRadioGruppe
            {...målformFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            erLesevisning={erLesevisning}
            verdi={målformFelt.verdi ? målform[målformFelt.verdi] : undefined}
            legend={Legend}
        >
            <StyledRadio
                label={målform[Målform.NB]}
                name={'registrer-søknad-målform'}
                checked={målformFelt.verdi === Målform.NB}
                onChange={() => radioOnChange(Målform.NB)}
                id={'målform-nb'}
            />
            <StyledRadio
                label={målform[Målform.NN]}
                name={'registrer-søknad-målform'}
                checked={målformFelt.verdi === Målform.NN}
                onChange={() => radioOnChange(Målform.NN)}
            />
        </StyledFamilieRadioGruppe>
    );
};

export default MålformVelger;
