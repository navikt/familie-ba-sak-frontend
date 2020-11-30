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
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { useHistory } from 'react-router';
import { Undertittel } from 'nav-frontend-typografi';
import { Journalpost } from './Journalpost';
import { BrukerPanel } from './BrukerPanel';
import { AvsenderPanel } from './AvsenderPanel';

const PageSplit = styled.div`
    display: flex;
    flex-direction: row;
`;

const JournalpostSkjema = styled(Skjemasteg)`
    min-width: 640px;
    padding: 40px;
`;

const Bakgrunn = styled.div`
    margin-left: 40px;
    width: 100%;
    height: 92vh;
`;

const ManuellJournalføringContentV2: React.FC = () => {
    const { dataForManuellJournalføring, visDokument, dokumentData } = useManuellJournalføringV2();
    const history = useHistory();

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
                        <JournalpostSkjema
                            className={'journalføring'}
                            tittel={'Journalføring'}
                            forrigeKnappTittel={'Avbryt'}
                            forrigeOnClick={() => {
                                history.push(`/oppgaver`);
                            }}
                            nesteKnappTittel={'Journalfør'}
                            senderInn={false}
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
                        </JournalpostSkjema>
                        {visDokument && dokumentData.status === RessursStatus.SUKSESS && (
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
