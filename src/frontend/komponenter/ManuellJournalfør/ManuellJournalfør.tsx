import React from 'react';

import styled from 'styled-components';

import { AlertStripeAdvarsel, AlertStripeFeil } from 'nav-frontend-alertstriper';

import { Journalstatus, RessursStatus } from '@navikt/familie-typer';

import {
    ManuellJournalførProvider,
    useManuellJournalfør,
} from '../../context/ManuellJournalførContext';
import { fagsakHeaderHøydeRem } from '../../typer/styling';
import Personlinje from '../Fagsak/Personlinje/Personlinje';
import { DokumentPanel } from './Dokument/DokumentPanel';
import { JournalpostSkjema } from './JournalpostSkjema';

const ToKolonnerDiv = styled.div`
    display: grid;
    grid-template-columns: 40rem 1fr;
    grid-template-rows: 1fr;
    height: calc(100vh - ${fagsakHeaderHøydeRem}rem);
`;

const ManuellJournalførContent: React.FC = () => {
    const { dataForManuellJournalføring, fagsak } = useManuellJournalfør();

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            return (
                <>
                    <Personlinje bruker={dataForManuellJournalføring.data.person} fagsak={fagsak} />

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
