import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import Panel from 'nav-frontend-paneler';
import { Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { AvsenderPanel } from './AvsenderPanel';
import { BrukerPanel } from './BrukerPanel';
import { Dokumenter } from './Dokumenter';
import { feilPanel } from './FeilPanel';
import { Journalpost } from './Journalpost';
import { KnyttJournalpostTilBehandling } from './KnyttJournalpostTilBehandling';

const StyledSkjema = styled(Skjemasteg)`
    min-width: 640px;
    padding-left: 40px;
    padding-bottom: 40px;
`;

const FeilPanel = feilPanel(Panel);

export const JournalpostSkjema: React.FC = () => {
    const {
        dataForManuellJournalføring,
        senderInn,
        tilknyttedeBehandlingIder,
        manueltJournalfør,
        settVisModal,
        hentFeil,
    } = useManuellJournalføringV2();

    const alleFeil = hentFeil() ?? [];

    const history = useHistory();

    return (
        <div>
            {dataForManuellJournalføring.status === RessursStatus.SUKSESS && (
                <StyledSkjema
                    className={'journalføring'}
                    tittel={'Journalføring'}
                    forrigeKnappTittel={'Avbryt'}
                    forrigeOnClick={() => {
                        history.push(`/oppgaver`);
                    }}
                    nesteKnappTittel={alleFeil.length === 0 ? 'Journalfør' : undefined}
                    nesteOnClick={
                        alleFeil.length === 0
                            ? () => {
                                  if (tilknyttedeBehandlingIder.length < 1) {
                                      settVisModal(true);
                                  } else {
                                      manueltJournalfør();
                                  }
                              }
                            : undefined
                    }
                    senderInn={senderInn}
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
