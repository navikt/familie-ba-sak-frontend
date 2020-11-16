import { RessursStatus } from '@navikt/familie-typer';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import React from 'react';
import {
    ManuellJournalføringProviderV2,
    useManuellJournalføringV2,
} from '../../context/ManuellJournalføringContextV2';
import { Dokumenter } from './Dokumenter';
import styled from 'styled-components';
import { PdfDokument } from './PdfDokument';

const PageSplit = styled.div`
    display: flex;
    flex-direction: row;
`;

const BackgroundDiv = styled.div`
    margin-left: 40px;
    width: 40rem;
    height: 80vh;
    background-color: #e9e7e7;
`;

const ScrollDiv = styled.div`
    padding: 1rem 0 1rem 0;
    margin-top: 2rem;
    margin-bottom: 2rem;
    height: 70vh;
    overflow-y: scroll;
`;

const ListDiv = styled.div`
    margin-left: 20px;
`;

const ManuellJournalføringContentV2: React.FC = () => {
    const { dataForManuellJournalføring, visDokument, dokumentData } = useManuellJournalføringV2();

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            return (
                <PageSplit>
                    <ListDiv>
                        <Dokumenter />
                    </ListDiv>
                    {visDokument && (
                        <BackgroundDiv>
                            <ScrollDiv>
                                <PdfDokument pdfdata={dokumentData} />
                            </ScrollDiv>
                        </BackgroundDiv>
                    )}
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
