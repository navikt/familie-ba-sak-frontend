import * as React from 'react';

import styled from 'styled-components';

import { Heading, Radio } from '@navikt/ds-react';
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
    Legend = <Heading size={'medium'} level={'2'} children={'Målform'} />,
}) => {
    const radioOnChange = (målform: Målform) => {
        målformFelt.validerOgSettFelt(målform);
    };

    return (
        <StyledFamilieRadioGruppe
            {...målformFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            erLesevisning={erLesevisning}
            value={målformFelt.verdi ? målform[målformFelt.verdi] : ''}
            legend={Legend}
        >
            <StyledRadio
                value={målform[Målform.NB]}
                name={'registrer-søknad-målform'}
                checked={målformFelt.verdi === Målform.NB}
                onChange={() => radioOnChange(Målform.NB)}
                id={'målform-nb'}
            >
                {målform[Målform.NB]}
            </StyledRadio>
            <StyledRadio
                value={målform[Målform.NN]}
                name={'registrer-søknad-målform'}
                checked={målformFelt.verdi === Målform.NN}
                onChange={() => radioOnChange(Målform.NN)}
            >
                {målform[Målform.NN]}
            </StyledRadio>
        </StyledFamilieRadioGruppe>
    );
};

export default MålformVelger;
