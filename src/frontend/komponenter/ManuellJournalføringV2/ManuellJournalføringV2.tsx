import { kjønnType, RessursStatus } from '@navikt/familie-typer';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import React from 'react';
import {
    ManuellJournalføringProviderV2,
    useManuellJournalføringV2,
} from '../../context/ManuellJournalføringContextV2';
import { Dokumenter } from './Dokumenter';
import styled from 'styled-components';
import Visittkort from '@navikt/familie-visittkort';
import { formaterPersonIdent, hentAlder } from '../../utils/formatter';
//import { PdfDokument } from './PdfDokument';

const PageSplit = styled.div`
    display: flex;
    flex-direction: row;
`;

const Bakgrunn = styled.div`
    margin-left: 40px;
    width: 100%;
    height: 92vh;
`;

/*
const Scroll = styled.div`
    padding: 1rem 1rem 1rem 1rem;
    width: 40rem;
`;
*/
const Dokumentliste = styled.div`
    margin-top: 60px;
    margin-left: 20px;
`;

const ManuellJournalføringContentV2: React.FC = () => {
    const { dataForManuellJournalføring, visDokument, dokumentData } = useManuellJournalføringV2();

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            return (
                <div>
                    <Visittkort
                        navn={dataForManuellJournalføring.data.person?.navn || 'Noname'}
                        ident={formaterPersonIdent(
                            dataForManuellJournalføring.data.person?.personIdent || ''
                        )}
                        alder={hentAlder(
                            dataForManuellJournalføring.data.person?.fødselsdato || ''
                        )}
                        kjønn={dataForManuellJournalføring.data.person?.kjønn || kjønnType.UKJENT}
                    ></Visittkort>
                    <PageSplit>
                        <Dokumentliste>
                            <Dokumenter />
                        </Dokumentliste>
                        {visDokument && dokumentData.status === RessursStatus.SUKSESS && (
                            /*                        <Bakgrunn>
                            <Scroll>
                                <PdfDokument pdfdata={dokumentData} />
                            </Scroll>
                        </Bakgrunn>
*/
                            <Bakgrunn>
                                <iframe
                                    title={'dokument'}
                                    src={dokumentData.data}
                                    width={'100%'}
                                    height={'100%'}
                                ></iframe>
                            </Bakgrunn>
                        )}
                    </PageSplit>
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
