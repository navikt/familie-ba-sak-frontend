import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieInput, FamilieKnapp } from '@navikt/familie-form-elements';

import { useInstitusjonOgVerge } from '../../../context/InstitusjonOgVergeContext';

interface IProps {
    erLesevisning: boolean;
}

const StyledDiv = styled.div`
    margin: 1rem 0;
`;

const StyledKnapp = styled(FamilieKnapp)`
    margin-top: 0.3rem;
    height: 1rem;
`;

const StyledFamilieInput = styled(FamilieInput)`
    margin-top: 1.8rem;
`;

const Verge: React.FunctionComponent<IProps> = ({ erLesevisning }) => {
    const { hentPerson, skjema } = useInstitusjonOgVerge();
    const [spinner, settSpinner] = useState(false);

    return (
        <StyledDiv className={'mottaker__verge'}>
            <Systemtittel children={'Opplysninger om verge'} />
            <br />
            <FamilieInput
                {...skjema.felter.fødselsnummer.hentNavInputProps(true)}
                erLesevisning={erLesevisning}
                id={'hent-verge-person'}
                label={'Fødselsnummer'}
            />
            <StyledKnapp
                onClick={() => {
                    settSpinner(true);
                    hentPerson().finally(() => {
                        settSpinner(false);
                    });
                }}
                children={'Hent informasjon fra folkeregisteret'}
                spinner={spinner}
                mini={true}
                kompakt={true}
                erLesevisning={false}
            />
            <StyledFamilieInput
                {...skjema.felter.navn.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={true}
                id={'verge-navn'}
                label={'Vergens navn'}
                tekstLesevisning={''}
            />
            <StyledFamilieInput
                {...skjema.felter.adresse.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={true}
                id={'verge-adresse'}
                label={'Adresse'}
                tekstLesevisning={''}
            />
            <StyledFamilieInput
                {...skjema.felter.postnummer.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={true}
                id={'verge-postnummer'}
                label={'Postnummer'}
                bredde={'S'}
                tekstLesevisning={''}
            />
            <StyledFamilieInput
                {...skjema.felter.sted.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={true}
                id={'verge-sted'}
                label={'Sted'}
                tekstLesevisning={''}
            />
        </StyledDiv>
    );
};

export default Verge;
