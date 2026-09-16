import { BodyShort, Box, ExpansionCard } from '@navikt/ds-react';
import { RessursStatus } from '@navikt/familie-typer';
import { JournalpostTittelFelt } from '@sider/ManuellJournalføring/felter/JournalpostTittelFelt';
import {
    ManuellJournalføringFelter,
    type ManuellJournalføringFormValues,
} from '@sider/ManuellJournalføring/useManuellJournalføringSkjema';
import { Datoformat, isoStringTilFormatertString } from '@utils/dato';
import { useFormContext } from 'react-hook-form';
import { useManuellJournalføringContext } from './ManuellJournalføringContext';

export function Journalpost() {
    const { dataForManuellJournalføring } = useManuellJournalføringContext();
    const { watch } = useFormContext<ManuellJournalføringFormValues>();
    const journalpostTittelVerdi = watch(ManuellJournalføringFelter.JOURNALPOST_TITTEL);

    const datoMottatt =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.datoMottatt
            : undefined;

    return (
        // TODO: må det være id for ExpansionCard?
        <ExpansionCard size="small" aria-label="journalpost">
            <ExpansionCard.Header>
                <ExpansionCard.Title size={'small'} as={'h2'}>
                    {journalpostTittelVerdi || 'Ingen tittel'}
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
    );
}
