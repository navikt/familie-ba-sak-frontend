import { ExternalLinkIcon, FileTextIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, Button, HStack, VStack } from '@navikt/ds-react';
import type { IDokumentInfo } from '@navikt/familie-typer';
import classNames from 'classnames';
import styles from './DokumentInfoStripe.module.css';

interface DokumentInfoStripeProps {
    valgt: boolean;
    journalpostId: string;
    dokument: IDokumentInfo;
}

// TODO: sjekk hva som skjer ved flere dokumenter - mtp. valgt - fill ikonet
export function DokumentInfoStripe({ valgt, journalpostId, dokument }: DokumentInfoStripeProps) {
    return (
        <HStack>
            <Box minHeight={'48px'} minWidth={'48px'} marginInline={'space-0 space-16'}>
                <FileTextIcon width={48} height={48} />
            </Box>
            <VStack>
                <HStack gap={'space-8'} marginBlock={'space-0 space-8'} className={styles.tittel}>
                    {dokument.tittel || 'Ukjent'}
                    <Button
                        className={classNames(styles.visDokumentKnapp)}
                        onClick={() => {
                            window.open(
                                `/familie-ba-sak/api/journalpost/${journalpostId}/dokument/${dokument.dokumentInfoId}`,
                                '_blank'
                            );
                        }}
                    >
                        <ExternalLinkIcon />
                    </Button>
                </HStack>
                {dokument.logiskeVedlegg.map((it, index) => (
                    <BodyShort key={index}>{it.tittel}</BodyShort>
                ))}
            </VStack>
        </HStack>
    );
}
