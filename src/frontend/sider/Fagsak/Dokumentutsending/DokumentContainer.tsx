import type { PropsWithChildren } from 'react';

import { useHentDistribusjonskanal } from '@hooks/useHentDistribusjonskanal';

import { BodyShort, Box, ErrorMessage, Loader, LocalAlert, Stack } from '@navikt/ds-react';

import { DokumentutsendingProvider } from './DokumentutsendingContext';
import { useBrukerContext } from '../BrukerContext';

export function DokumentContainer({ children }: PropsWithChildren) {
    const { bruker } = useBrukerContext();

    const { data: distribusjonskanal, isPending, error } = useHentDistribusjonskanal(bruker.personIdent);

    if (isPending) {
        return (
            <Box margin={'space-48'}>
                <Stack direction={'row'} justify={'center'} align={'center'} gap={'space-8'}>
                    <Loader size={'medium'} />
                    <BodyShort weight={'semibold'}>Laster dokumentutsending...</BodyShort>
                </Stack>
            </Box>
        );
    }

    if (error) {
        return (
            <Box margin={'space-48'}>
                <LocalAlert status={'error'}>
                    <LocalAlert.Header>
                        <LocalAlert.Title>Feil ved henting av distribusjonskanal</LocalAlert.Title>
                    </LocalAlert.Header>
                    <LocalAlert.Content>
                        <ErrorMessage>{error.message}</ErrorMessage>
                    </LocalAlert.Content>
                </LocalAlert>
            </Box>
        );
    }

    return <DokumentutsendingProvider distribusjonskanal={distribusjonskanal}>{children}</DokumentutsendingProvider>;
}
