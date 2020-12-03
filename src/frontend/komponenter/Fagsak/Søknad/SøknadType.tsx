import * as React from 'react';

import styled from 'styled-components';

import { Radio } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieRadioGruppe } from '@navikt/familie-form-elements/dist';

import { useBehandling } from '../../../context/BehandlingContext';
import { BehandlingUnderkategori, underkategorier } from '../../../typer/behandling';
import { ISøknadDTO } from '../../../typer/søknad';

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

const SøknadType: React.FunctionComponent<IProps> = ({ settSøknadOgValider, søknad }) => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();

    const radioOnChange = (underKategori: BehandlingUnderkategori) => {
        settSøknadOgValider({
            ...søknad,
            underkategori: underKategori,
        });
    };

    return (
        <StyledFamilieRadioGruppe
            erLesevisning={lesevisning}
            verdi={underkategorier[søknad.underkategori].navn}
            legend={<Systemtittel children={'Hva har bruker søkt om?'} />}
        >
            <StyledRadio
                label={underkategorier[BehandlingUnderkategori.ORDINÆR].navn}
                name={'registrer-søknad-søknadtype'}
                checked={søknad.underkategori === BehandlingUnderkategori.ORDINÆR}
                onChange={() => radioOnChange(BehandlingUnderkategori.ORDINÆR)}
            />
            <StyledRadio
                label={underkategorier[BehandlingUnderkategori.UTVIDET].navn}
                name={'registrer-søknad-søknadtype'}
                checked={søknad.underkategori === BehandlingUnderkategori.UTVIDET}
                onChange={() => radioOnChange(BehandlingUnderkategori.UTVIDET)}
            />
        </StyledFamilieRadioGruppe>
    );
};

export default SøknadType;
