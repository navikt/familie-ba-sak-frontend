import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Undertittel } from 'nav-frontend-typografi';

import { kjønnType, RessursStatus } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import {
    ManuellJournalføringProviderV2,
    useManuellJournalføringV2,
} from '../../context/ManuellJournalføringContextV2';
import { formaterPersonIdent, hentAlder } from '../../utils/formatter';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { AvsenderPanel } from './AvsenderPanel';
import { BrukerPanel } from './BrukerPanel';
import { Dokumenter } from './Dokumenter';
import { Journalpost } from './Journalpost';

const TwoColumnDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

const JournalpostSkjema = styled(Skjemasteg)`
    min-width: 640px;
    padding-left: 40px;
`;

const StyledIFrame = styled.iframe`
    width: 100%;
    height: 92vh;
`;

const DokumentDataAlert = styled(AlertStripeFeil)`
    margin-top: 10px;
    width: 100%;
    height: 3rem;
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
                    <TwoColumnDiv>
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
                            <StyledIFrame
                                title={'dokument'}
                                src={dokumentData.data}
                                width={'100%'}
                                height={'100%'}
                            ></StyledIFrame>
                        )}
                        {visDokument &&
                            (dokumentData.status === RessursStatus.FEILET ||
                                dokumentData.status === RessursStatus.FUNKSJONELL_FEIL) && (
                                <DokumentDataAlert children={dokumentData.frontendFeilmelding} />
                            )}
                    </TwoColumnDiv>
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
