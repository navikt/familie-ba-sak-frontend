import * as React from 'react';

import styled from 'styled-components';

import { Radio } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieRadioGruppe } from '@navikt/familie-form-elements/dist';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useSøknad } from '../../../context/SøknadContext';
import { Målform, målform } from '../../../typer/søknad';

const StyledFamilieRadioGruppe = styled(FamilieRadioGruppe)`
    margin: 2rem 0;
`;

const StyledRadio = styled(Radio)`
    padding-left: 1rem;
`;

const MålformVelger: React.FunctionComponent = () => {
    const { erLesevisning } = useBehandling();
    const { skjema } = useSøknad();
    const lesevisning = erLesevisning();

    const radioOnChange = (målform: Målform) => {
        skjema.felter.målform.validerOgSettFelt(målform);
    };

    return (
        <StyledFamilieRadioGruppe
            {...skjema.felter.målform.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
            erLesevisning={lesevisning}
            verdi={skjema.felter.målform.verdi ? målform[skjema.felter.målform.verdi] : undefined}
            legend={<Systemtittel children={'Målform'} />}
        >
            <StyledRadio
                label={målform[Målform.NB]}
                name={'registrer-søknad-målform'}
                checked={skjema.felter.målform.verdi === Målform.NB}
                onChange={() => radioOnChange(Målform.NB)}
                id={'målform-nb'}
            />
            <StyledRadio
                label={målform[Målform.NN]}
                name={'registrer-søknad-målform'}
                checked={skjema.felter.målform.verdi === Målform.NN}
                onChange={() => radioOnChange(Målform.NN)}
            />
        </StyledFamilieRadioGruppe>
    );
};

export default MålformVelger;
