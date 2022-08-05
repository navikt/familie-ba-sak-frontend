import React from 'react';

import styled from 'styled-components';

import { Alert } from '@navikt/ds-react';
import { Journalstatus, RessursStatus } from '@navikt/familie-typer';

import {
    ManuellJournalførProvider,
    useManuellJournalfør,
} from '../../context/ManuellJournalførContext';
import { fagsakHeaderHøydeRem } from '../../typer/styling';
import Personlinje from '../Fagsak/Personlinje/Personlinje';
import { DokumentPanel } from './Dokument/DokumentPanel';
import { JournalpostSkjema } from './JournalpostSkjema';

const ToKolonnerDiv = styled.div(
    (props: { viserAlert?: boolean }) => `
    display: grid;
    grid-template-columns: 40rem 1fr;
    grid-template-rows: 1fr;
    height: calc(100vh - ${
        props.viserAlert ? fagsakHeaderHøydeRem + 5.25 : fagsakHeaderHøydeRem
    }rem);
`
);

const ManuellJournalførContent: React.FC = () => {
    const { dataForManuellJournalføring, minimalFagsak } = useManuellJournalfør();

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            const viserAlert =
                dataForManuellJournalføring.data.journalpost.journalstatus !==
                Journalstatus.MOTTATT;
            return (
                <>
                    <Personlinje
                        bruker={dataForManuellJournalføring.data.person}
                        minimalFagsak={minimalFagsak}
                    />

                    {dataForManuellJournalføring.data.journalpost.journalstatus !==
                        Journalstatus.MOTTATT && (
                        <>
                            <Alert
                                variant="warning"
                                children={`Journalposten har status ${dataForManuellJournalføring.data.journalpost.journalstatus} og er allerede journalført.`}
                            />
                            <br />
                        </>
                    )}

                    <ToKolonnerDiv viserAlert={viserAlert}>
                        <JournalpostSkjema />
                        <DokumentPanel />
                    </ToKolonnerDiv>
                </>
            );
        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
        case RessursStatus.IKKE_TILGANG:
            return (
                <Alert variant="error" children={dataForManuellJournalføring.frontendFeilmelding} />
            );
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
