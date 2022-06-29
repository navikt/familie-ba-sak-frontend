import * as React from 'react';

import styled from 'styled-components';

import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieInput, FamilieLesefelt } from '@navikt/familie-form-elements';

import { useBehandling } from '../../../context/behandlingContext/BehandlingContext';
import { useMottakerType } from '../../../context/MottakerTypeContext';

const StyledDiv = styled.div`
    margin: 1rem 0;
`;

const StyledFamilieInpunt = styled(FamilieInput)`
    margin-top: 1.8rem;
`;

const Institusjon: React.FunctionComponent = () => {
    const { erLesevisning } = useBehandling();
    const { skjema } = useMottakerType();

    return (
        <StyledDiv className={'mottaker__institusjon'}>
            <Systemtittel children={'Opplysninger om institusjon'} />
            <br />
            <FamilieLesefelt
                {...skjema.felter.institusjon.hentNavBaseSkjemaProps(skjema.visFeilmeldinger)}
                label={'Institusjon'}
                verdi={skjema.felter.institusjon.verdi}
            />
            <StyledFamilieInpunt
                {...skjema.felter.mottaker.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                id={'valgfri-mottaker'}
                label={'Mottaker (valgfritt)'}
            />
            <StyledFamilieInpunt
                {...skjema.felter.adresse.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                id={'institusjon-adresse'}
                label={'Addresse'}
            />
            <StyledFamilieInpunt
                {...skjema.felter.postnummer.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                id={'institusjon-postnummer'}
                label={'Postnummer'}
                bredde={'S'}
            />
            <StyledFamilieInpunt
                {...skjema.felter.sted.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={erLesevisning()}
                id={'institusjon-sted'}
                label={'Sted'}
            />
        </StyledDiv>
    );
};

export default Institusjon;
