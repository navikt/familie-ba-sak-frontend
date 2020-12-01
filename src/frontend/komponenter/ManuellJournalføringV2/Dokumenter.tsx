import { Journalstatus, RessursStatus } from '@navikt/familie-typer';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React from 'react';
import { useManuellJournalføringV2 } from '../../context/ManuellJournalføringContextV2';
import { DokumentVelger } from './DokumentVelger';

export const Dokumenter: React.FC = () => {
    const { dataForManuellJournalføring } = useManuellJournalføringV2();
    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS:
            return (
                <div>
                    {dataForManuellJournalføring.data.journalpost.journalstatus ===
                    Journalstatus.MOTTATT ? (
                        !dataForManuellJournalføring.data.journalpost.dokumenter ||
                        dataForManuellJournalføring.data.journalpost.dokumenter.length === 0 ? (
                            <AlertStripeAdvarsel children={'Ingen Vedlegg'} />
                        ) : (
                            dataForManuellJournalføring.data.journalpost.dokumenter?.map(
                                (dokument, index) => (
                                    <DokumentVelger dokument={dokument} key={index} />
                                )
                            )
                        )
                    ) : (
                        <AlertStripeAdvarsel
                            children={`Journalposten har status ${dataForManuellJournalføring.data.journalpost.journalstatus}. Kan bare manuelt journalføre journalposter med status MOTTATT.`}
                        />
                    )}
                </div>
            );
        default:
            return <div />;
    }
};
