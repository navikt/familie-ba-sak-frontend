import styled from 'styled-components';

import { GlobalAlert } from '@navikt/ds-react';
import { Journalstatus, RessursStatus } from '@navikt/familie-typer';

import { DokumentPanel } from './Dokument/DokumentPanel';
import { JournalpostSkjema } from './JournalpostSkjema';
import { ManuellJournalføringProvider, useManuellJournalføringContext } from './ManuellJournalføringContext';
import { Personlinje } from '../../komponenter/Personlinje/Personlinje';
import { fagsakHeaderHøydeRem } from '../../typer/styling';

const ToKolonnerDiv = styled.div<{ $viserAlert?: boolean }>`
    display: grid;
    grid-template-columns: 40rem 1fr;
    grid-template-rows: 1fr;
    height: calc(100vh - ${props => (props.$viserAlert ? fagsakHeaderHøydeRem + 5.25 : fagsakHeaderHøydeRem)}rem);
`;

const ManuellJournalføringContent = () => {
    const { dataForManuellJournalføring, minimalFagsak, skjema } = useManuellJournalføringContext();

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const viserAlert = dataForManuellJournalføring.data.journalpost.journalstatus !== Journalstatus.MOTTATT;
            return (
                <>
                    <Personlinje bruker={skjema.felter.bruker.verdi} fagsak={minimalFagsak} />

                    {viserAlert && (
                        <>
                            <GlobalAlert status="warning">
                                <GlobalAlert.Header>
                                    <GlobalAlert.Title>
                                        Journalposten har status{' '}
                                        {dataForManuellJournalføring.data.journalpost.journalstatus} og er allerede
                                        journalført.
                                    </GlobalAlert.Title>
                                </GlobalAlert.Header>
                            </GlobalAlert>
                            <br />
                        </>
                    )}

                    <ToKolonnerDiv $viserAlert={viserAlert}>
                        <JournalpostSkjema />
                        <DokumentPanel />
                    </ToKolonnerDiv>
                </>
            );

        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return (
                <GlobalAlert status="error">
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>{dataForManuellJournalføring.frontendFeilmelding}</GlobalAlert.Title>
                    </GlobalAlert.Header>
                </GlobalAlert>
            );
        case RessursStatus.IKKE_TILGANG:
            return (
                <GlobalAlert status="error">
                    <GlobalAlert.Header>
                        <GlobalAlert.Title>
                            Kan ikke vise journalføringsoppgave. Personer relatert til journalpost har
                            adressebeskyttelse. Krever ekstra tilganger.
                        </GlobalAlert.Title>
                    </GlobalAlert.Header>
                </GlobalAlert>
            );
        default:
            return <div />;
    }
};

const ManuellJournalføring = () => {
    return (
        <ManuellJournalføringProvider>
            <ManuellJournalføringContent />
        </ManuellJournalføringProvider>
    );
};

export default ManuellJournalføring;
