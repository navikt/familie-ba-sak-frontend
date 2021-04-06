import React from 'react';

import styled from 'styled-components';

import AlertStripe from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { hentFrontendFeilmelding } from '../../utils/ressursUtils';
import { Infotrygdtabeller } from './Infotrygdtabeller';
import { useInfotrygdSkjema, useInfotrygdMigrering } from './useInfotrygd';

const InfotrygdContainer = styled.div`
    padding: 1rem;
    overflow: auto;
    height: calc(100vh - 50px);
`;

const HentSakerFlex = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
`;

const HentSakerKnapp = styled(Knapp)`
    margin-left: 1rem;
    margin-top: 30px;
    margin-bottom: auto;
    height: 40px;
`;

const FlyttSakKnapp = styled(Knapp)`
    margin-left: 1rem;
    margin-top: 30px;
    margint-bottom: auto;
    height: 40px;
`;

export const Infotrygd: React.FC = () => {
    const { onSubmitWrapper, skjema } = useInfotrygdSkjema();
    const { flyttBrukerTilBaSak, infotrygdmigreringRessurs } = useInfotrygdMigrering();

    const skjemaErLåst = skjema.submitRessurs.status === RessursStatus.HENTER;

    const visFlyttSakKnapp = () => {
        if (skjema.submitRessurs.status === RessursStatus.SUKSESS) {
            return (
                <FlyttSakKnapp
                    mini
                    onClick={() => {
                        flyttBrukerTilBaSak(skjema.felter.ident.verdi);
                    }}
                >
                    Flytt til BA-sak
                </FlyttSakKnapp>
            );
        }
    };

    const visFlyttSakAlert = () => {
        if (
            infotrygdmigreringRessurs.status === RessursStatus.FEILET ||
            infotrygdmigreringRessurs.status === RessursStatus.FUNKSJONELL_FEIL
        ) {
            return (
                <AlertStripe
                    children={infotrygdmigreringRessurs.frontendFeilmelding}
                    type={'feil'}
                />
            );
        }
    };

    return (
        <InfotrygdContainer>
            <Innholdstittel>Visningsside for Infotrygd</Innholdstittel>
            <HentSakerFlex>
                <SkjemaGruppe feil={hentFrontendFeilmelding(skjema.submitRessurs)}>
                    <Input
                        {...skjema.felter.ident.hentNavInputProps(skjema.visFeilmeldinger)}
                        id={'hent-person'}
                        label={'Skriv inn fødselsnummer/D-nummer'}
                        bredde={'XL'}
                        placeholder={'fnr/dnr'}
                    />
                </SkjemaGruppe>
                <HentSakerKnapp
                    mini
                    spinner={skjemaErLåst}
                    disabled={skjemaErLåst}
                    onClick={onSubmitWrapper}
                >
                    Hent saker
                </HentSakerKnapp>
                {visFlyttSakKnapp()}
            </HentSakerFlex>
            {visFlyttSakAlert()}
            {skjema.submitRessurs.status === RessursStatus.SUKSESS ? (
                <Infotrygdtabeller saker={skjema.submitRessurs.data.saker} />
            ) : undefined}
        </InfotrygdContainer>
    );
};
