import React from 'react';

import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

import { RessursStatus } from '@navikt/familie-typer';

import { useManuellJournalføring } from '../../context/ManuellJournalføringContext';
import { DokumentVelger } from './DokumentVelger';

export const Dokumenter: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalføring();
    return (
        <div>
            {dataForManuellJournalføring.status === RessursStatus.SUKSESS &&
                (!dataForManuellJournalføring.data.journalpost.dokumenter ||
                dataForManuellJournalføring.data.journalpost.dokumenter.length === 0 ? (
                    <AlertStripeAdvarsel children={'Ingen innhold'} />
                ) : (
                    dataForManuellJournalføring.data.journalpost.dokumenter?.map(
                        (dokument, index) => <DokumentVelger dokument={dokument} key={index} />
                    )
                ))}
        </div>
    );
};
