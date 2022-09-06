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
    margin-top: 1.9rem;
    margin-bottom: auto;
    height: 2.5rem;
`;

export const Samhandler: React.FC = () => {
    const { onSubmitWrapper, samhandlerSkjema } = useSamhandlerSkjema();

    const location = useLocation();
    useEffect(() => {
        if (location.state) {
            const state = location.state as { bruker: string };
            samhandlerSkjema.felter.orgnr.validerOgSettFelt(state.bruker);
            onSubmitWrapper();
        }
    }, []);

    const skjemaErLåst = samhandlerSkjema.submitRessurs.status === RessursStatus.HENTER;

    return (
        <SamhandlerContainer>
            <Innholdstittel>Søk samhandler</Innholdstittel>
            <HentSakerFlex>
                <SkjemaGruppe feil={hentFrontendFeilmelding(samhandlerSkjema.submitRessurs)}>
                    <Input
                        {...samhandlerSkjema.felter.orgnr.hentNavInputProps(
                            samhandlerSkjema.visFeilmeldinger
                        )}
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
            {samhandlerSkjema.submitRessurs.status === RessursStatus.SUKSESS ? (
                <Innholdstittel>
                    {samhandlerSkjema.submitRessurs.data.tssEksternId}{' '}
                    {samhandlerSkjema.submitRessurs.data.navn} <br />
                    {samhandlerSkjema.submitRessurs.data.adresser[0].adresseType}{' '}
                    {samhandlerSkjema.submitRessurs.data.adresser[0].postSted}
                </Innholdstittel>
            ) : undefined}
        </SamhandlerContainer>
    );
};
