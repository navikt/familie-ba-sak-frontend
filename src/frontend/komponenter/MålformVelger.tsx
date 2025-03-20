import * as React from 'react';

import styled from 'styled-components';

import { Heading, Radio, RadioGroup } from '@navikt/ds-react';
import type { Felt } from '@navikt/familie-skjema';

import { Målform, målform } from '../typer/søknad';

const StyledRadioGroup = styled(RadioGroup)`
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
        <StyledRadioGroup
            {...målformFelt.hentNavBaseSkjemaProps(visFeilmeldinger)}
            readOnly={erLesevisning}
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
        </StyledRadioGroup>
    );
};

export default MålformVelger;
