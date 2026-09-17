import { InformationSquareIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, InfoCard } from '@navikt/ds-react';
import { KnyttTilTidligereBehandling } from '@sider/ManuellJournalføring/KnyttTilTidligereBehandling';
import { KnyttTilNyBehandling } from './KnyttTilNyBehandling';
import { useManuellJournalføringContext } from './ManuellJournalføringContext';

export function KnyttJournalpostTilBehandling() {
    const { skjema, hentSorterteJournalføringsbehandlinger, erLesevisning } = useManuellJournalføringContext();

    const visGenerellSakInfoStripe =
        !erLesevisning() &&
        skjema.felter.tilknyttedeBehandlinger.verdi.length === 0 &&
        !skjema.felter.knyttTilNyBehandling.verdi;

    const sorterteJournalføringsbehandlinger = hentSorterteJournalføringsbehandlinger();
    const finnesSorterteJournalføringsbehandlinger = sorterteJournalføringsbehandlinger.length > 0;

    return (
        <Box marginBlock={'space-40 space-0'}>
            {finnesSorterteJournalføringsbehandlinger && <KnyttTilTidligereBehandling />}
            <KnyttTilNyBehandling />

            {visGenerellSakInfoStripe && (
                <Box marginBlock={'space-32 space-0'}>
                    <InfoCard data-color="info">
                        <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                            <BodyShort weight={'semibold'}>
                                {finnesSorterteJournalføringsbehandlinger
                                    ? `Du velger å journalføre uten å knytte til behandling(er).`
                                    : `Du velger å journalføre uten å knytte til ny behandling.`}
                            </BodyShort>
                        </InfoCard.Message>
                    </InfoCard>
                </Box>
            )}
        </Box>
    );
}
