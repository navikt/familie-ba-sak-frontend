import * as React from 'react';

import styled from 'styled-components';

import { Radio } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieRadioGruppe } from '@navikt/familie-form-elements/dist';

import { useBehandling } from '../../../context/BehandlingContext';
import { ISøknadDTO, Målform, målform } from '../../../typer/søknad';

interface IProps {
    settSøknadOgValider: (søknad: ISøknadDTO) => void;
    søknad: ISøknadDTO;
}

const StyledFamilieRadioGruppe = styled(FamilieRadioGruppe)`
    margin: 2rem 0;
`;

const StyledRadio = styled(Radio)`
    padding-left: 1rem;
`;

const MålformVelger: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    const radioOnChange = (målform: Målform) => {
        settSøknadOgValider({
            ...søknad,
            søkerMedOpplysninger: {
                ...søknad.søkerMedOpplysninger,
                målform: målform,
            },
        });
    };

    return (
        <StyledFamilieRadioGruppe
            erLesevisning={lesevisning}
            verdi={
                søknad.søkerMedOpplysninger.målform
                    ? målform[søknad.søkerMedOpplysninger.målform]
                    : undefined
            }
            legend={<Systemtittel children={'Målform'} />}
        >
            <StyledRadio
                label={målform[Målform.NB]}
                name={'registrer-søknad-målform'}
                checked={søknad.søkerMedOpplysninger.målform === Målform.NB}
                onChange={() => radioOnChange(Målform.NB)}
            />
            <StyledRadio
                label={målform[Målform.NN]}
                name={'registrer-søknad-målform'}
                checked={søknad.søkerMedOpplysninger.målform === Målform.NN}
                onChange={() => radioOnChange(Målform.NN)}
            />
        </StyledFamilieRadioGruppe>
    );
};

export default MålformVelger;
