import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

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

const StyledSkjema = styled.div`
    padding: 2rem;
    max-width: 40rem;
    min-width: 640px;
    padding-left: 40px;
    padding-bottom: 80px;
    height: calc(100vh - 3rem);
    overflow: auto;
`;

const StyledSectionDiv = styled.div`
    margin-top: 40px;
`;

export const JournalpostSkjema: React.FC = () => {
    const { skjema, journalfør, hentFeilTilOppsummering, erLesevisning } = useManuellJournalfør();

    const history = useHistory();

    return (
        <StyledSkjema>
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
        </StyledSkjema>
    );
};
