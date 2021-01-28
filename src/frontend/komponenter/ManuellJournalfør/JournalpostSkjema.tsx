import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalfør } from '../../context/ManuellJournalførContext';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { AvsenderPanel } from './AvsenderPanel';
import { BrukerPanel } from './BrukerPanel';
import { Dokumenter } from './Dokument/Dokumenter';
import { feilDekoratør } from './FeilDekoratør';
import { Journalpost } from './Journalpost';
import { KnyttJournalpostTilBehandling } from './KnyttJournalpostTilBehandling';

const StyledSkjema = styled(Skjemasteg)`
    min-width: 640px;
    padding-left: 40px;
    padding-bottom: 80px;
    height: calc(100vh - 3rem);
    overflow: auto;
`;

const FeilPanel = feilDekoratør(Panel);

const StyledSectionDiv = styled.div`
    margin-top: 60px;
`;

interface JournalpostSkjemaProps {
    settFeilmelding: (feilmelding: string) => void;
}

export const JournalpostSkjema: React.FC<JournalpostSkjemaProps> = ({ settFeilmelding }) => {
    const {
        dataForManuellJournalføring,
        journalfør,
        hentFeil,
        erEndret,
        tilbakestillData,
    } = useManuellJournalfør();

    const alleFeil = hentFeil() ?? [];

    const history = useHistory();

    const [senderInn, settSenderInn] = React.useState(false);

    const onClickManuellJournalfør = () => {
        settSenderInn(true);
        journalfør()
            .then(fagsak => {
                settFeilmelding(
                    fagsak.status === RessursStatus.FEILET ||
                        fagsak.status === RessursStatus.FUNKSJONELL_FEIL
                        ? `Feil ved manuelt journalfør: ${fagsak.frontendFeilmelding}`
                        : ''
                );
            })
            .finally(() => {
                settSenderInn(false);
            });
    };

    return (
        <div>
            {dataForManuellJournalføring.status === RessursStatus.SUKSESS && (
                <StyledSkjema
                    tittel={'Journalføring'}
                    forrigeKnappTittel={'Avbryt'}
                    forrigeOnClick={() => {
                        history.push(`/oppgaver`);
                    }}
                    nesteKnappTittel={alleFeil.length === 0 ? 'Journalfør' : undefined}
                    nesteOnClick={alleFeil.length === 0 ? onClickManuellJournalfør : undefined}
                    senderInn={senderInn}
                    tilbakestillOnClick={() => {
                        tilbakestillData();
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
                        {!!alleFeil.length && (
                            <FeilPanel>
                                <Undertittel>For å gå videre må du rette opp følgende:</Undertittel>
                                <ul>
                                    {alleFeil.map((feil, index) => (
                                        <li key={index}>{feil}</li>
                                    ))}
                                </ul>
                            </FeilPanel>
                        )}
                    </StyledSectionDiv>
                </StyledSkjema>
            )}
        </div>
    );
};
