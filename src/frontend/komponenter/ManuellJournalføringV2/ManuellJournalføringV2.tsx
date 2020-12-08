import React from 'react';

import { useHistory } from 'react-router';
import styled from 'styled-components';

import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Knapp } from 'nav-frontend-knapper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';

import { kjønnType, RessursStatus } from '@navikt/familie-typer';
import Visittkort from '@navikt/familie-visittkort';

import {
    ManuellJournalføringProviderV2,
    useManuellJournalføringV2,
} from '../../context/ManuellJournalføringContextV2';
import { formaterPersonIdent, hentAlder } from '../../utils/formatter';
import UIModalWrapper from '../Felleskomponenter/Modal/UIModalWrapper';
import Skjemasteg from '../Felleskomponenter/Skjemasteg/Skjemasteg';
import { AvsenderPanel } from './AvsenderPanel';
import { BrukerPanel } from './BrukerPanel';
import { Dokumenter } from './Dokumenter';
import { JournalførMotSak } from './JournalførMotSak';
import { Journalpost } from './Journalpost';
import { KnyttJournalpostTilBehandling } from './KnyttJournalpostTilBehandling';

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
    const {
        dataForManuellJournalføring,
        visDokument,
        dokumentData,
        hentAktivBehandlingForJournalføring,
        senderInn,
        tilknyttedeBehandlingIder,
        manueltJournalfør,
    } = useManuellJournalføringV2();
    const history = useHistory();

    const [visModal, settVisModal] = React.useState<boolean>(false);
    const behandlinger =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
        dataForManuellJournalføring.data.fagsak?.behandlinger;

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
                            nesteOnClick={() => {
                                if (tilknyttedeBehandlingIder.length < 1) {
                                    settVisModal(true);
                                } else {
                                    manueltJournalfør();
                                }
                            }}
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
                            <JournalførMotSak></JournalførMotSak>
                            <KnyttJournalpostTilBehandling
                                aktivBehandling={hentAktivBehandlingForJournalføring()}
                                dataForManuellJournalføring={dataForManuellJournalføring.data}
                            ></KnyttJournalpostTilBehandling>
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
                    {visModal && (
                        <UIModalWrapper
                            modal={{
                                className: 'søknad-modal',
                                tittel: 'Ønsker du å journalføre uten å knytte til behandling?',
                                lukkKnapp: false,
                                visModal: visModal,
                                actions: [
                                    <Knapp
                                        key={'ja'}
                                        type={'hoved'}
                                        mini={true}
                                        spinner={senderInn}
                                        disabled={senderInn}
                                        onClick={() => {
                                            settVisModal(false);
                                            manueltJournalfør();
                                        }}
                                        children={'Ja, journalfør'}
                                    />,
                                    <Knapp
                                        key={'nei'}
                                        mini={true}
                                        onClick={() => {
                                            settVisModal(false);
                                        }}
                                        children={
                                            behandlinger && behandlinger.length > 0
                                                ? hentAktivBehandlingForJournalføring()
                                                    ? 'Nei, velg behandling'
                                                    : 'Nei, velg/opprett behandling'
                                                : 'Nei, opprett behandling'
                                        }
                                    />,
                                ],
                            }}
                        >
                            <Normaltekst className={'søknad-modal__fjern-vilkår-advarsel'}>
                                Du har valgt å journalføre uten å knytte dokumentet til en spesifikk
                                behandling. Journalposten knyttes kun til personen.
                                <br />
                                (Tilsvarende "Knytt til generell sak" i Gosys).
                            </Normaltekst>
                        </UIModalWrapper>
                    )}
                    ) : (
                    <AlertStripeAdvarsel
                        children={`Journalposten har status ${dataForManuellJournalføring.data.journalpost.journalstatus}. Kan bare manuelt journalføre journalposter med status MOTTATT.`}
                    />
                    );
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
