import { Personlinje } from '@komponenter/Personlinje/Personlinje';
import classNames from 'classnames';

import { GlobalAlert } from '@navikt/ds-react';
import { Journalstatus, RessursStatus } from '@navikt/familie-typer';

import { DokumentPanel } from './Dokument/DokumentPanel';
import { JournalpostSkjema } from './JournalpostSkjema';
import styles from './ManuellJournalføring.module.css';
import { ManuellJournalføringProvider, useManuellJournalføringContext } from './ManuellJournalføringContext';

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

                    <div className={classNames(styles.toKolonner, { [styles.withAlert]: viserAlert })}>
                        <JournalpostSkjema />
                        <DokumentPanel />
                    </div>
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
