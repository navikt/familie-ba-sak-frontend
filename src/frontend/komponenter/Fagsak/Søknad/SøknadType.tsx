import * as React from 'react';

import styled from 'styled-components';

import { Heading, Radio } from '@navikt/ds-react';
import { FamilieRadioGruppe } from '@navikt/familie-form-elements/dist';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useSøknad } from '../../../context/SøknadContext';
import { behandlingUnderkategori, BehandlingUnderkategori } from '../../../typer/behandlingstema';

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
            value={behandlingUnderkategori[skjema.felter.underkategori.verdi]}
            legend={<Heading size={'medium'} children={'Hva har bruker søkt om?'} />}
        >
            <StyledRadio
                value={behandlingUnderkategori[BehandlingUnderkategori.ORDINÆR]}
                name={'registrer-søknad-søknadtype'}
                checked={skjema.felter.underkategori.verdi === BehandlingUnderkategori.ORDINÆR}
                onChange={() => radioOnChange(BehandlingUnderkategori.ORDINÆR)}
            >
                {behandlingUnderkategori[BehandlingUnderkategori.ORDINÆR]}
            </StyledRadio>
            <StyledRadio
                value={behandlingUnderkategori[BehandlingUnderkategori.UTVIDET]}
                name={'registrer-søknad-søknadtype'}
                checked={skjema.felter.underkategori.verdi === BehandlingUnderkategori.UTVIDET}
                onChange={() => radioOnChange(BehandlingUnderkategori.UTVIDET)}
            >
                {behandlingUnderkategori[BehandlingUnderkategori.UTVIDET]}
            </StyledRadio>
        </StyledFamilieRadioGruppe>
    );
};

export default SøknadType;
