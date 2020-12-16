import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføring } from '../../context/ManuellJournalføringContext';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { AvsenderPanel } from './AvsenderPanel';
import { BrukerPanel } from './BrukerPanel';
import { Dokumenter } from './Dokumenter';
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

interface JournalpostSkjemaProps {
    visModal: () => void;
    settFeilmelding: (feilmelding: string) => void;
}

export const JournalpostSkjema: React.FC<JournalpostSkjemaProps> = ({
    visModal,
    settFeilmelding,
}) => {
    const {
        dataForManuellJournalføring,
        tilknyttedeBehandlingIder,
        journalfør,
        hentFeil,
        erEndret,
        tilbakestillData,
    } = useManuellJournalføring();

    const alleFeil = hentFeil() ?? [];

    const history = useHistory();

    const [senderInn, settSenderInn] = React.useState(false);

    const onClickManuellJournalfør = () => {
        if (tilknyttedeBehandlingIder.length < 1) {
            visModal();
        } else {
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
        }
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
                    <br />
                    <div>
                        <Undertittel children={'Dokumenter'} />
                        <Dokumenter />
                    </div>
                    <br />
                    <div>
                        <Undertittel children={'Bruker og avsender'} />
                        <BrukerPanel></BrukerPanel>
                        <AvsenderPanel></AvsenderPanel>
                    </div>
                    <KnyttJournalpostTilBehandling />
                    {alleFeil.length > 0 && (
                        <FeilPanel>
                            <Undertittel>For å gå videre må du rette opp følgende:</Undertittel>
                            <ul>
                                {alleFeil.map((feil, index) => (
                                    <li key={index}>{feil}</li>
                                ))}
                            </ul>
                        </FeilPanel>
                    )}
                </StyledSkjema>
            )}
        </div>
    );
};
