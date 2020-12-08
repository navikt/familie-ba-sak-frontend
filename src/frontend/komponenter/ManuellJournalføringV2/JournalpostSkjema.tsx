import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { Undertittel } from 'nav-frontend-typografi';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { AvsenderPanel } from './AvsenderPanel';
import { BrukerPanel } from './BrukerPanel';
import { Dokumenter } from './Dokumenter';
import { JournalførMotSak } from './JournalførMotSak';
import { Journalpost } from './Journalpost';
import { KnyttJournalpostTilBehandling } from './KnyttJournalpostTilBehandling';

const StyledSkjema = styled(Skjemasteg)`
    min-width: 640px;
    padding-left: 40px;
    padding-bottom: 40px;
`;

export const JournalpostSkjema: React.FC = () => {
    const {
        dataForManuellJournalføring,
        hentAktivBehandlingForJournalføring,
        senderInn,
        tilknyttedeBehandlingIder,
        manueltJournalfør,
        settVisModal,
    } = useManuellJournalføringV2();

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
                    nesteKnappTittel={'Journalfør'}
                    nesteOnClick={() => {
                        if (tilknyttedeBehandlingIder.length < 1) {
                            settVisModal(true);
                        } else {
                            manueltJournalfør();
                        }
                    }}
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
                    <JournalførMotSak></JournalførMotSak>
                    <KnyttJournalpostTilBehandling
                        aktivBehandling={hentAktivBehandlingForJournalføring()}
                        dataForManuellJournalføring={dataForManuellJournalføring.data}
                    ></KnyttJournalpostTilBehandling>
                </StyledSkjema>
            )}
        </div>
    );
};
