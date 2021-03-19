import React from 'react';

import styled from 'styled-components';

import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';

import { Journalstatus, RessursStatus } from '@navikt/familie-typer';

import {
    ManuellJournalførProvider,
    useManuellJournalfør,
} from '../../context/ManuellJournalførContext';
import { BrukerHeader } from './BrukerHeader';
import { DokumentPanel } from './Dokument/DokumentPanel';
import { JournalpostSkjema } from './JournalpostSkjema';

const ToKolonnerDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const ManuellJournalførContent: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalfør();

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            return (
                <>
                    <BrukerHeader />

                    {dataForManuellJournalføring.data.journalpost.journalstatus !==
                        Journalstatus.MOTTATT && (
                        <>
                            <AlertStripeAdvarsel
                                children={`Journalposten har status ${dataForManuellJournalføring.data.journalpost.journalstatus} og er allerede journalført.`}
                            />
                            <br />
                        </>
                    )}

                    <ToKolonnerDiv>
                        <JournalpostSkjema />
                        <DokumentPanel />
                    </ToKolonnerDiv>
                </>
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
        case RessursStatus.IKKE_TILGANG:
            return <AlertStripeFeil children={dataForManuellJournalføring.frontendFeilmelding} />;
        default:
            return <div />;
    }
};

const ManuellJournalfør: React.FC = () => {
    return (
        <ManuellJournalførProvider>
            <ManuellJournalførContent />
        </ManuellJournalførProvider>
    );
};

export default ManuellJournalfør;
