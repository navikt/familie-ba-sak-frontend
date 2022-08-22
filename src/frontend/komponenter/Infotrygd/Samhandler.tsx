import React, { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { Knapp } from 'nav-frontend-knapper';
import { Input, SkjemaGruppe } from 'nav-frontend-skjema';
import { Innholdstittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { hentFrontendFeilmelding } from '../../utils/ressursUtils';
import { useSamhandlerSkjema } from '../Fagsak/InstitusjonOgVerge/useSamhandler';

const SamhandlerContainer = styled.div`
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

export const Samhandler: React.FC = () => {
    const { onSubmitWrapper, skjema } = useSamhandlerSkjema();

    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            const state = location.state as { bruker: string };
            skjema.felter.orgnr.verdi = state.bruker;
            onSubmitWrapper();
        }
    }, []);

    const skjemaErLåst = skjema.submitRessurs.status === RessursStatus.HENTER;

    return (
        <SamhandlerContainer>
            <Innholdstittel>Søk samhandler</Innholdstittel>
            <HentSakerFlex>
                <SkjemaGruppe feil={hentFrontendFeilmelding(skjema.submitRessurs)}>
                    <Input
                        {...skjema.felter.orgnr.hentNavInputProps(skjema.visFeilmeldinger)}
                        id={'hent-samhandler'}
                        label={'Skriv inn orgnr'}
                        bredde={'XL'}
                        placeholder={'orgnr'}
                    />
                </SkjemaGruppe>
                <HentSakerKnapp
                    mini
                    spinner={skjemaErLåst}
                    disabled={skjemaErLåst}
                    onClick={onSubmitWrapper}
                >
                    Hent samhandler
                </HentSakerKnapp>
            </HentSakerFlex>
            {skjema.submitRessurs.status === RessursStatus.SUKSESS ? (
                <Innholdstittel>
                    {skjema.submitRessurs.data.tssEksternId} {skjema.submitRessurs.data.navn} <br />
                    {skjema.submitRessurs.data.adressser[0].adresseType}{' '}
                    {skjema.submitRessurs.data.adressser[0].postSted}
                </Innholdstittel>
            ) : undefined}
        </SamhandlerContainer>
    );
};
