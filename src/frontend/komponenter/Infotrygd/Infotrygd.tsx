import React, { useEffect } from 'react';

import { useHistory } from 'react-router';
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
    const { ident, onSubmitWrapper, skjema } = useInfotrygdSkjema();
    const { flyttBrukerTilBaSak, migrerInfotrygdSakRessurs } = useInfotrygdMigrering();

    const history = useHistory<{ bruker: string } | undefined>();
    useEffect(() => {
        if (history.location.state) {
            skjema.felter.ident.verdi = history.location.state.bruker;
            onSubmitWrapper();
        }
    }, []);

    const skjemaErLåst = skjema.submitRessurs.status === RessursStatus.HENTER;
    const knappMigrerErLåst = migrerInfotrygdSakRessurs.status !== RessursStatus.IKKE_HENTET;

    const visFlyttSakKnapp = () => {
        if (skjema.submitRessurs.status === RessursStatus.SUKSESS) {
            return (
                <FlyttSakKnapp
                    mini
                    disabled={knappMigrerErLåst}
                    onClick={() => {
                        flyttBrukerTilBaSak(ident);
                    }}
                >
                    Flytt til BA-sak
                </FlyttSakKnapp>
            );
        }
    };

    const visFlyttSakAlert = () => {
        if (
            migrerInfotrygdSakRessurs.status === RessursStatus.FEILET ||
            migrerInfotrygdSakRessurs.status === RessursStatus.FUNKSJONELL_FEIL
        ) {
            return (
                <AlertStripe
                    children={migrerInfotrygdSakRessurs.frontendFeilmelding}
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
                <Infotrygdtabeller ident={ident} saker={skjema.submitRessurs.data.saker} />
            ) : undefined}
        </InfotrygdContainer>
    );
};
