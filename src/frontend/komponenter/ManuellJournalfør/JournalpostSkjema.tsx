import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Feiloppsummering } from 'nav-frontend-skjema';
import { Undertittel } from 'nav-frontend-typografi';

import { Felt, Valideringsstatus } from '@navikt/familie-skjema';
import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { AvsenderPanel } from './AvsenderPanel';
import { BrukerPanel } from './BrukerPanel';
import { Dokumenter } from './Dokument/Dokumenter';
import Journalpost from './Journalpost';
import { KnyttJournalpostTilBehandling } from './KnyttJournalpostTilBehandling';

const StyledSkjema = styled(Skjemasteg)`
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
    const {
        skjema,
        nullstillSkjema,
        dataForManuellJournalføring,
        journalfør,
        erEndret,
    } = useManuellJournalfør();

    const history = useHistory();

    return (
        <div>
            {dataForManuellJournalføring.status === RessursStatus.SUKSESS && (
                <StyledSkjema
                    tittel={'Journalføring'}
                    forrigeKnappTittel={'Avbryt'}
                    forrigeOnClick={() => {
                        history.push(`/oppgaver`);
                    }}
                    nesteKnappTittel={'Journalfør'}
                    nesteOnClick={journalfør}
                    senderInn={skjema.submitRessurs.status === RessursStatus.HENTER}
                    tilbakestillOnClick={() => {
                        nullstillSkjema();
                    }}
                    skalViseTilbakestillKnapp={erEndret()}
                >
                    <Journalpost />
                    <StyledSectionDiv>
                        <Undertittel children={'Dokumenter'} />
                        <Dokumenter />
                    </StyledSectionDiv>
                    <StyledSectionDiv>
                        <Undertittel children={'Bruker og avsender'} />
                        <BrukerPanel></BrukerPanel>
                        <AvsenderPanel></AvsenderPanel>
                    </StyledSectionDiv>
                    <StyledSectionDiv>
                        <KnyttJournalpostTilBehandling />
                        <br />
                        {/*TODO hente fra skjema*/}
                        {skjema.visFeilmeldinger && (
                            <Feiloppsummering
                                tittel={'For å gå videre må du rette opp følgende'}
                                feil={Object.values(skjema.felter)
                                    .filter(
                                        felt =>
                                            (felt as Felt<unknown>).valideringsstatus ===
                                            Valideringsstatus.FEIL
                                    )
                                    .map(felt => ({
                                        skjemaelementId: '',
                                        feilmelding: felt.feilmelding,
                                    }))}
                            />
                        )}
                    </StyledSectionDiv>
                </StyledSkjema>
            )}
        </div>
    );
};
