import * as React from 'react';

import styled from 'styled-components';

import { Radio } from 'nav-frontend-skjema';
import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieRadioGruppe } from '@navikt/familie-form-elements/dist';

import { useBehandling } from '../../../context/BehandlingContext';
import { useSøknad } from '../../../context/SøknadContext';
import { BehandlingUnderkategori, underkategorier } from '../../../typer/behandling';

const StyledFamilieRadioGruppe = styled(FamilieRadioGruppe)`
    margin: 2rem 0;
`;

const StyledRadio = styled(Radio)`
    padding-left: 1rem;
`;

const SøknadType: React.FunctionComponent = () => {
    const { erLesevisning } = useBehandling();
    const lesevisning = erLesevisning();
    const { skjema } = useSøknad();

    const radioOnChange = (underKategori: BehandlingUnderkategori) => {
        skjema.felter.underkategori.validerOgSettFelt(underKategori);
    };

    return (
        <StyledFamilieRadioGruppe
            {...skjema.felter.underkategori.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
            erLesevisning={lesevisning}
            verdi={underkategorier[skjema.felter.underkategori.verdi].navn}
            legend={<Systemtittel children={'Hva har bruker søkt om?'} />}
        >
            <StyledRadio
                label={underkategorier[BehandlingUnderkategori.ORDINÆR].navn}
                name={'registrer-søknad-søknadtype'}
                checked={skjema.felter.underkategori.verdi === BehandlingUnderkategori.ORDINÆR}
                onChange={() => radioOnChange(BehandlingUnderkategori.ORDINÆR)}
            />
            <StyledRadio
                label={underkategorier[BehandlingUnderkategori.UTVIDET].navn}
                name={'registrer-søknad-søknadtype'}
                checked={skjema.felter.underkategori.verdi === BehandlingUnderkategori.UTVIDET}
                onChange={() => radioOnChange(BehandlingUnderkategori.UTVIDET)}
            />
        </StyledFamilieRadioGruppe>
    );
};

export default SøknadType;
