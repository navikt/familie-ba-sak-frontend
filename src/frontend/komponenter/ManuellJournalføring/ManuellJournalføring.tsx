import React from 'react';

import styled from 'styled-components';

import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';

import { Journalstatus, RessursStatus } from '@navikt/familie-typer';

import {
    ManuellJournalføringProvider,
    useManuellJournalføring,
} from '../../context/ManuellJournalføringContext';
import { BrukerHeader } from './BrukerHeader';
import { DokumentPanel } from './DokumentPanel';
import { JournalføringModal } from './JournalføringModal';
import { JournalpostSkjema } from './JournalpostSkjema';

const ToKolonnerDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const ManuellJournalføringContent: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalføring();
    const [visModal, settVisModal] = React.useState(false);
    const [feilmelding, settFeilmelding] = React.useState('');
    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            return (
                <div>
                    <BrukerHeader />
                    {dataForManuellJournalføring.data.journalpost.journalstatus ===
                    Journalstatus.MOTTATT ? (
                        <div>
                            {feilmelding && <AlertStripeFeil>{feilmelding}</AlertStripeFeil>}

                            <ToKolonnerDiv>
                                <JournalpostSkjema
                                    visModal={() => settVisModal(true)}
                                    settFeilmelding={settFeilmelding}
                                />
                                <DokumentPanel />
                            </ToKolonnerDiv>
                            {visModal && (
                                <JournalføringModal
                                    gjem={() => settVisModal(false)}
                                    settFeilmelding={settFeilmelding}
                                />
                            )}
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
        <ManuellJournalføringProvider>
            <ManuellJournalføringContent />
        </ManuellJournalføringProvider>
    );
};

export default ManuellJournalføringV2;
