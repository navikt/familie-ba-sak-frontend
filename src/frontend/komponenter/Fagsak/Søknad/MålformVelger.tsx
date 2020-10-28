import * as React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { useBehandling } from '../../../context/BehandlingContext';
import { ISøknadDTO, Målform, målform } from '../../../typer/søknad';
import { Radio } from 'nav-frontend-skjema';
import { FamilieRadioGruppe } from '@navikt/familie-form-elements/dist';
import styled from 'styled-components';

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
                    ? målform[søknad.søkerMedOpplysninger.målform].navn
                    : undefined
            }
            legend={<Systemtittel children={'Målform'} />}
        >
            <StyledRadio
                label={målform[Målform.NB].navn}
                name={'registrer-søknad-målform'}
                checked={søknad.søkerMedOpplysninger.målform === Målform.NB}
                onChange={() => radioOnChange(Målform.NB)}
            />
            <StyledRadio
                label={målform[Målform.NN].navn}
                name={'registrer-søknad-målform'}
                checked={søknad.søkerMedOpplysninger.målform === Målform.NN}
                onChange={() => radioOnChange(Målform.NN)}
            />
        </StyledFamilieRadioGruppe>
    );
};

export default MålformVelger;
