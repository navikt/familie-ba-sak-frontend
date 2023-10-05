import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Heading, TextField } from '@navikt/ds-react';
import { FamilieKnapp } from '@navikt/familie-form-elements';

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

const StyledTextField = styled(TextField)`
    margin-top: 1.8rem;
`;

const Verge: React.FunctionComponent<IProps> = ({ erLesevisning }) => {
    const { hentPerson, skjema } = useInstitusjonOgVerge();
    const [spinner, settSpinner] = useState(false);

    return (
        <StyledDiv className={'mottaker__verge'}>
            <Heading size={'medium'} children={'Opplysninger om verge'} />
            <br />
            <TextField
                {...skjema.felter.fødselsnummer.hentNavInputProps(true)}
                readOnly={erLesevisning}
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
                loading={spinner}
                size="small"
                variant="secondary"
                erLesevisning={false}
            />
            <StyledTextField
                {...skjema.felter.navn.hentNavInputProps(skjema.visFeilmeldinger)}
                readOnly={true}
                id={'verge-navn'}
                label={'Vergens navn'}
            />
            <StyledTextField
                {...skjema.felter.adresse.hentNavInputProps(skjema.visFeilmeldinger)}
                readOnly={true}
                id={'verge-adresse'}
                label={'Adresse'}
            />
            <StyledTextField
                {...skjema.felter.postnummer.hentNavInputProps(skjema.visFeilmeldinger)}
                readOnly={true}
                id={'verge-postnummer'}
                label={'Postnummer'}
                size={'small'}
            />
            <StyledTextField
                {...skjema.felter.sted.hentNavInputProps(skjema.visFeilmeldinger)}
                readOnly={true}
                id={'verge-sted'}
                label={'Sted'}
            />
        </StyledDiv>
    );
};

export default Verge;
