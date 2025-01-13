import React, { useEffect } from 'react';

import { useLocation } from 'react-router';
import styled from 'styled-components';

import { Fieldset, TextField, Button, Heading } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { hentFrontendFeilmelding } from '../../utils/ressursUtils';
import { useSamhandlerSkjema } from '../Fagsak/Institusjon/useSamhandler';

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

const HentSakerButton = styled(Button)`
    margin-left: 1rem;
    margin-top: 2rem;
    margin-bottom: auto;
    height: 3rem;
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
            <Heading size={'large'} level={'1'}>
                Søk samhandler
            </Heading>
            <HentSakerFlex>
                <Fieldset
                    error={hentFrontendFeilmelding(samhandlerSkjema.submitRessurs)}
                    legend="Søk samhandler"
                    hideLegend
                >
                    <TextField
                        {...samhandlerSkjema.felter.orgnr.hentNavInputProps(
                            samhandlerSkjema.visFeilmeldinger
                        )}
                        id={'hent-samhandler'}
                        label={'Skriv inn orgnr'}
                        size="medium"
                        placeholder={'orgnr'}
                    />
                </Fieldset>
                <HentSakerButton
                    variant={'secondary'}
                    loading={skjemaErLåst}
                    disabled={skjemaErLåst}
                    onClick={onSubmitWrapper}
                >
                    Hent samhandler
                </HentSakerButton>
            </HentSakerFlex>
            {samhandlerSkjema.submitRessurs.status === RessursStatus.SUKSESS ? (
                <Heading size={'large'}>
                    {samhandlerSkjema.submitRessurs.data.tssEksternId}{' '}
                    {samhandlerSkjema.submitRessurs.data.navn} <br />
                    {samhandlerSkjema.submitRessurs.data.adresser[0].adresseType}{' '}
                    {samhandlerSkjema.submitRessurs.data.adresser[0].postSted}
                </Heading>
            ) : undefined}
        </SamhandlerContainer>
    );
};
