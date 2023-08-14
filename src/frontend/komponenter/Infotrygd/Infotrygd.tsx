import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Input } from 'nav-frontend-skjema';

import { Button, Fieldset, Heading } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { Infotrygdtabeller } from './Infotrygdtabeller';
import { useInfotrygdSkjema } from './useInfotrygd';
import { hentFrontendFeilmelding } from '../../utils/ressursUtils';

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

const HentSakerButton = styled(Button)`
    margin-left: 1rem;
    margin-top: 30px;
    margin-bottom: auto;
    height: 40px;
`;

export const Infotrygd: React.FC = () => {
    const { ident, onSubmitWrapper, skjema } = useInfotrygdSkjema();

    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            const state = location.state as { bruker: string };
            skjema.felter.ident.verdi = state.bruker;
            onSubmitWrapper();
        }
    }, []);

    const skjemaErLåst = skjema.submitRessurs.status === RessursStatus.HENTER;

    return (
        <InfotrygdContainer>
            <Heading size={'large'} level={'1'}>
                Visningsside for Infotrygd
            </Heading>
            <HentSakerFlex>
                <Fieldset
                    error={hentFrontendFeilmelding(skjema.submitRessurs)}
                    legend="søk infotrygd på fødselsnummer eller d-nummer"
                    hideLegend
                >
                    <Input
                        {...skjema.felter.ident.hentNavInputProps(skjema.visFeilmeldinger)}
                        id={'hent-person'}
                        label={'Skriv inn fødselsnummer/D-nummer'}
                        bredde={'XL'}
                        placeholder={'fnr/dnr'}
                    />
                </Fieldset>
                <HentSakerButton
                    variant={'secondary'}
                    size={'small'}
                    spinner={skjemaErLåst}
                    disabled={skjemaErLåst}
                    onClick={onSubmitWrapper}
                >
                    Hent saker
                </HentSakerButton>
            </HentSakerFlex>
            {skjema.submitRessurs.status === RessursStatus.SUKSESS ? (
                <Infotrygdtabeller ident={ident} saker={skjema.submitRessurs.data.saker} />
            ) : undefined}
        </InfotrygdContainer>
    );
};
