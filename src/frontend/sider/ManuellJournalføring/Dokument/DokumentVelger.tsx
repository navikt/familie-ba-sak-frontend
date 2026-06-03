import { useEffect, useState } from 'react';

import { Box, ExpansionCard } from '@navikt/ds-react';
import type { IDokumentInfo } from '@navikt/familie-typer';
import { RessursStatus } from '@navikt/familie-typer';

import { DokumentInfoStripe } from './DokumentInfoStripe';
import { EndreDokumentInfoPanel } from './EndreDokumentInfoPanel';
import { useManuellJournalføringContext } from '../ManuellJournalføringContext';

interface IDokumentVelgerProps {
    dokument: IDokumentInfo;
    visFeilmeldinger: boolean;
}

export const DokumentVelger = ({ dokument, visFeilmeldinger }: IDokumentVelgerProps) => {
    const { dataForManuellJournalføring, valgtDokumentId, velgOgHentDokumentData } = useManuellJournalføringContext();
    const [åpen, settÅpen] = useState(false);

    const valgt = dokument.dokumentInfoId === valgtDokumentId;
    const journalpostId =
        dataForManuellJournalføring.status === RessursStatus.SUKSESS
            ? dataForManuellJournalføring.data.journalpost.journalpostId
            : '';

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
                    <EndreDokumentInfoPanel dokument={dokument} visFeilmeldinger={visFeilmeldinger} />
                </ExpansionCard.Content>
            </ExpansionCard>
        </Box>
    );
};
