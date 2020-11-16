import { RessursStatus } from '@navikt/familie-typer';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import React from 'react';
import {
    ManuellJournalføringProviderV2,
    useManuellJournalføringV2,
} from '../../context/ManuellJournalføringContextV2';
import { Dokumenter } from './Dokumenter';
import { Dokument as PdfDokument } from '../Felleskomponenter/PdfVisningModal/PdfVisningModal';
import styled from 'styled-components';

const PageSplit = styled.div`
    display: flex;
    flex-direction: row;
`;

const ScrollDiv = styled.div`
    width: 40rem;
    height: 50rem;
    overflow-y: scroll;
`;

const ManuellJournalføringContentV2: React.FC = () => {
    const { dataForManuellJournalføring, visDokument, dokumentData } = useManuellJournalføringV2();

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            return (
                <PageSplit>
                    <Dokumenter />
                    <ScrollDiv>{visDokument && <PdfDokument pdfdata={dokumentData} />}</ScrollDiv>
                </PageSplit>
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
