import React from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Feiloppsummering } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

import { Back } from '@navikt/ds-icons';
import { Alert, Heading } from '@navikt/ds-react';
import { FamilieKnapp } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import type { OppgavetypeFilter } from '../../typer/oppgave';
import { oppgaveTypeFilter } from '../../typer/oppgave';
import Knapperekke from '../Felleskomponenter/Knapperekke';
import { AvsenderPanel } from './AvsenderPanel';
import { BrukerPanel } from './BrukerPanel';
import { Dokumenter } from './Dokument/Dokumenter';
import Journalpost from './Journalpost';
import { KnyttJournalpostTilBehandling } from './KnyttJournalpostTilBehandling';

const Container = styled.div`
    padding: 2rem;
    overflow: auto;
`;

const StyledSectionDiv = styled.div`
    margin-top: 2.5rem;
`;

const StyledIkonKnappDiv = styled.div`
    display: flex;
    align-items: center;
`;

const tilbakeKnappInnhold = (
    <StyledIkonKnappDiv>
        <Back />
        Tilbake
    </StyledIkonKnappDiv>
);

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
                <Undertittel children={'Dokumenter'} />
                <Dokumenter />
            </StyledSectionDiv>
            <StyledSectionDiv>
                <Undertittel children={'Bruker og avsender'} />
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
                    <Feiloppsummering
                        tittel={'For å gå videre må du rette opp følgende'}
                        feil={hentFeilTilOppsummering()}
                    />
                )}
            </StyledSectionDiv>

            <Knapperekke>
                <FamilieKnapp
                    mini={true}
                    erLesevisning={false}
                    onClick={() => navigate(`/oppgaver`)}
                    disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                >
                    {erLesevisning() ? tilbakeKnappInnhold : 'Avbryt'}
                </FamilieKnapp>
                <FamilieKnapp
                    mini={true}
                    type={'hoved'}
                    erLesevisning={erLesevisning()}
                    onClick={journalfør}
                    spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                    disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                >
                    Journalfør
                </FamilieKnapp>

                <FamilieKnapp
                    mini={true}
                    type={'hoved'}
                    onClick={lukkOppgaveOgKnyttJournalpostTilBehandling}
                    erLesevisning={!erLesevisning() || !kanKnytteJournalpostTilBehandling()}
                    spinner={skjema.submitRessurs.status === RessursStatus.HENTER}
                    disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                >
                    Ferdigstill oppgave
                </FamilieKnapp>
            </Knapperekke>
        </Container>
    );
};
