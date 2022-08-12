import * as React from 'react';
import { useState } from 'react';

import styled from 'styled-components';

import { Systemtittel } from 'nav-frontend-typografi';

import { FamilieInput, FamilieKnapp } from '@navikt/familie-form-elements';

import { useMottakerType } from '../../../context/MottakerTypeContext';

const StyledDiv = styled.div`
    margin: 1rem 0;
`;

const StyledKnapp = styled(FamilieKnapp)`
    margin-top: 0.3rem;
    height: 1rem;
`;

const StyledFamilieInpunt = styled(FamilieInput)`
    margin-top: 1.8rem;
`;

const Verge: React.FunctionComponent = () => {
    const { hentPerson, lesevisning, registrertVerge, skjema } = useMottakerType();
    const [spinner, settSpinner] = useState(false);

    if (registrertVerge) {
        const adresse = registrertVerge.adresse.split('\n').at(0);
        const postnummerOgSted = registrertVerge.adresse.split('\n').at(1);
        skjema.felter.fødselsnummer.validerOgSettFelt(registrertVerge.ident || ' ');
        skjema.felter.navn.validerOgSettFelt(registrertVerge.navn);
        skjema.felter.adresse.validerOgSettFelt(adresse || '');
        skjema.felter.postnummer.validerOgSettFelt(postnummerOgSted?.split(' ')?.at(0) || '');
        skjema.felter.sted.validerOgSettFelt(postnummerOgSted?.split(' ')?.at(1) || '');
    }

    return (
        <StyledDiv className={'mottaker__verge'}>
            <Systemtittel children={'Opplysninger om verge'} />
            <br />
            <FamilieInput
                {...skjema.felter.fødselsnummer.hentNavInputProps(true)}
                erLesevisning={lesevisning()}
                id={'hent-verge-person'}
                label={'Fødselsnummer (valgfritt)'}
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
                erLesevisning={lesevisning()}
            />
            <StyledFamilieInpunt
                {...skjema.felter.navn.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={lesevisning()}
                id={'verge-navn'}
                label={'Vergens navn'}
            />
            <StyledFamilieInpunt
                {...skjema.felter.adresse.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={lesevisning()}
                id={'verge-adresse'}
                label={'Adresse'}
            />
            <StyledFamilieInpunt
                {...skjema.felter.postnummer.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={lesevisning()}
                id={'verge-postnummer'}
                label={'Postnummer'}
                bredde={'S'}
            />
            <StyledFamilieInpunt
                {...skjema.felter.sted.hentNavInputProps(skjema.visFeilmeldinger)}
                erLesevisning={lesevisning()}
                id={'verge-sted'}
                label={'Sted'}
                tekstLesevisning={''}
            />
        </StyledDiv>
    );
};

export default Verge;
