import { DokumentIkon } from '@ikoner/DokumentIkon';
import { EksternLenke } from '@ikoner/EksternLenke';

import { BodyShort, Box, HStack, VStack } from '@navikt/ds-react';
import type { IDokumentInfo } from '@navikt/familie-typer';

import styles from './DokumentInfoStripe.module.css';
import FamilieBaseKnapp from '../../../komponenter/FamilieBaseKnapp';

interface IDokumentInfoStripeProps {
    valgt: boolean;
    journalpostId: string;
    dokument: IDokumentInfo;
}

export const DokumentInfoStripe = ({ valgt, journalpostId, dokument }: IDokumentInfoStripeProps) => {
    return (
        <HStack>
            <Box minHeight={'48px'} minWidth={'48px'} marginInline={'space-0 space-16'}>
                <DokumentIkon filled={valgt} width={48} height={48} />
            </Box>
            <VStack>
                <HStack gap={'space-8'} marginBlock={'space-0 space-8'} className={styles.tittel}>
                    {dokument.tittel || 'Ukjent'}
                    <FamilieBaseKnapp
                        onClick={() => {
                            window.open(
                                `/familie-ba-sak/api/journalpost/${journalpostId}/dokument/${dokument.dokumentInfoId}`,
                                '_blank'
                            );
                        }}
                    >
                        <EksternLenke />
                    </FamilieBaseKnapp>
                </HStack>
                {dokument.logiskeVedlegg.map((it, index) => (
                    <BodyShort key={index}>{it.tittel}</BodyShort>
                ))}
            </VStack>
        </HStack>
    );
};
