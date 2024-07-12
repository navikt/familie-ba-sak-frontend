import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ChevronLeftIcon } from '@navikt/aksel-icons';
import { Alert, Button, ErrorMessage, ErrorSummary, Heading } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';

import { AvsenderPanel } from './AvsenderPanel';
import { BrukerPanel } from './BrukerPanel';
import { Dokumenter } from './Dokument/Dokumenter';
import Journalpost from './Journalpost';
import { KnyttJournalpostTilBehandling } from './KnyttJournalpostTilBehandling';
import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import { FagsakType } from '../../typer/fagsak';
import type { OppgavetypeFilter } from '../../typer/oppgave';
import { oppgaveTypeFilter } from '../../typer/oppgave';
import Knapperekke from '../Felleskomponenter/Knapperekke';

const Container = styled.div`
    padding: 2rem;
    overflow-y: scroll;
`;

const StyledSectionDiv = styled.div`
    margin-top: 2.5rem;
`;

export const JournalpostSkjema: React.FC = () => {
    const {
        dataForManuellJournalføring,
        skjema,
        journalfør,
        hentFeilTilOppsummering,
        erLesevisning,
        lukkOppgaveOgKnyttJournalpostTilBehandling,
        kanKnytteJournalpostTilBehandling,
    } = useManuellJournalfør();

    const navigate = useNavigate();
    const [valideringsfeilmelding, settValideringsfeilmelding] = useState<string>('');

    const validerOgJournalfør = (): void => {
        if (
            skjema.felter.fagsakType.verdi === FagsakType.INSTITUSJON &&
            skjema.felter.samhandler.verdi === undefined
        ) {
            settValideringsfeilmelding(
                'Det er registrert at søker er institusjon. For å journalføre, må fagsak av typen institusjon først opprettes i saksbehandlingsløsningen. Deretter kan fagsaken velges i nedtrekkslisten i bruker/søker-panelet over.'
            );
        } else {
            journalfør();
        }
    };

    return (
        <Container>
            {dataForManuellJournalføring.status === RessursStatus.SUKSESS && (
                <Heading spacing size="medium" level="2">
                    {
                        oppgaveTypeFilter[
                            dataForManuellJournalføring.data.oppgave
                                .oppgavetype as keyof typeof OppgavetypeFilter
                        ].navn
                    }
                </Heading>
            )}
            <Journalpost />
            <StyledSectionDiv>
                <Heading size={'small'} level={'2'} children={'Dokumenter'} />
                <Dokumenter />
            </StyledSectionDiv>
            <StyledSectionDiv>
                <Heading size={'small'} level={'2'} children={'Bruker og avsender'} />
                <BrukerPanel />
                <br />
                <AvsenderPanel />
            </StyledSectionDiv>

            <StyledSectionDiv>
                {kanKnytteJournalpostTilBehandling() && <KnyttJournalpostTilBehandling />}
                <br />
                {(skjema.submitRessurs.status === RessursStatus.FEILET ||
                    skjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                    skjema.submitRessurs.status === RessursStatus.IKKE_TILGANG) && (
                    <Alert variant="error">{skjema.submitRessurs.frontendFeilmelding}</Alert>
                )}
                {skjema.visFeilmeldinger && hentFeilTilOppsummering().length > 0 && (
                    <ErrorSummary heading={'For å gå videre må du rette opp følgende'} size="small">
                        {hentFeilTilOppsummering().map(item => (
                            <ErrorSummary.Item href={`#${item.skjemaelementId}`}>
                                {item.feilmelding}
                            </ErrorSummary.Item>
                        ))}
                    </ErrorSummary>
                )}
            </StyledSectionDiv>

            <Knapperekke>
                <Button
                    size="small"
                    variant={'secondary'}
                    onClick={() => navigate(`/oppgaver`)}
                    disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                    icon={erLesevisning() && <ChevronLeftIcon />}
                >
                    {erLesevisning() ? 'Tilbake' : 'Avbryt'}
                </Button>
                {!erLesevisning() && (
                    <Button
                        size="small"
                        variant="primary"
                        onClick={validerOgJournalfør}
                        loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                        disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                    >
                        Journalfør
                    </Button>
                )}
                {erLesevisning() && kanKnytteJournalpostTilBehandling() && (
                    <Button
                        size="small"
                        variant="primary"
                        onClick={lukkOppgaveOgKnyttJournalpostTilBehandling}
                        loading={skjema.submitRessurs.status === RessursStatus.HENTER}
                        disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                    >
                        Ferdigstill oppgave
                    </Button>
                )}
            </Knapperekke>
            {valideringsfeilmelding && <ErrorMessage>{valideringsfeilmelding}</ErrorMessage>}
        </Container>
    );
};
