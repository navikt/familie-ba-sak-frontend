import { useFagsak } from '@hooks/useFagsak';
import { Fagsaklinje } from '@komponenter/Saklinje/Fagsaklinje';
import { Box, Heading, VStack } from '@navikt/ds-react';
import { FagsakStatus } from '@typer/fagsak';

import { Behandlinger } from './Behandlinger';
import { FagsakLenkepanel } from './FagsakLenkepanel';
import { LøpendeMånedligUtbetaling } from './LøpendeMånedligUtbetaling';

export function Saksoversikt() {
    const fagsak = useFagsak();

    return (
        <>
            <Fagsaklinje />
            <Box maxWidth="70rem" marginBlock="space-40" marginInline="space-64">
                <Heading size="large" level="1">
                    Saksoversikt
                </Heading>
                <VStack gap="space-56">
                    <FagsakLenkepanel />
                    {fagsak.status === FagsakStatus.LØPENDE && (
                        <VStack>
                            <Heading size="medium" level="2">
                                Løpende månedlig utbetaling
                            </Heading>
                            <LøpendeMånedligUtbetaling />
                        </VStack>
                    )}
                    <Behandlinger />
                </VStack>
            </Box>
        </>
    );
}
