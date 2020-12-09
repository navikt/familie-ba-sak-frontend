import React from 'react';

import styled from 'styled-components';

import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';

import { Journalstatus, RessursStatus } from '@navikt/familie-typer';

import {
    ManuellJournalføringProviderV2,
    useManuellJournalføringV2,
} from '../../context/ManuellJournalføringContextV2';
import { BrukerHeader } from './BrukerHeader';
import { DokumentPane } from './DokumentPane';
import { JournalføringModal } from './JournalføringModal';
import { JournalpostSkjema } from './JournalpostSkjema';

const ToColonerDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const ManuellJournalføringContentV2: React.FC = () => {
    const { dataForManuellJournalføring, visModal } = useManuellJournalføringV2();

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            return (
                <div>
                    <BrukerHeader />
                    {dataForManuellJournalføring.data.journalpost.journalstatus ===
                    Journalstatus.MOTTATT ? (
                        <div>
                            <ToColonerDiv>
                                <JournalpostSkjema />
                                <DokumentPane />
                            </ToColonerDiv>
                            {visModal && <JournalføringModal />}
                        </div>
                    ) : (
                        <AlertStripeAdvarsel
                            children={`Journalposten har status ${dataForManuellJournalføring.data.journalpost.journalstatus}. Kan bare manuelt journalføre journalposter med status MOTTATT.`}
                        />
                    )}
                </div>
            );
        case RessursStatus.FEILET:
            return <AlertStripeFeil children={dataForManuellJournalføring.frontendFeilmelding} />;
        default:
            return <div />;
    }
};

const ManuellJournalføringV2: React.FC = () => {
    return (
        <ManuellJournalføringProviderV2>
            <ManuellJournalføringContentV2 />
        </ManuellJournalføringProviderV2>
    );
};

export default ManuellJournalføringV2;
