import { Personlinje } from '@komponenter/Personlinje/Personlinje';
import { GlobalAlert } from '@navikt/ds-react';
import { Journalstatus, RessursStatus } from '@navikt/familie-typer';
import classNames from 'classnames';

import { DokumentPanel } from './Dokument/DokumentPanel';
import { JournalpostSkjema } from './JournalpostSkjema';
import styles from './ManuellJournalføring.module.css';
import { ManuellJournalføringProvider, useManuellJournalføringContext } from './ManuellJournalføringContext';

function JournalføringAlert({ status, tekst }: { status: 'warning' | 'error'; tekst: string }) {
    return (
        <GlobalAlert status={status}>
            <GlobalAlert.Header>
                <GlobalAlert.Title>{tekst}</GlobalAlert.Title>
            </GlobalAlert.Header>
        </GlobalAlert>
    );
}

export function ManuellJournalføringContent() {
    const { dataForManuellJournalføring, minimalFagsak, skjema } = useManuellJournalføringContext();

    switch (dataForManuellJournalføring.status) {
        case RessursStatus.SUKSESS: {
            const viserAlert = dataForManuellJournalføring.data.journalpost.journalstatus !== Journalstatus.MOTTATT;
            const alertTekst = `Journalposten har status ${dataForManuellJournalføring.data.journalpost.journalstatus} og er allerede journalført.`;
            return (
                <>
                    <Personlinje bruker={skjema.felter.bruker.verdi} fagsak={minimalFagsak} />

                    {viserAlert && (
                        <>
                            <JournalføringAlert status="warning" tekst={alertTekst} />
                            <br />
                        </>
                    )}

                    <div className={classNames(styles.toKolonner, { [styles.withAlert]: viserAlert })}>
                        <JournalpostSkjema />
                        <DokumentPanel />
                    </div>
                </>
            );
        }

        case RessursStatus.FEILET:
        case RessursStatus.FUNKSJONELL_FEIL:
            return <JournalføringAlert status="error" tekst={dataForManuellJournalføring.frontendFeilmelding} />;
        case RessursStatus.IKKE_TILGANG: {
            const alertTekst =
                'Kan ikke vise journalføringsoppgave. Personer relatert til journalpost har adressebeskyttelse. Krever ekstra tilganger.';
            return <JournalføringAlert status="error" tekst={alertTekst} />;
        }
        default:
            return <div />;
    }
}

export function ManuellJournalføring() {
    return (
        <ManuellJournalføringProvider>
            <ManuellJournalføringContent />
        </ManuellJournalføringProvider>
    );
}
