import { BodyShort, Box, ExpansionCard, Heading } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import { JournalpostTittelFelt } from '@sider/ManuellJournalføring/felter/JournalpostTittelFelt';
import { type OppgavetypeFilter, oppgaveTypeFilter } from '@typer/oppgave';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';
import { useManuellJournalføringContext } from './ManuellJournalføringContext';

export function Journalpost() {
    const { dataForManuellJournalføring, skjema } = useManuellJournalføringContext();

    const journalpostOverskrift =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? oppgaveTypeFilter[dataForManuellJournalføring.data.oppgave.oppgavetype as keyof typeof OppgavetypeFilter]
                  .navn
            : undefined;
    const datoMottatt =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.datoMottatt
            : undefined;

    return (
        <>
            <Heading spacing size={'medium'} level={'2'}>
                {journalpostOverskrift}
            </Heading>
            <ExpansionCard id={skjema.felter.journalpostTittel.id} size="small" aria-label="journalpost">
                <ExpansionCard.Header>
                    <ExpansionCard.Title size={'small'} as={'h2'}>
                        {skjema.felter.journalpostTittel.verdi || 'Ingen tittel'}
                    </ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <Box marginBlock={'space-0 space-20'}>
                        <BodyShort>
                            Mottatt:{' '}
                            {isoStringTilFormatertString({
                                isoString: datoMottatt,
                                tilFormat: Datoformat.DATO,
                                defaultString: 'Ingen mottatt dato',
                            })}
                        </BodyShort>
                    </Box>
                    <JournalpostTittelFelt />
                </ExpansionCard.Content>
            </ExpansionCard>
        </>
    );
}
