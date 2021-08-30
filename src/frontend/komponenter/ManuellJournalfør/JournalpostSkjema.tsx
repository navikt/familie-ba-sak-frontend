import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Feiloppsummering } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

import { FamilieKnapp } from '@navikt/familie-form-elements';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
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

export const JournalpostSkjema: React.FC = () => {
    const { skjema, journalfør, hentFeilTilOppsummering, erLesevisning } = useManuellJournalfør();

    const history = useHistory();

    return (
        <Container>
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
                {!erLesevisning() && <KnyttJournalpostTilBehandling />}
                <br />
                {(skjema.submitRessurs.status === RessursStatus.FEILET ||
                    skjema.submitRessurs.status === RessursStatus.FUNKSJONELL_FEIL ||
                    skjema.submitRessurs.status === RessursStatus.IKKE_TILGANG) && (
                    <AlertStripeFeil>{skjema.submitRessurs.frontendFeilmelding}</AlertStripeFeil>
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
                    onClick={() => history.push(`/oppgaver`)}
                    disabled={skjema.submitRessurs.status === RessursStatus.HENTER}
                >
                    Avbryt
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
            </Knapperekke>
        </Container>
    );
};
