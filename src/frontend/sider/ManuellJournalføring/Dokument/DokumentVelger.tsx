import { Box, ExpansionCard } from '@navikt/ds-react';
import type { IDokumentInfo } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';
import { DokumentTittelFelt } from '@sider/ManuellJournalføring/felter/DokumentTittelFelt';
import { LogiskeVedleggFelt } from '@sider/ManuellJournalføring/felter/LogiskeVedleggFelt';
import { useEffect, useState } from 'react';
import { useManuellJournalføringContext } from '../ManuellJournalføringContext';
import { DokumentInfoStripe } from './DokumentInfoStripe';

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
    visFeilmeldinger: boolean;
}

export function DokumentVelger({ dokument, visFeilmeldinger }: IDokumentVelgerProps) {
    const { dataForManuellJournalføring, valgtDokumentId, velgOgHentDokumentData, skjema } =
        useManuellJournalføringContext();
    const [åpen, settÅpen] = useState(false);

    const valgt = dokument.dokumentInfoId === valgtDokumentId;
    const journalpostId =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.journalpostId
            : '';

    const dokumentFraSkjema: IDokumentInfo | undefined = skjema.felter.dokumenter.verdi.find(
        findDokument => findDokument.dokumentInfoId === dokument.dokumentInfoId
    );

    useEffect(() => {
        if (visFeilmeldinger) {
            settÅpen(true);
        }
    }, [visFeilmeldinger]);

    return (
        <Box marginBlock={'space-16 space-0'}>
            <ExpansionCard
                open={åpen}
                onToggle={() => {
                    settÅpen(!åpen);
                    if (!valgt && journalpostId && dokument.dokumentInfoId) {
                        velgOgHentDokumentData(dokument.dokumentInfoId);
                    }
                }}
                size="small"
                aria-label="Dokumentvelger"
            >
                <ExpansionCard.Header>
                    <ExpansionCard.Title>
                        <DokumentInfoStripe valgt={valgt} journalpostId={journalpostId} dokument={dokument} />
                    </ExpansionCard.Title>
                </ExpansionCard.Header>
                <ExpansionCard.Content>
                    <DokumentTittelFelt dokumentFraSkjema={dokumentFraSkjema} visFeilmeldinger={visFeilmeldinger} />
                    <br />
                    <LogiskeVedleggFelt dokumentFraSkjema={dokumentFraSkjema} />
                </ExpansionCard.Content>
            </ExpansionCard>
        </Box>
    );
}
