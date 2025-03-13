import * as React from 'react';

import styled from 'styled-components';

import { Heading, Radio, RadioGroup } from '@navikt/ds-react';

import { useBehandling } from '../../../../../context/behandlingContext/BehandlingContext';
import { useSøknad } from '../../../../../context/SøknadContext';
import {
    behandlingUnderkategori,
    BehandlingUnderkategori,
} from '../../../../../typer/behandlingstema';

const StyledRadioGroup = styled(RadioGroup)`
    margin: 2rem 0;
`;

const StyledRadio = styled(Radio)`
    padding-left: 1rem;
`;

const SøknadType: React.FunctionComponent = () => {
    const { vurderErLesevisning } = useBehandling();
    const erLesevisning = vurderErLesevisning();
    const { skjema } = useSøknad();

    const radioOnChange = (underKategori: BehandlingUnderkategori) => {
        skjema.felter.underkategori.validerOgSettFelt(underKategori);
    };

    return (
        <StyledRadioGroup
            {...skjema.felter.underkategori.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
            readOnly={erLesevisning}
            value={behandlingUnderkategori[skjema.felter.underkategori.verdi]}
            legend={<Heading size={'medium'} level={'2'} children={'Hva har bruker søkt om?'} />}
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
        </StyledRadioGroup>
    );
};

export default SøknadType;
